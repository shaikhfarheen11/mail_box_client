import React, { useState } from "react";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";
import HeightIcon from "@mui/icons-material/Height";
import Editor from "./Editor";
import "./Compose.css";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "./store/mailSlice";
import axios from "axios";

const Compose = ({ onUpdateReceivedEmails }) => { // Pass onUpdateReceivedEmails as a prop
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const user = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const closeMailBoxHandler = () => {
    dispatch(mailActions.closeSendMessage());
  };

  const SendMailHandler = async (event) => {
    event.preventDefault();
  
    const sanitizedTo = to ? to.replace(/[@.]/g, "") : "";
    const sanitizedUser = user ? user.replace(/[@.]/g, "") : "";
  
    const sentEmailData = {
      to,
      subject,
      msg,
      timeStamp: new Date().toJSON(),
    };
  
    try {
      const sentUrl = `https://react-mail-2c482-default-rtdb.firebaseio.com//${sanitizedUser}/sent.json`;
      await axios.post(sentUrl, sentEmailData);
  
      const inboxEmailData = {
        from: user,
        subject,
        msg,
        timeStamp: new Date(),
        isRead: false,
      };
  
      const inboxUrl = `https://react-mail-2c482-default-rtdb.firebaseio.com/${sanitizedTo}/inbox.json`;
      await axios.post(inboxUrl, inboxEmailData);
      
      // After sending the email, call the onUpdateReceivedEmails function
      onUpdateReceivedEmails(); 
  
      alert("Email Sent Successfully");
  
      setTo("");
      setSubject("");
      setMsg("");
  
      dispatch(mailActions.closeSendMessage());
    } catch (error) {
      console.error("Error sending email:", error);
    }
  
    alert("Email Sent Successfully");

    setTo("");
    setSubject("");
    setMsg("");

    dispatch(mailActions.closeSendMessage());
  };

  return (
    <div className="compose">
      <div className="compose__header">
        <div className="compose__header__left">
          <span>Compose Email</span>
        </div>
        <div className="compose__header__right">
          <MinimizeIcon />
          <HeightIcon />
          <CloseIcon onClick={closeMailBoxHandler} />
        </div>
      </div>
      <form onSubmit={SendMailHandler}>
        <div className="compose__body">
          <div className="compose-bodyForm">
            <input
              type="email"
              placeholder="Recipients"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Editor value={msg} onChange={setMsg} />
          </div>
        </div>
        <div className="compose_send">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Compose;

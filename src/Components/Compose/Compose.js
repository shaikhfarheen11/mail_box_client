import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector
import axios from "axios";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { closeSendMessage } from "../store/mailSlice";

const Compose = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); 
  const [recipientEmail, setRecipientEmail] = useState("");

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user); // Accessing user data from the Redux store
  
  const closeMailBoxHandler = () => {
    dispatch(closeSendMessage());
  };

  const SendMailHandler = async (event) => {
    event.preventDefault();
  
    try {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const message = JSON.stringify(rawContentState);

      const timestamp = new Date().toJSON();

      const senderEmail = user ? user.email : ''; // Get sender email from the user object

      const sentEmailData = {
        from: senderEmail, 
        to: recipientEmail,
        subject: subject,
        message: message,
        timestamp: timestamp
      };

      const recipientInboxUrl = `https://react-mail-2c482-default-rtdb.firebaseio.com/inbox/${recipientEmail.replace(/[^\w\s]/gi, '')}.json`;
      await axios.post(recipientInboxUrl, sentEmailData);
      
      const senderSentUrl = `https://react-mail-2c482-default-rtdb.firebaseio.com/sent/${senderEmail.replace(/[^\w\s]/gi, '')}.json`;
      await axios.post(senderSentUrl, sentEmailData);
      
      setTo("");
      setSubject("");
      setEditorState(EditorState.createEmpty());
      dispatch(closeSendMessage());

      alert("Email Sent Successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <div className="compose">
      <div className="compose__header">
        <div className="compose__header__left">
          <span>Compose Email</span>
        </div>
        <div className="compose__header__right">
          <button onClick={closeMailBoxHandler}>Close</button>
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
            <input
              type="email"
              placeholder="Recipient's Email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
          </div>
        </div>
        <div className="compose__footer">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default Compose;

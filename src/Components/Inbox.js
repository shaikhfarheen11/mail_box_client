import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Compose from "./Compose";

const Inbox = () => {
  const showCompose = useState(false);
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);



  const fetchSentMessages = useCallback(async () => {
    try {
      if (!user) {
        return [];
      }
      const sanitizedUser = user.id.replace(/[@.]/g, "");
      const response = await axios.get(`https://react-mail-2c482-default-rtdb.firebaseio.com/${sanitizedUser}/sent.json`);
      return response.data;
    } catch (error) {
      console.error("Error fetching sent messages:", error);
      return [];
    }
  }, [user]);

  const fetchMessages = useCallback(async () => {
    try {
      if (!user) {
        return;
      }

      const receivedResponse = await axios.get("https://react-mail-2c482-default-rtdb.firebaseio.com/inbox.json", {
        params: {
          userId: user.id,
        },
      });

      const sentMessages = await fetchSentMessages();

      const allMessages = [...receivedResponse.data, ...sentMessages];

      setMessages(allMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [user, fetchSentMessages]);

  const onUpdateReceivedEmails = useCallback(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const onMessageSent = () => {
    onUpdateReceivedEmails();
  };

  return (
    <div className="inbox">
      <h2>Inbox</h2>

      {showCompose && <Compose onUpdateReceivedEmails={onUpdateReceivedEmails} onMessageSent={onMessageSent} />}
      <div className="inbox-messages">
        {messages.map((message) => (
          <div key={message.id} className="inbox-message">
            <p>From: {message.sender || "Me"}</p>
            <p>Subject: {message.subject}</p>
            <p>{message.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;

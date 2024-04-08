import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from './store/mailSlice';

const Sent = () => {
  const dispatch = useDispatch();
  const sent = useSelector(state => state.mail.sent);
  const user = useSelector(state => state.auth.email);

  const getSentEmails = useCallback(async () => {
    try {
      const sanitizedUser = user.replace(/[@.]/g, '');
      const getEmailsUrl = `https://react-mail-2c482-default-rtdb.firebaseio.com/${sanitizedUser}/sent.json`;
      const response = await axios(getEmailsUrl);
      
      console.log('Response data:', response.data); // Log response data
      
      if (response.data) {
        const emailArray = [];
        for (const key in response.data) {
          emailArray.push({ id: key, ...response.data[key] });
        }
        console.log('Sent emails:', emailArray); // Log sent emails
        dispatch(mailActions.setSentBox(emailArray));
      }
    } catch (error) {
      console.error('Error fetching sent emails:', error);
    }
  }, [user, dispatch]);

  useEffect(() => {
    getSentEmails();
  }, [getSentEmails]);

  console.log('Sent emails from store:', sent);

  return (
    <div className="email-list">
      <h2>Sent Emails</h2>
      {sent.map(email => (
        <div key={email.id} className="email-item">
          <h3>{email.subject}</h3>
          <p>From: {email.from}</p>
          <p>To: {email.to}</p>
          <p>{email.msg}</p>
        </div>
      ))}
    </div>
  );
};

export default Sent;

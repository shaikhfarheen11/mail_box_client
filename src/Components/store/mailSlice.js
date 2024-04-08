import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sendMessageIsOpen: false,
    emails: [],
    sent : [],
  },

  reducers: {
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },

    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
    setEmails : (state, action) => {
      state.emails = action.payload
    },
    setSentBox : (state, action) => {
      state.sent = action.payload
    },
    markedAsRead : (state, action) => {
      const email = state.emails.find(email => email.id === action.payload);

      if(email) {
        email.isRead = true
      }
    }
    
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
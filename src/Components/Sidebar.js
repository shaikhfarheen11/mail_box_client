import React, { useState } from "react";
import "./Sidebar.css";
import SidebarOptions from "./SidebarOption";
import MailIcon from "@mui/icons-material/Mail";
import StarIcon from "@mui/icons-material/Star";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import Compose from "./Compose"; 
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const SentArray = useSelector((state) => state.mail.sent);
  const navigate = useNavigate();
  const showCompose = useState(false);

  const totalSent = SentArray.length;

  const handleSidebarOptionClick = (optionName) => {
    navigate(`/mails/${optionName}`);
  };

  return (
    <div className="sidebar">
      {showCompose && <Compose />} {/* Render Compose component conditionally */}

      <div onClick={() => handleSidebarOptionClick("inbox")}>
        <SidebarOptions Icon={MailIcon} title="Inbox" isActive={true} />
        <div className="inbox-messages">
          {SentArray.map((message) => (
            <div key={message.id} className="inbox-message">
              <p>{message.subject}</p>
              <p>{message.from}</p>
              <p>{message.msg}</p>
            </div>
          ))}
        </div>
      </div>

      <div onClick={() => handleSidebarOptionClick("starred")}>
        <SidebarOptions Icon={StarIcon} title="Starred" number="0" isActive={false} />
      </div>

      <div onClick={() => handleSidebarOptionClick("important")}>
        <SidebarOptions
          Icon={LabelImportantIcon}
          title="Important"
          number="0"
          isActive={false}
        />
      </div>
      <div onClick={() => handleSidebarOptionClick("sent")}>
        <SidebarOptions Icon={SendIcon} title="Sent" number={totalSent} isActive={false} />
      </div>

      <div onClick={() => handleSidebarOptionClick("drafts")}>
        <SidebarOptions Icon={DraftsIcon} title="Drafts" number="0" isActive={false} />
      </div>
    </div>
  );
};

export default Sidebar;

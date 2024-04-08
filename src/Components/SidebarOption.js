import React from "react";
import "./SidebarOption.css";

const SidebarOptions = ({ Icon, title, number, isActive }) => {
  const activeClassName = `sidebar_options ${isActive?"sidebar--active": ''}`;
  return (
    <div className={activeClassName}>

      <Icon />
      <h4>{title}</h4>
      <p>{number}</p>
    </div>
  );
};

export default SidebarOptions;
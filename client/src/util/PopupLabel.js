import React from "react";
import { Popup } from "semantic-ui-react";

const PopupLabel = ({ content, children }) => {
  return <Popup content={content} trigger={children} />;
};

export default PopupLabel;

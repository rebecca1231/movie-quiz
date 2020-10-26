import React from "react";
import { Link } from "react-router-dom";
import { Icon, Label, Button } from "semantic-ui-react";

import MyPopup from "../util/MyPopup";

const CommentButton = ({ id, commentCount }) => {
  const item = commentCount === 1 ? "comment" : "comments";

  return (
    <MyPopup content={`${commentCount} ${item}.`}>
      <Button color="teal" basic icon as={Link} to={`/quizzes/${id}`}>
        <Icon name="comments" />
      </Button>
    </MyPopup>
  );
};

export default CommentButton;

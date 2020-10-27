import React from "react";
import { Link } from "react-router-dom";
import { Icon, Button } from "semantic-ui-react";

import PopupLabel from "../util/PopupLabel";

const CommentButton = ({ id, commentCount }) => {
  const item = commentCount === 1 ? "comment" : "comments";

  return (
    <PopupLabel content={`${commentCount} ${item}.`}>
      <Button color="teal" basic icon as={Link} to={`/quizzes/${id}`}>
        <Icon name="comments" />
      </Button>
    </PopupLabel>
  );
};

export default CommentButton;

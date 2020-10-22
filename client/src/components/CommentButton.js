import React from "react";
import { Link } from "react-router-dom";
import { Icon, Label, Button } from "semantic-ui-react";

import MyPopup from "../util/MyPopup";

const CommentButton = ({ id, commentCount }) => {
  const item = commentCount === 1 ? "comment" : "comments";

  return (
    <MyPopup content={`${commentCount} ${item}. Comment?`}>
      <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
        <Button color="blue" basic>
          <Icon name="comments" />
        </Button>
        <Label as="a" basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    </MyPopup>
  );
};

export default CommentButton;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon, Label, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import MyPopup from "../util/MyPopup";

const LikeButton = ({ user, post: { likes, likeCount, id } }) => {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError() {},
  });
  const item = likeCount === 1 ? "like" : "likes";
  const text = liked ? "Unlike" : "Like"
  
  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <MyPopup content={`${likeCount} ${item}. ${text}?`}>
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label as="a" basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      likes {
        id
      }
      likeCount
      id
    }
  }
`;

export default LikeButton;

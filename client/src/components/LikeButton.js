import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import MyPopup from "../util/MyPopup";

const LikeButton = ({ user, quiz: { likes, likeCount, id } }) => {
  const [liked, setLiked] = useState(false);
 useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_QUIZ_MUTATION, {
    variables: { quizId: id },
    onError() {},
  });
  const item = likeCount === 1 ? "like" : "likes";
  
  const likeButton = user ? (
    liked ? (
      <Button icon color="red" onClick={likePost}>
        <Icon name="heart" />
      </Button>
    ) : (
      <Button icon color="red" basic onClick={likePost}>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button icon as={Link} to="/login" color="red" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <MyPopup content={`${likeCount} ${item}.`}>
        {likeButton}
    </MyPopup>
  );
};

const LIKE_QUIZ_MUTATION = gql`
  mutation likeQuiz($quizId: ID!) {
    likeQuiz(quizId: $quizId) {
      likes {
        id
      }
      likeCount
      id
    }
  }
`;

export default LikeButton;

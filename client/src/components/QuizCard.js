import React, { useContext } from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import CommentButton from "./CommentButton";
import PlayButton from "./PlayButton";

const QuizCard = ({
  quiz: {
    title,
    createdAt,
    id,
    username,
    items,
    likes,
    likeCount,
    commentCount,
  },
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid className="quiz-item">
      <Card.Content as={Link} to={`/quizzes/${id}`}>
        <Image floated="right" size="tiny" src={items[0].poster} />
        <Card.Header>{title} </Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)} </Card.Meta>
        <Card.Description>Created by: {username} </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <LikeButton user={user} quiz={{ id, likes, likeCount }} />
        <CommentButton commentCount={commentCount} id={id} />
        {user && user.username === username && <DeleteButton quizId={id} />}
        <PlayButton title={title} />
      </Card.Content>
    </Card>
  );
};

export default QuizCard;

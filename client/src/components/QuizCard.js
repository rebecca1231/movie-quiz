import React, {useContext} from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import CommentButton from './CommentButton'


const QuizCard = ({
  quiz: { title, createdAt, id, username, items, likes, likeCount, commentCount},
}) => {
 const { user } = useContext(AuthContext);
console.log(likes)
  return (
    <Card fluid>
      <Card.Content as={Link} to={`/quizzes/${id}`}>

        <Card.Header>{title} </Card.Header>
        <Card.Meta>
          {moment(createdAt).fromNow(true)}{" "}
        </Card.Meta>
        <Card.Description>Created by: {username} </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <LikeButton user={user} quiz={{ id, likes, likeCount }} />
        <CommentButton commentCount={commentCount} id={id} />
        {user && user.username === username && <DeleteButton quizId={id} />}
      </Card.Content>

    </Card>
  );
};

export default QuizCard;

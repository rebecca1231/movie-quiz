import React from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

// import { AuthContext } from "../context/auth";
// import LikeButton from "./LikeButton";
// import DeleteButton from "./DeleteButton";
// import CommentButton from './CommentButton'


const QuizCard = ({
  quiz: { title, createdAt, id, username, items},
}) => {
  // const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content as={Link} to={`/quizzes/${id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username} </Card.Header>
        <Card.Meta>
          {moment(createdAt).fromNow(true)}{" "}
        </Card.Meta>
        <Card.Description>{title} </Card.Description>
      </Card.Content>
     
    </Card>
  );
};

export default QuizCard;

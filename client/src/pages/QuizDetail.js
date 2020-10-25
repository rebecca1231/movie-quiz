import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// import gql from "graphql-tag";
import { Grid, List, Button, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

// import { AuthContext } from "../context/auth";
// import LikeButton from "../components/LikeButton";
// import DeleteButton from "../components/DeleteButton";
// import CommentButton from "../components/CommentButton";
import { GET_QUIZ_QUERY } from "../util/graphql";

const QuizDetail = () => {
  // const { user } = useContext(AuthContext);
  // const history = useHistory();
  // const deletePostCallback = () => { history.push("/");};

  const { quizId } = useParams();

  const { data: { getQuiz: quiz } = {} } = useQuery(GET_QUIZ_QUERY, {
    variables: { quizId },
  });
  console.log(quiz);
  let quizMarkup;
  if (!quiz) {
    quizMarkup = <p>Loading...</p>;
  } else {
    const { title, id, createdAt, username, items } = quiz;

    quizMarkup = (
      <Grid key={id}>
        <Grid.Row>
          <Grid.Column width={7}>
            <h2> {title} </h2>
            <p> Created: {moment(createdAt).fromNow()} </p>
            <p> By: {username} </p>
            <Button labelPosition="right" as={Link} to={`/quiz/${title}`}>
            
              <Label as="a" basic color="blue">
                Take Quiz!
              </Label>
            </Button>
          </Grid.Column>
          <Grid.Column width={5}>
            <List size="huge">
              {items.map((item) => {
                return (
                  <List.Item>
                    <List.Header> {item.question} </List.Header>
                    {item.answer}
                  </List.Item>
                );
              })}
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return <div>{quizMarkup}</div>;
};

export default QuizDetail;

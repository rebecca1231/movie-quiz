import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Grid, List, Button, Loader, Image, Card, Form, Icon } from "semantic-ui-react";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import CommentButton from "../components/CommentButton";
import { GET_QUIZ_QUERY } from "../util/graphql";
import PlayButton from "../components/PlayButton";


const QuizDetail = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const deleteQuizCallback = () => { history.push("/");};
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null)

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [window.innerWidth]);
  const num = windowWidth > 900 ? 2 : 1;

  const { quizId } = useParams();

  const [createComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur()
    },
    variables: { quizId, body: comment },
    onError() {},
  });


  const { data: { getQuiz: quiz } = {} } = useQuery(GET_QUIZ_QUERY, {
    variables: { quizId },
  });
  let quizMarkup;
  if (!quiz) {
    quizMarkup =
    <Loader active inline='centered' />
  } else {
    const { title, createdAt, username, items, comments} = quiz;
    quizMarkup = (
      <Grid columns={num}>
        <Grid.Row>
          <Grid.Column>
            <h2> {title} </h2>
            <p> Created: {moment(createdAt).fromNow()} </p>
            <p> By: {username} </p>
            <div style={{marginBottom:"1.5rem"}}>

            <LikeButton user={user} quiz={quiz} />
            <PlayButton title={title} />

            </div>
          </Grid.Column>
          <Grid.Column>
            <List>
              {items.map((item) => {
                return (
                  <List.Item>
                    <Image avatar src={item.poster} />
                    <List.Content>
                      <List.Header> {item.question} </List.Header>
                      <List.Description>{item.answer}</List.Description>
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
            {user && (
         
                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="Your comment"
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type="submit"
                      className="ui button basic teal"
                      disabled={comment.trim() === ""}
                      onClick={createComment}
                    >
                      Comment!
                    </button>
                  </div>
                </Form>
       
            )}
            {comments.length > 0 &&
              comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton quizId={quizId} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username} </Card.Header>
                    <Card.Meta>
                      {moment(comment.createdAt).fromNow()}{" "}
                    </Card.Meta>
                    <Card.Description>{comment.body} </Card.Description>
                  </Card.Content>
                </Card>
              ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return <div>{quizMarkup}</div>;
};


const SUBMIT_COMMENT_MUTATION = gql`
  mutation($quizId: ID!, $body: String!) {
    createComment(quizId: $quizId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default QuizDetail;

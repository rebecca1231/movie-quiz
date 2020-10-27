import React, { useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Grid, List, Loader, Image, Form } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import { GET_QUIZ_QUERY } from "../util/graphql";
import PlayButton from "../components/PlayButton";

const QuizDetail = () => {
  const { user } = useContext(AuthContext);
  //const history = useHistory();
  //const deleteQuizCallback = () => { history.push("/");};
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);

  const { quizId } = useParams();

  const [createComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: { quizId, body: comment },
    onError() {},
  });

  const { data: { getQuiz: quiz } = {} } = useQuery(GET_QUIZ_QUERY, {
    variables: { quizId },
  });
  let quizMarkup;
  if (!quiz) {
    quizMarkup = <Loader active inline="centered" />;
  } else {
    const { title, createdAt, username, items, comments, id } = quiz;
    quizMarkup = (
      <Grid columns="2">
        <Grid.Row>
          <Grid.Column width={6}>
            <h2> {title} </h2>
            <p> Created: {moment(createdAt).fromNow()} </p>
            <p> By: {username} </p>
            <div style={{ marginBottom: "1.5rem", maxWidth: "250px" }}>
              <LikeButton user={user} quiz={quiz} />
              <PlayButton title={title} />
              {user && user.username === username && (
                <DeleteButton quizId={id} />
              )}
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
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>
            <hr style={{width:"90vw", maxWidth: "750px", margin:"auto"}}/>

            {comments.length > 0 ? <h3>Comments</h3> : <h3>No Comments Yet</h3>}

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
                <List key={comment.id}>
                  <List.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton quizId={quizId} commentId={comment.id} />
                    )}
                    <List.Header>{comment.username} </List.Header>
                    <p>{moment(comment.createdAt).fromNow()}</p>
                    <List.Description>{comment.body} </List.Description>
                  </List.Content>
                </List>
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

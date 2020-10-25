import React, { useState } from "react";
import { Icon, Confirm, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import MyPopup from "../util/MyPopup";
import { FETCH_QUIZZES_QUERY } from "../util/graphql";

const DeleteButton = ({ quizId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_QUIZ_MUTATION;

  const [deleteMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (callback) callback();
      if (!commentId) {
        let data = proxy.readQuery({
          query: FETCH_QUIZZES_QUERY,
        });
        const resQuizzes = data.getQuizzes.filter((p) => p.id !== quizId);
        proxy.writeQuery({
          query: FETCH_QUIZZES_QUERY,
          data: { getQuizzes: [...resQuizzes] },
        });
      }
    },
    onError() {},
    variables: { quizId, commentId },
  });
  return (
    <>
      <MyPopup content={commentId ? "Delete comment" : "Delete post"}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
        
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteMutation}
      />
    </>
  );
};

const DELETE_QUIZ_MUTATION = gql`
  mutation deleteQuiz($quizId: ID!) {
    deleteQuiz(quizId: $quizId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($quizId: ID!, $commentId: ID!) {
    deleteComment(quizId: $quizId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;

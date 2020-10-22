import React, { useContext, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Card, Grid, Image, Form } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import CommentButton from '../components/CommentButton'

const SinglePost = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null)

  const deletePostCallback = () => {
    history.push("/");
  };
  const [createComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur()
    },
    variables: { postId, body: comment },
    onError() {},
  });

  const { data: { getPost: post } = {} } = useQuery(GET_POST_QUERY, {
    variables: { postId },
  });
  let postMarkup;
  if (!post) {
    postMarkup = <p>Loading...</p>;
  } else {
    const {
      body,
      id,
      createdAt,
      username,
      commentCount,
      likeCount,
      likes,
      comments,
    } = post;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />{" "}
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username} </Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()} </Card.Meta>
                <Card.Description>{body} </Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <CommentButton commentCount={commentCount} id={id} />
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                  <Card.Content>
                <p>Post a Comment</p>
                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      placeholder="Write your comment here."
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type="submit"
                      className="ui button teal"
                      disabled={comment.trim() === ""}
                      onClick={createComment}
                    >
                      Comment!
                    </button>
                  </div>
                </Form>
                </Card.Content>
              </Card>
            )}
            {comments.length > 0 &&
              comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={id} commentId={comment.id} />
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

  return <div>{postMarkup}</div>;
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
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

const GET_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      body
      id
      createdAt
      username
      commentCount
      likeCount
      likes {
        username
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export default SinglePost;

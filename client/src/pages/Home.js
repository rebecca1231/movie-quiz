import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import PostForm from "../components/PostForm";
import Postcard from "../components/Postcard";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../util/graphql";


const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  //if(data){console.log(data)}

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h2>Recent Posts</h2>
      </Grid.Row>
      {user && (
        <Grid.Column>
          <PostForm />
        </Grid.Column>
      )}
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                  <Postcard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
/**
 *
 */

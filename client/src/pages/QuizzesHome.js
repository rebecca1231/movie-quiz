import React from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import QuizCard from "../components/QuizCard";
import { FETCH_QUIZZES_QUERY } from "../util/graphql";

// import { AuthContext } from "../context/auth";


const QuizzesHome = () => {
  // const { user } = useContext(AuthContext);
  const { loading, data: { getQuizzes: quizzes } = {} } = useQuery(
    FETCH_QUIZZES_QUERY
  );

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h2>Recent Quizzes</h2>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {quizzes &&
              quizzes.map((quiz) => (
                <Grid.Column key={quiz.id} style={{ marginBottom: "20px" }}>
                  <QuizCard quiz={quiz} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default QuizzesHome;

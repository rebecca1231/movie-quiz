import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";

import AuthRoute from "./util/AuthRoute";
import { AuthProvider } from "./context/auth";
import { CountContextProvider } from "./context/countContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import QuizzesHome from "./pages/QuizzesHome";
import QuizDetail from "./pages/QuizDetail";
import Data from "./Quiz/Data";
import Quiz from "./Quiz/Quiz";
import Score from "./Quiz/Score";

function App() {
  return (
    <AuthProvider>
      <CountContextProvider>
        <Router>
          <Container>
            <MenuBar />
            <Route exact path="/" component={QuizzesHome} />
            <Route exact path="/create" component={Data} />
            <Route exact path="/quiz/:searchTerm" component={Quiz} />
            <Route exact path="/quiz" component={Quiz} />
            <Route exact path="/score" component={Score} />

            <Route exact path="/quizzes/:quizId" component={QuizDetail} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
          </Container>
        </Router>
      </CountContextProvider>
    </AuthProvider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";

import AuthRoute from './util/AuthRoute'
import { AuthProvider } from "./context/auth";
import PostsHome from "./pages/PostsHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import SinglePost from './pages/SinglePost'
import QuizzesHome from './pages/QuizzesHome'
import QuizDetail from './pages/QuizDetail'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/quizzes" component={QuizzesHome} />
          <Route exact path="/quizzes/:quizId" component={QuizDetail} />
          <Route exact path="/posts" component={PostsHome} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />

        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

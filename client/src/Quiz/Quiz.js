import React, { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import Head from "./components/head";
import styled from "styled-components";
import Flashcard from "./components/Flashcard";
import { DataContext } from "./context/dataContext";
import {CountContext} from './context/countContext'
import { getRandomNumber } from "./utils/getRandomNumber";
const Choices = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const correctAnswers = [];

const Review = () => {
  const { movies, choice1, choice2 } = useContext(DataContext);
  const {count, score, updateCount, updateScore} = useContext(CountContext)
  const currentSet = [...movies];
  const dataLength = movies.length; 
  const history = useHistory();

  //const [score, setScore] = useState(0);
  const [, setUpdate] = useState();
  const forceUpdate = useCallback(() => setUpdate({}), []);
  const [finished, setFinished] = useState(false);

  let items = [];
  let answer = "";

  const chooseChoices = (numberOfChoices = 4) => {
    let counter = 0;
    while (counter < numberOfChoices) {
      let item = currentSet[getRandomNumber(currentSet.length)];
      if (items.includes(item)) {
        item = currentSet[getRandomNumber(currentSet.length)];
      } else {
        item.index = counter;
        items.push(item);
        counter++;
      }
    }
    return items;
  };

  const respondToCorrect = (item) => {
    if (correctAnswers.includes(item)) {
      return;
    } else correctAnswers.push(item);
    if (correctAnswers.length === dataLength) setFinished(true);
    return correctAnswers;
  };

  const respondToIncorrect = (item) => {
    currentSet.push(item);
    return currentSet;
  };

  const renderChoices = () => {
    chooseChoices();
    answer = items[getRandomNumber(3)];
    const colors = ["#cffffe", "#f9f7d9", "#a3d2ca", "#ffe0f7"];
    return items.map((item) => {
      return (
        <Flashcard
          choice1={item[choice1]}
          choice2={item[choice2]}
          color={colors[item.index]}
          answer={answer[choice2]}
          updateScore={updateScore}
          score={score}
          updateCount={updateCount}
          count={count}
          respondToCorrect={respondToCorrect}
          respondToIncorrect={respondToIncorrect}
        />
      );
    });
  };

  return (
    <div>
      <Head title="Quiz" />
      {movies.length < 1 ? (
        <>
          <h1>Something's Missing</h1>
            <p>You have no quiz data</p>
          <p>Please select your quiz details.</p>
          <div onClick={()=> history.push('/data')} className="ui basic teal button">Get Your Data</div>
        </>
      ) : (
        <>
          {finished ? (
            <div style={{ textAlign: "center" }}>
              <h1>You have reviewed all the words in this set!</h1>
              <h3>Well Done!</h3>{" "}
              <div className="item">
                <div
                  onClick={() => history.push("/score")}
                  className="ui basic big button blue"
                >
                  Show my scores!
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1>Review </h1>
              <h4>Your score: {score}</h4>
              <h3>Question: {count}</h3>
              <Choices>{renderChoices()}</Choices>
              <div>
                <h3> Please find the correct answer: </h3>
                <h2 style={{ textAlign: "center" }}>{answer[choice1]} </h2>
                <p>Words in this Set: {dataLength}</p>
              </div>
              <div className="ui secondary menu">
                <div className="menu right">
                  <button
                    onClick={() => forceUpdate()}
                    className="ui basic button item"
                  >
                    Skip!<i className="arrow right icon right floated"></i>
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Review;

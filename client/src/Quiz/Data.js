import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { debounce } from "../util/quiz/debounce";
import { useQuery, useMutation } from "@apollo/client";
import { Button, Icon } from "semantic-ui-react";

import {
  FETCH_MOVIE_LIST_QUERY,
  FETCH_MOVIE_DETAIL_QUERY,
} from "../util/quiz/graphqlFetchData";
import { CREATE_QUIZ_MUTATION } from "../util/quiz/graphqlCreateQuiz";

const Data = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");

  const size = window.innerWidth > 700 ? "flex" : "block";

  const { data: { getMovieList: list } = {} } = useQuery(
    FETCH_MOVIE_LIST_QUERY,
    {
      variables: { searchTerm },
    }
  );

  let items = [];
  if (list) {

    items = list.items.map((item) => {
      return {
        question: item.question,
        answer: item.answer,
        poster: item.poster,
      };
    });
    console.log("items", items);
  }

  const { data: { getMovieDetail: details } = {} } = useQuery(
    FETCH_MOVIE_DETAIL_QUERY,
    {
      variables: { searchTerm: searchTerm2 },
    }
  );

  const [createQuiz] = useMutation(CREATE_QUIZ_MUTATION, {
    variables: { title: searchTerm, items: items },
    onError() {},
  });

  const renderList = () => {
    if (!list) return;
    if (list.items.length < 1) return;
    return list.items.map((movie) => {
      const id = movie.imdbId;
      return (
        <div
          key={id}
          style={{ display: "flex", justifyContent: "", textAlign: "left" }}
        >
          <div style={{ padding: "3px" }}>
            <p>
              <strong>Title:</strong> {movie.question}
            </p>
          </div>
          <div style={{ padding: "3px" }}>
            <p>
              <strong>Year:</strong> {movie.answer}
            </p>
          </div>
          <div style={{ padding: "3px" }}>
            <div style={{ padding: "5px" }}>
              <Button icon basic size="mini" onClick={() => setSearchTerm2(id)}>
                <Icon name="info" />{" "}
              </Button>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderDetails = () => {
    if (!details) return;
    if (details.length < 1) return;
    return (
      <div style={{ display: "flex", padding: "5px" }}>
        <div style={{ padding: "10px" }}>
          <img src={details.poster} alt={details.title} />
          <p> Title: {details.title}</p>
          <p> Rating: {details.rated} </p>
          <p> Actors: {details.actors} </p>
          <p> Awards: {details.awards} </p>
          <p> Director: {details.director} </p>
          <p> Plot: {details.plot} </p>
        </div>
        <div>
          <div
            style={{padding:"0", margin:"0"}}
            className="ui icon button right floated basic mini"
            onClick={() => setSearchTerm2("")}
          >
            <i className="window close outline icon large"></i>
          </div>
        </div>
      </div>
    );
  };

  const handleChange = (value) => {
    return setSearchTerm(value);
  };

  const debounceOnChange = useCallback(debounce(handleChange, 500), []);

  return (
    <div>
      <h1>Get Data</h1>
      <div className="ui form" style={{ display: "flex" }}>
        <div style={{ padding: "5px" }}>
          <h3>Search for movies by a keyword in the title</h3>
          <div>
            <label>Search for movies </label>
          </div>
          <input
            onChange={(e) => debounceOnChange(e.target.value)}
            placeholder="bat"
            style={{ maxWidth: "40vw" }}
          />
        </div>
      </div>
      {size === "flex" ? (
        <div style={{ display: `${size}` }}>
          <div>{renderList()}</div>
          <div>{renderDetails()}</div>
        </div>
      ) : (
        <div style={{ display: `${size}` }}>
          <div style={{maxWidth: `${window.innerWidth} - 20` }}>{renderDetails()}</div>
           <div>{renderList()}</div>
        </div>
      )}

      <div style={{ margin: "1rem" }}>
        <p>Use this data?</p>
        <Button
          basic
          color="blue"
          disabled={!list}
          onClick={() => {
             // eslint-disable-next-line
            return history.push(`/quiz/${searchTerm}`), createQuiz();
          }}
        >
          Go to Quiz
        </Button>
      </div>
    </div>
  );
};

export default Data;

/*
 Possible Info to display on details
{Title: "Dog Day Afternoon", Year: "1975", Rated: "R", Released: "25 Dec 1975", Runtime: "125 min", …}
Actors: "Penelope Allen, Sully Boyar, John Cazale, Beulah Garrick"
Awards: "Won 1 Oscar. Another 13 wins & 20 nominations."
BoxOffice: "N/A"
Country: "USA"
DVD: "N/A"
Director: "Sidney Lumet"
Genre: "Biography, Crime, Drama, Thriller"
Language: "English"
Metascore: "86"
Plot: "Three amateur bank robbers plan to hold up a bank. A nice simple robbery: Walk in, take the money, and run. Unfortunately, the supposedly uncomplicated heist suddenly becomes a bizarre nightmare as everything that could go wrong does."
Poster: "https://m.media-amazon.com/images/M/MV5BODExZmE2ZWItYTIzOC00MzI1LTgyNTktMDBhNmFhY2Y4OTQ3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
Production: "Artists Entertainment Complex"
Rated: "R"
Ratings: (3) [{…}, {…}, {…}]
Released: "25 Dec 1975"
Response: "True"
Runtime: "125 min"
Title: "Dog Day Afternoon"
Type: "movie"
Website: "N/A"
Writer: "Frank Pierson (screenplay), P.F. Kluge (based upon a magazine article by), Thomas Moore (based upon a magazine article by)"
Year: "1975"
imdbID: "tt0072890"
imdbRating: "8.0"
imdbVotes: "231,221"
*/

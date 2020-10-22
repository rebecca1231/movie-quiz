import axios from "axios";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { debounce } from "./utils/debounce";
import { DataContext } from "./context/dataContext";

const Data = () => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [movieDetails, setmovieDetails] = useState([]);
  const { movies, updateMovies } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async (searchTerm) => {
      if(searchTerm === '') return
      const response = await axios.get(`https://rocky-beach-12396.herokuapp.com/movielist/${searchTerm}`);
      updateMovies(response.data);
    };
    fetchData(searchTerm);

    const onMovieSelect = async (searchTerm2) => {
      if(searchTerm2 === '') return
      const response = await axios.get(`https://rocky-beach-12396.herokuapp.com/moviedetail/${searchTerm2}`);
      setmovieDetails(response.data);
    };
    onMovieSelect(searchTerm2);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchTerm2]);

  const renderList = (selector = "Year") => {
    if (movies.length < 1) return;
    return movies.map((movie) => {
      const id = movie.imdbID;
      return (
        <div
          key={id}
          style={{ display: "flex", justifyContent: "", textAlign: "left" }}
        >
          <div style={{ padding: "3px" }}>
            <p>
              <strong>Title:</strong> {movie.Title}
            </p>
          </div>
          <div style={{ padding: "3px" }}>
            <p>
              <strong>Year:</strong> {movie[selector]}
            </p>
          </div>
          <div style={{ padding: "3px" }}>
            <div style={{ padding: "5px" }}>
              <div
                className="ui tiny button basic"
                onClick={() => setSearchTerm2(id)}
                style={{ maxWidth: "40vw" }}
              >
                More about this movie
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderDetails = () => {
    if (movieDetails.length < 1) return;
    return (
      <div style={{ display: "flex", padding: "10px" }}>
        <div style={{ padding: "10px" }}>
          <img src={movieDetails.Poster} alt={movieDetails.Title} />
          <p> Title: {movieDetails.Title}</p>
          <p> Rating: {movieDetails.Rated} </p>
          <p> Actors: {movieDetails.Actors} </p>
          <p> Awards: {movieDetails.Awards} </p>
          <p> Director: {movieDetails.Director} </p>
          <p> Plot: {movieDetails.Plot} </p>
        </div>
        <div>
          <div
            className="ui icon button right floated basic"
            onClick={() => setmovieDetails([])}
          >
            {" "}
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
      <div style={{ display: "flex" }}>
        {" "}
        <div>{renderList()}</div>
        <div>{renderDetails()}</div>
      </div>

      <div style={{ margin: "1rem" }}>
        <p>Use this data?</p>
        <div
          className="ui basic button teal"
          onClick={() => {
            history.push("/quiz");
          }}
        >
          Go to Quiz
        </div>
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

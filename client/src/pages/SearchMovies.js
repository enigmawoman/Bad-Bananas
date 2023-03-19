import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
  Nav,
  Modal,
  Tab,
} from "react-bootstrap";

import Footer from '../components/Footer'
import { useMutation } from "@apollo/client";
import { SAVE_MOVIE } from "../utils/mutations";
import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import FilmRating from "../components/FilmRating";
import UserRating from "../components/UserRating";
import AccordianDes from "../components/AccordianDes";


import Auth from "../utils/auth";
import { Divider } from "@mui/material";



const SearchMovies = () => {
  // create state for holding returned google api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved movieId values
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  const [saveMovie, { error }] = useMutation(SAVE_MOVIE);

  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // the API for most popular movies: https://api.themoviedb.org/3/movie/top_rated?api_key=8338ff4dca8c5dfd0d759e7c144e0a5e&language=en-US&page=1

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=8338ff4dca8c5dfd0d759e7c144e0a5e&language=en-US&page=1&region=GB`)
    .then(response => response.json())
    .then(data => {

      const movieData = data.results.map((movie) => ({

        movieId: movie.id,
        rating: movie.vote_average == null ? 0 : movie.vote_average,
        voteCount: movie.vote_count == null ? 0 : movie.vote_count,
        description: movie.overview || 'no description available',
        title: movie.title || 'no title available',
        image:(movie.poster_path == null ? `https://www.homecaredirect.co.uk/wp-content/uploads/2013/10/Awaiting-Image1.jpg`  : `https://image.tmdb.org/t/p/original/${movie.poster_path }`) ,
      }));
      
      const moviePromises = movieData.map((movie) =>
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.movieId}/watch/providers?api_key=8338ff4dca8c5dfd0d759e7c144e0a5e`
      ).then((response) => response.json())
    );

    Promise.all(moviePromises).then((movieProviders) => {
      const updatedMovieData = movieData.map((movie, index) => {
        const providers = movieProviders[index];
        const ukProviders = providers.results?.GB?.link;
        return {
          ...movie,
          providers: ukProviders,
        };
      });

      console.log(updatedMovieData);
      setTopMovies(updatedMovieData);
      setLoading(false);
    });
  });
  }, []);

  console.log(topMovies)



  // set up useEffect hook to save `savedMovieIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  // create method to search for movies and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    // const API_KEY = process.env.REACT_APP_API_KEY
    // console.log(API_KEY);
  
    if (!searchInput) {
      return false;
    }
  
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8338ff4dca8c5dfd0d759e7c144e0a5e&language=en-US&query=${searchInput}&page=1&include_adult=false`);
  
      //https://api.themoviedb.org/3/movie/550?api_key=8338ff4dca8c5dfd0d759e7c144e0a5e
  
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
  
      const { results } = await response.json();
  
      const movieData = results.map((movie) => ({
        movieId: movie.id,
        rating: movie.vote_average == null ? 0 : movie.vote_average,
        voteCount: movie.vote_count = null ? 0 : movie.vote_count,
        description: movie.overview || 'no description available',
        title: movie.title || 'no title available',
        image: (movie.poster_path == null ? `https://www.homecaredirect.co.uk/wp-content/uploads/2013/10/Awaiting-Image1.jpg` : `https://image.tmdb.org/t/p/original/${movie.poster_path}`),
      }));
  
      const moviePromises = movieData.map((movie) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.movieId}/watch/providers?api_key=8338ff4dca8c5dfd0d759e7c144e0a5e`
        ).then((response) => response.json())
      );
  
      Promise.all(moviePromises).then((movieProviders) => {
        const updatedMovieData = movieData.map((movie, index) => {
          const providers = movieProviders[index];
          const ukProviders = providers.results?.GB?.link;
          return {
            ...movie,
            providers: ukProviders,
          };
        });
  
        console.log(updatedMovieData)
  
        setSearchedMovies(updatedMovieData);
        setSearchInput("");
      });
    } catch (err) {
      console.error(err);
    }
  };
  

  

  // create function to handle saving a movie to our database
  const handleSaveMovie = async (movieId) => {
    // find the movie in `searchedMovies` state by the matching id
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);
    console.log(movieToSave);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token);

    if (!token) {
      return false;
    }

    try {
      console.log(movieToSave)
      const { data } = await saveMovie({
        variables: { movieData: { ...movieToSave } },
      });
      
      console.log(savedMovieIds);
      // if movie successfully saves to user's account, save movie id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveTopMovie = async (movieId) => {
    // find the movie in `searchedMovies` state by the matching id
    const movieToSave = topMovies.find((topMovie) => topMovie.movieId === movieId);
    console.log(movieToSave);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token);

    if (!token) {
      return false;
    }

    try {
      console.log(movieToSave)
      const { data } = await saveMovie({
        variables: { movieData: { ...movieToSave } },
      });
      
      console.log(savedMovieIds);
      // if movie successfully saves to user's account, save movie id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="search">
        <Container className="movie">
       <iframe width="700" height="430" src="https://www.youtube.com/embed/D-3sg-tyHdo" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Container>
        <Container>
          <h1 className="Stype"   style={{ color:"black", fontSize:"60px", fontWeight:"bold"}}> SEARCH A MOVIE</h1>
          
   
          <Form className="Btype" onSubmit={handleFormSubmit}>
            <Form.Row>
              <div className="Ctype">
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  style={{ width:"105%",}}
                  size="lg"
                  placeholder="Search top movies..."
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg"   style={{ width: "100%", marginLeft: "10px", borderRadius:"30px"}}>
                  SUBMIT
                </Button>
              </Col>
              </div>
            </Form.Row>
          </Form>
      
        </Container>
      </Jumbotron>

      <Container className="container">
       
          {searchedMovies.length
            ? 
        <CardColumns className="card-coloumns">
          {searchedMovies.map((movie) => {
            return (
              <div className="card-container" key={movie.movieId}>
                {movie.image ? (
                  <div className="image-container">
                  <img
                    src={movie.image}
                    alt={`The cover for ${movie.title}`}
                    variant="top"
                  />
                  </div>
                ) : null}

                <Card.Body className="card-body">
                  <Card.Title>{movie.title}</Card.Title>
                  <FilmRating
                  movieId={movie.movieId}
                  movieRating={movie.rating}/>
                  <Card.Text className="medium">Bad Banana Rating: <b>{movie.rating}</b> <span>({movie.voteCount} reviews)</span></Card.Text>
                  {movie.providers
                    ? <Card.Link href={movie.providers} target="_blank">Where to Watch 👀</Card.Link>
                    : <span>Watchlist Not Available</span>
                  }
                  <AccordianDes overview={movie.description} />

                  {Auth.loggedIn() && (
                    <>
                    <button
                      disabled={savedMovieIds?.some(
                        (savedMovieId) => savedMovieId === movie.movieId
                      )}
                      className="btn"
                      onClick={() => handleSaveMovie(movie.movieId)}
                    >
                      {savedMovieIds?.some(
                        (savedMovieId) => savedMovieId === movie.movieId
                      )
                        ? "Already in your Watchlist!"
                        : "Add to Watchlist"}
                    </button>
                    <UserRating movieId={movie.movieId} movieTitle={movie.title}/>
                    </>
                  )}
                </Card.Body>
              </div>
            );
          })}
        </CardColumns>
        : 
        <>

      
        <h2>TODAYS TOP BANANAs : Trending in the UK</h2>
        <CardColumns className="card-coloumns">

          {topMovies.map((topMovie) => {
            return (
              <div className="card-container" key={topMovie.movieId} >
                {topMovie.image ? (
                  <div className="image-container">
                  <img
                    src={topMovie.image}
                    alt={`The cover for ${topMovie.title}`}
                    variant="top"
                  />
                  </div>
                ) : null}

                <Card.Body className="card-body">
                  <Card.Title>{topMovie.title}</Card.Title>
                  <FilmRating
                  movieId={topMovie.movieId}
                  movieRating={topMovie.rating}/>
                  <Card.Text className="medium">Bad Banana Rating: <b>{topMovie.rating}</b> <span>({topMovie.voteCount} reviews)</span></Card.Text>
                  {topMovie.providers
                    ? <Card.Link href={topMovie.providers} target="_blank">Where to Watch 👀</Card.Link>
                    : <span>Watchlist Not Available</span>
                  }

                  <AccordianDes overview={topMovie.description} />
                  

                  {Auth.loggedIn() && (
                    <>
                    <button 
                      disabled={savedMovieIds?.some(
                        (savedMovieId) => savedMovieId === topMovie.movieId
                      )}
                      className="btn"
                      onClick={() => handleSaveTopMovie(topMovie.movieId)}
                    >
                      {savedMovieIds?.some(
                        (savedMovieId) => savedMovieId === topMovie.movieId
                      )
                        ? "Already in your Watchlist!"
                        : "Add to Watchlist"}
                    </button>
                    
                    <UserRating movieId={topMovie.movieId} movieTitle={topMovie.title}/>
                    </>
                  )}
                  
              
               
             
              </Card.Body>
              </div>
            );
          })}
        </CardColumns>
      </>
       }
    </Container>
    
     
  <Footer />

    </>
  );
};

export default SearchMovies;
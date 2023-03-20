import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import Footer from '../components/Footer';

import { GET_ME } from "../utils/queries";
import { REMOVE_MOVIE } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { removeMovieId } from "../utils/localStorage";
import FilmRating from "../components/FilmRating";
import UserRating from "../components/UserRating";
import AccordianDes from "../components/AccordianDes";

// replacing the useEffect with queries and muatations 
const SavedMovies = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeMovie, { error }] = useMutation(REMOVE_MOVIE);

  const userData = data?.me || {};

  // create function that accepts the movie's mongo _id value as param and deletes the movie from the database
  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeMovie({
        variables: { movieId },
      });

      console.log(data)

      // upon success, remove movie's id from localStorage

      removeMovieId(parseInt(movieId));
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light" style={{backgroundColor:"#FFE082"}}>
        <Container>
          <h1 className="watch-list-name">{userData.username}'s WatchList!</h1>
        </Container>
      </Jumbotron>
      <Container className="container">
        <h2>
          {userData.savedMovies.length
            ? `Viewing ${userData.savedMovies.length} saved ${
                userData.savedMovies.length === 1 ? "movie" : "movies"
              }:`
            : "Nothing here to watch... add a movie!"}
        </h2>
        <CardColumns className="card-coloumns">
          {userData.savedMovies.map((movie) => {
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
                  movieId={movie.id}
                  movieRating={movie.rating}/>
                  <Card.Text className="medium">Bad Banana Rating: <b>{movie.rating}</b> <span>({movie.voteCount} reviews)</span></Card.Text>
                  {movie.providers
                     ? <Button className="watch"  variant="primary" href={movie.providers} target="_blank">WHERE TO WATCH</Button>
                    : <span>Watchlist Not Available</span>
                  }
                  <AccordianDes overview={movie.description} />
                  <Button

                    className="btn-block btn-danger"
                    onClick={() => handleDeleteMovie(movie.movieId)}
                  >
                    Remove from Watchlist!
                  </Button>
                  <UserRating movieId={movie.movieId} movieTitle={movie.title}/>
                </Card.Body>
              </div>
            );
          })}

        </CardColumns>
      </Container>
            <Footer />
    </>
  );
};

export default SavedMovies;
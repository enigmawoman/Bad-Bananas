export const getSavedMovieIds = () => {
  const savedMovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies'))
    : [];

  return savedMovieIds;
};

export const getSavedUserRatings = () => {
  const savedRating = localStorage.getItem('ratings')
    ? JSON.parse(localStorage.getItem('ratings'))
    : [];

  return savedRating;
};

export const saveMovieIds = (movieIdArr) => {
  console.log(movieIdArr, "saving movie to LS")
  if (movieIdArr.length) {
    localStorage.setItem('saved_movies', JSON.stringify(movieIdArr));
  } else {
    localStorage.removeItem('saved_movies');
  }
};

export const removeMovieId = (movieId) => {

  console.log(movieId, "movieId passed through from savedMovies.js")
  
  const savedMovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies'))
    : null;

  if (!savedMovieIds) {
    return false;
  }

  const updatedSavedMovieIds = savedMovieIds?.filter((savedMovieId) => savedMovieId !== movieId);

  console.log(updatedSavedMovieIds, "should be removing the deleted movie id")

  localStorage.setItem('saved_movies', JSON.stringify(updatedSavedMovieIds));

  return true;
};

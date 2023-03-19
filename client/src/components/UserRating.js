import React, { useState, useEffect } from 'react'
import { Rating, Box, Typography } from "@mui/material"
import { GiBananaPeeled, GiBanana } from "react-icons/gi";
import Auth from '../utils/auth';
import { useLocalStorage } from "../utils/useLocalStorage";
import {
  Modal,
  Tab,
  Card,
} from "react-bootstrap";

const labels = {
  0.5: '0.5',
  1: '1',
  1.5: '1.5',
  2: '2',
  2.5: '2.5',
  3: '3',
  3.5: '3.5',
  4: '4',
  4.5: '4.5',
  5: '5',
  5.5: '5.5',
  6: '6',
  6.5: '6.5',
  7: '7',
  7.5: '7.5',
  8: '8',
  8.5: '8.5',
  9: '9',
  9.5: '9.5',
  10: '10',
};

function getLabelText(value) {
  return `${value} Banana${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function UserRating({ movieId, movieTitle }) {

  const [savedRatings, setSavedRatings] = useLocalStorage('ratings', '')
  const [rating, setRating] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [hover, setHover] = useState(-1);

  // When the modal is closed, reset the rating, or load in a previous rating
  useEffect(() => {

    if (!showModal) {
      setRating(0);
    }
    else {
      // Load in a previous rating if it exists
      const ratings = savedRatings === '' ? [] : JSON.parse(savedRatings)
      const userRating = ratings.find(rating => rating.movieId === movieId)
      if (userRating) {
        setRating(userRating.rating)
      }
    }
  }, [showModal])


  const handleRatingSubmit = async (value) => {

    const ratings = savedRatings === '' ? [] : JSON.parse(savedRatings)
    console.log(ratings, "ratings from LS")
    if (!value) {
      return 0;
    }
    try {
      const newRating = {
        movieId: movieId,
        rating: value,
        title: movieTitle,
        user_id: Auth.getUserId()
      }

      ratings.push(newRating)
      setSavedRatings(JSON.stringify(ratings))
      console.log(ratings, "saved ratings after push")

      // Close the form as we're done
      setShowModal(false);
    }
    catch (err) {
      console.error(err);
    }
  }


  useEffect(() => {
    if (savedRatings) {
      const ratings = JSON.parse(savedRatings);
      const userRating = ratings.find(rating => rating.movieId === movieId)
      if (userRating) {
        const { rating } = userRating;
        setRating(rating);
      }
    }
  }, [savedRatings, movieId])

  return (
    <>
      <Card.Text className="card-rating">Your Rating: <span>{rating || 'Rate this movie'}</span> </Card.Text>
      
      <button className="btn" onClick={() => setShowModal(true)}>Rate Film</button>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}

        <Modal.Header closeButton>
          <Modal.Title id='signup-modal'>
            Rate the Film...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Content>

            <Box
              sx={{
                width: 600,
                display: 'row',
                alignItems: 'center',
              }}
            >
              <Typography component="legend">How many bananas do you give - {movieTitle} ?</Typography>
              <Box
                sx={{
                  width: 600,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                <Rating
                  display="block"
                  name="hover-feedback"
                  icon={<GiBananaPeeled />}
                  emptyIcon={<GiBanana />}
                  max={10}
                  precision={0.5}
                  value={rating}
                  size="large"
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    handleRatingSubmit(newValue)
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                ></Rating>
                {rating !== null && (
                  <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                )}
              </Box>
            </Box>
          </Tab.Content>
        </Modal.Body>

      </Modal>
    </>
  );

}

export default UserRating
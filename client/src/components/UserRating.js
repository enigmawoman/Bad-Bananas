import React, {useState} from 'react'
import { Rating, Box, Typography } from "@mui/material" 
import { GiBananaPeeled, GiBanana } from "react-icons/gi";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { saveMovieIds, getSavedMovieIds } from "../utils/localStorage";
import { 
Nav,
Modal,
Tab,
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

function UserRating({movieId, movieTitle}) {

    const [value, setValue] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [hover, setHover] = useState(-1);

    console.log(value)

    const handleRatingSubmit = async (event) => {
        event.preventDefault();

        if (!event) {
            return false;
        }
        try {



            setValue(value)
            console.log(value)
        }
        catch (err) {
            console.error(err);

       
        }
    }

   const handleSaveUserRating = async (ratingNo) => {

//     const userRatingNo = value.find((ratingNo) => ratingNo.)

    }




    return (
        <>
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
              Rate the Film:
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
            icon={<GiBananaPeeled/>} 
            emptyIcon={<GiBanana/>}
            max={10} 
            precision={0.5}
            value={value}
            size="large"
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
            onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
          ></Rating>
          {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
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
import * as React from 'react';
// impoting the material UI components for use
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// the function for the accordian - this will hold the decription of the movie - we are passing the overview data in as a props to display the movie descriptoin
export default function AccordianDes({overview}) {
  const [expanded, setExpanded] = React.useState(false);
// handling the open and close of the accordion window
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="accordian-style">
      <Accordion  expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordian-description">
          <Typography>
            {overview}
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}
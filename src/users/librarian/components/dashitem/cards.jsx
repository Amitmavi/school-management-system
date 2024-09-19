import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import './cards.css';
// import './newdash.css'; // Import the CSS file

const Main = styled('main')({
  flexGrow: 1,
  padding: '20px', // Adjust padding as needed
});

const colors = ['lightpink', 'lightblue', 'lightgreen', 'lightyellow' ];

export default function PersistentDrawerLeft() {
  return (
    <Main className="Main">
      <Grid container spacing={1}>
        {[1, 2, 3, 4].map((cardIndex) => (
          <Grid item xs={12} sm={6} md={3} key={cardIndex}>
            <div className="Card" style={{ backgroundColor: colors[(cardIndex - 1) % colors.length] }}>
              <h3>{getCardTitle(cardIndex)}</h3>
              {/* Your card components */}
            </div>
          </Grid>
        ))}
      </Grid>
    </Main>
  );
}

function getCardTitle(cardIndex) {
  switch (cardIndex) {
    case 1:
      return 'Total Book Issue';
    case 2:
      return 'Total Book Returned';
    case 3:
      return 'Total Book Not Return';
    case 4:
      return 'Total Fines Received';
     
    default:
      return `Card ${cardIndex}`;
  }
}

// 
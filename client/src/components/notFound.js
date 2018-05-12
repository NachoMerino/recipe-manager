import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

const styles = {
    box:{
      background: '#fff',
      margin: '1rem auto',
      padding: '.5rem 0',
    }
};

const notFound = props => {

  return (
    <div>
      <Paper className="main" style={styles.box} elevation={4}>
        <Typography>
          <h1>404 Not Found</h1>
          <Link to="/">Back To Main Menu</Link>
        </Typography>
      </Paper>
    </div>
  );
}


export default notFound;
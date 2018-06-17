import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const styles = {
  card: {
    minWidth: 275,
    padding: '0 0 1rem 0',
    margin: '0 0 1rem 0'
  },
  container: {
    width:  '560px',
    height: '373px',
    position: 'relative',
    overflow:'hidden'
  },
  picture: {
    width:  '100%',
    position: 'absolute',
    right: '0',
    left: '0',
    top: '0',
    bottom: '0',
    margin: 'auto auto',
  }
};

const SimpleCard = props => {
  const { classes, name, picture, showSubCategorie } = props;
  return (
    <React.Fragment>
      <div onClick={showSubCategorie}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h1">
            {name}
          </Typography>
          <div className={classes.container}>
            <img className={classes.picture} src={picture} alt=""/>
          </div>
        </CardContent>
      </Card>
    </div>
    </React.Fragment>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
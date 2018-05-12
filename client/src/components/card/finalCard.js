import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    minWidth: 275,
    padding: '0 0 1rem 0',
    margin: '0 0 1rem 0'
  },
  picture: {
    width: '100%',
    height: 'auto',
  },
  pos: {
    marginBottom: 12,
  },
};

function FinalCard(props) {

  const { classes } = props;
  return (
    <React.Fragment>
      <div onClick={props.showSubCategorie}>
      <Card className={classes.card}>
      FinalCard shit
        <CardContent>
          <Typography variant="headline" component="h1">
            {props.name}
          </Typography>
          <img className={classes.picture} src={props.picture} alt=""/>
        </CardContent>
      </Card>
    </div>
    </React.Fragment>
  );
}

FinalCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FinalCard);
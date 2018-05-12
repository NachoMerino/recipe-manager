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

function SimpleCard(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <div onClick={props.path ? props.showFinalCard : props.showSubCategorie}>
      <Card className={classes.card}>
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

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
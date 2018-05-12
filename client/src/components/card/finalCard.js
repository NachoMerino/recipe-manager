import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

//
import Paper from 'material-ui/Paper';

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
  console.log('item',props.item)
  const { classes } = props;
  return (
    <React.Fragment>
      <div onClick={props.showSubCategorie}>
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs>
            <Paper>
              <img className={classes.picture} src={props.item.picture} alt=""/>
              <Typography variant="headline" component="h1">
                {props.item.name}
              </Typography>
            </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper}>xs=8</Paper>
            </Grid>
          </Grid>
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

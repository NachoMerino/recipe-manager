import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Card, CardContent, Typography, Divider, Paper } from '@material-ui/core';

const styles = {
  card: {
    minWidth: 275,
    margin: '1rem 0'
  },
  cardContent:{
    textAlign: 'justify',
  },
  picture: {
    width: '100%',
    height: 'auto',
  }
};

const FinalCard = props => {
  const { classes, item } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={24}>
          <Grid item xs={4}>
          <Paper>
            <img className={classes.picture} src={item.picture} alt={item.name}/>
            <Typography variant="headline" component="h1">
              {item.name}
            </Typography>
          </Paper>
          </Grid>
          <Grid className={classes.cardContent} item xs={8}>
            <Typography variant="headline" component="h1">
              {item.long_name}
            </Typography>
            <Divider />
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <Typography component="p">
                  {item.ingredients}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <Typography component="p">
                  {item.ingredients}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subheading" component="h3">
                  Notes: {item.notes}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subheading" component="h3">
                  Nutrition: {item.nutrition}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography component="p">
                  Recipe: {item.text}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

FinalCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FinalCard);

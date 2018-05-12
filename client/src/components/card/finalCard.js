import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

//
import Paper from 'material-ui/Paper';

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
  },
  pos: {
    marginBottom: 12,
  },
};

function FinalCard(props) {
  console.log('item',props.item)
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={24}>
          <Grid item xs={4}>
          <Paper>
            <img className={classes.picture} src={props.item.picture} alt=""/>
            <Typography variant="headline" component="h1">
              {props.item.name}
            </Typography>
          </Paper>
          </Grid>
          <Grid className={classes.cardContent} item xs={8}>
            <Typography variant="headline" component="h1">
              {props.item.long_name}
            </Typography>
            <Divider />
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <Typography component="p">
                  {props.item.ingredients}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <Typography component="p">
                  {props.item.ingredients}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subheading" component="h3">
                  Notes: {props.item.notes}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subheading" component="h3">
                  Nutrition: {props.item.nutrition}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography component="p">
                  Recipe: {props.item.text}
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

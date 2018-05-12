import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import TimeIcon from 'material-ui-icons/Alarm';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardContent:{
    textAlign: 'left'
  },
  actions: {
    display: 'flex'
  },
  expand: {
    backgroundColor:red[500],
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    backgroundColor:red[500],
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes } = this.props;
    //console.log(this.props.item)
    let titleName;
    if(this.props.item.cooking_categories_ID){
      titleName = this.props.item.cooking_categories_ID
    } else {
      titleName = this.props.item.pattern_categories_ID
    }
    titleName = titleName.substring(0, 3);
    let totalTiming;
    if(this.props.item.time_preparation){
      totalTiming = (
        Number(this.props.item.time_baking)
        + Number(this.props.item.time_cooking)
        + Number(this.props.item.time_preparation)
        + '"'
      )
    }
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
            {titleName}
    
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.item.name}
          subheader={
            this.props.item.time_preparation ?  
            (<React.Fragment>
              <TimeIcon /> {totalTiming}
            </React.Fragment>)
            :
            null
            }
        />
        <CardMedia
          onClick={this.props.showFinalCard}
          className={classes.media}
          image={this.props.item.picture}
          title={this.props.item.long_name}
        />
        <CardContent className={classes.cardContent}>
          <Typography component="p">
            {this.props.item.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
        Show More Info
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardContent}>
            <Typography paragraph>
              Ingredients:
              {this.props.item.ingredients}
            </Typography>
            <Divider />
            <Typography paragraph>
              Notes:
              {this.props.item.notes}
            </Typography>
            <Divider />
            <Typography paragraph>
              Nutrition:
              {this.props.item.nutrition}
            </Typography>
            <Divider />
            <Typography paragraph>
              Baking: {this.props.item.time_baking}"
              Cooking: {this.props.item.time_cooking}"
              Preparation: {this.props.item.time_preparation}"
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
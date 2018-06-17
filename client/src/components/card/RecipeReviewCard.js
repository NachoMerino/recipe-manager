import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse } from '@material-ui/core';
import { Avatar, Divider, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Menu, MenuItem, Slide, Button, Dialog, TextField } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { ExpandMore as ExpandMoreIcon, MoreVert as MoreVertIcon } from '@material-ui/icons';
import {Close as CloseIcon, Alarm as TimeIcon} from '@material-ui/icons';
import { randomNum } from '../../helpers';

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
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class RecipeReviewCard extends React.Component {
  constructor(props){
    super()
    this.state = { 
      expanded: false,
      anchorEl: null,
      open: false,
      editing: false,
      item: props.item
    };
  }

  handleExpandClick = () => {
    this.setState(prevState => { return {expanded: !prevState.expanded}})
  }

  deleteRecipe = () => {
    this.setState({ anchorEl: null });
    console.log('Deleting recipe page')
  }

  handleClickMenu = event => {
    if(this.state.anchorEl === null){
      this.setState({ anchorEl: event.currentTarget });
    }
  }

  handleClickOpenDialog = () => {
    console.log(this.state.item)
    this.setState({ open: true, editing:true });
  }

  handleClose = () => {
    this.setState({ anchorEl: null, open: false, editing:false});
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  saveRequest = () => {
    console.log('Saving the request on the DB')
    this.setState({ anchorEl: null, open: false, editing:false});
  }

  render() {
    const { classes, showFinalCard } = this.props;
    const { anchorEl, item } = this.state;
    const fields = [
      item.name ? ['name',item.name] : false,
      item.long_name ?['long_name',item.long_name] : false,
      item.description ?['description',item.description] : false,
      item.ingredients ?['ingredients',item.ingredients] : false,
      item.text ?['recipe',item.text] : false,
      item.notes ?['notes',item.notes] : false,
      item.nutrition ?['nutrition',item.nutrition] : false,
      item.picture ?['picture',item.picture] : false,
      item.time_baking ? ['time_baking',item.time_baking] : false,
      item.time_cooking ? ['time_cooking',item.time_cooking] : false,
      item.time_preparation ? ['time_preparation',item.time_preparation] : false
    ]
    let titleName;
    if(item.cooking_categories_ID){
      titleName = item.cooking_categories_ID
    } else {
      titleName = item.pattern_categories_ID
    }
    titleName = titleName.substring(0, 3);
    let totalTiming;
    if(item.time_preparation){
      totalTiming = (
        Number(item.time_baking)
        + Number(item.time_cooking)
        + Number(item.time_preparation)
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
            <IconButton
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClickMenu}
            >
            <MoreVertIcon />          
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClickOpenDialog}>Edit</MenuItem>
          <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {this.state.editing ? `Editing "${item.name}"` : 'Creating New Recipe'}
              </Typography>
              <Button color="inherit" onClick={this.saveRequest}>
                save
              </Button>
            </Toolbar>
          </AppBar>
      <form className={classes.container} noValidate autoComplete="off">
      {fields.map(field => {
        return(

          field !== false ? 
            (<TextField
              key={randomNum()}
              id={field[0]}
              label={`${this.props.categorie} Recipe ${field[0]}`}
              className={classes.textField}
              value={field[1]}
              onChange={this.handleChange(field[0])}
              margin="normal"
            />) : null
            )
        })
      }  
      </form>
        </Dialog>
          <MenuItem onClick={this.deleteRecipe}>Delete</MenuItem>
        </Menu>
            </IconButton>
            }
          title={item.name}
          subheader={
            item.time_preparation ?  
            (<React.Fragment>
              <TimeIcon /> {totalTiming}
            </React.Fragment>)
            :
            null
          }
        />

        <CardMedia
          onClick={showFinalCard}
          className={classes.media}
          image={item.picture}
          title={item.long_name}
        />
        <CardContent className={classes.cardContent}>
          <Typography component="p">
            {item.description}
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
              Ingredients: {item.ingredients}
            </Typography>
            <Divider />
            <Typography paragraph>
              Notes: {item.notes}
            </Typography>
            <Divider />
            <Typography paragraph>
              Nutrition: {item.nutrition}
            </Typography>
            <Divider />
            <Typography paragraph>
              Baking: {item.time_baking}"
              Cooking: {item.time_cooking}"
              Preparation: {item.time_preparation}"
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

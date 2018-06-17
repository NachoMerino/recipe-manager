import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Typography, Toolbar, AppBar, Tabs, Tab, Button } from '@material-ui/core';
import { Add as AddIcon  } from '@material-ui/icons';
// Components
import Selector from '../selector';
import TabContainer from './TabContainer'
// helper
import { randomNum } from '../../helpers'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    right: '16px',
    top: '-4px'
  },
});
let comingData = [];

class NavBar extends React.Component {
  state = {
    value: 0,
    open: false,
    categoryNames: [],
    startCategoryNames: []
  }

  handleChange = (event, value) => {  
    this.setState({ value });
  }

  addRecipe = index => {
    this.setState({ open: true, categoryNames : comingData });
    const { categoryNames } = this.state;
    if(comingData.length < 1){
      console.log('To create index',categoryNames[index].name)
    } else {
      console.log('To create comingData',comingData[0].name)
    }
  }

  resetNames = () => {
    comingData = []
    const { startCategoryNames } = this.state;
    this.setState({categoryNames : startCategoryNames})
  }

  comingData = name => {
    comingData = [{ name }]
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return { categoryNames: nextProps.categories, startCategoryNames: nextProps.categories }
  }

  render() {
    const { classes, categories } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Title
          </Typography>
          <Tabs value={value} onClick={this.resetNames} onChange={this.handleChange}>
            {categories.map( categorie => <Tab key={randomNum()} label={categorie.name} />)}
          </Tabs>
          <Button onClick={()=>{this.addRecipe(value)}} variant="fab" color="secondary" aria-label="edit" className={classes.button}>
            <AddIcon />
          </Button>
        </Toolbar> 
        </AppBar>
        {categories.map((categorie, index) => value === index && <TabContainer key={randomNum()}><Selector categorie={categorie.name} comingData={this.comingData}/></TabContainer>)}
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);

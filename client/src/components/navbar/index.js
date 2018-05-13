import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
//
import Toolbar from 'material-ui/Toolbar';
// Components
import Selector from '../selector';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    padding:'0 24px 0 0'
  },
});

class NavBar extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {  
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (

      <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.title}>
            ICON HERE
          </Typography>
          <Tabs value={value} onChange={this.handleChange}>
            {this.props.categories.map( categorie => <Tab key={categorie.id} label={categorie.name} />)}
          </Tabs>
        </Toolbar> 
        </AppBar>
        {value === 0 && <TabContainer><Selector categorie={'Cooking'}/></TabContainer>}
        {value === 1 && <TabContainer><Selector categorie={'Patterns'}/></TabContainer>}
        {value === 2 && <TabContainer>...Work in progress</TabContainer>}
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
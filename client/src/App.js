import React, { Component } from 'react';
import Navbar from './components/navbar';
// helper
import { callApi } from './helpers';

import './App.css';

export default class App extends Component {

  state = {
    categories: []
  };

  componentDidMount() {
    callApi('/api/recipes-type')
      .then(res => this.setState({ categories: res }))
      .catch(err => console.log(err));
  }
  
  render() {
    return (
      <div className="main">
      <Navbar categories={[...this.state.categories]}/>       
      </div>
    );
  }
}

import React, { Component } from 'react';
import Navbar from './components/navbar';

import './App.css';

export default class App extends Component {

  state = {
    categories: []
  };

  componentDidMount() {
    this.callApi('/api/recipes-type')
      .then(res => this.setState({ categories: res }))
      .catch(err => console.log(err));
  }

  callApi = async (ENDPOINT) => {
    const response = await fetch(ENDPOINT);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  
  render() {
    return (
      <div className="main">
      <Navbar categories={[...this.state.categories]}/>       
      </div>
    );
  }
}

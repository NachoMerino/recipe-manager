import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

// Components
import Card from '../card';
import FinalCard from '../card/finalCard';

export default class Selector extends Component {

  state = {
    items: []
  };

  showSubCategorie = index => {
    console.log('showSubCategorie')
    const items = [...this.state.items];
    const catPath = `${this.props.categorie}/${items[index].name}`
    this.callApi(`/api/${catPath}`)
      .then(res => this.setState({
        items: res,
        toRender: 'subCategorie'
      }))
      .catch(err => console.log(err));
  }

  showFinalCard = index => {
    console.log('showFinalCard')
    const items = [...this.state.items];
    const catPath = `${this.props.categorie}/${items[index].cooking_categories_ID}/${items[index].id}`
    this.callApi(`/api/${catPath}`)
      .then(res => this.setState({
        items: res,
        toRender: 'finalCard'
      }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.callApi(`/api/${this.props.categorie}`)
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }

  callApi = async ENDPOINT => {
    const response = await fetch(ENDPOINT);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  
  render() {
    let whatToRender = (
      this.state.items.map((item, index) => <Card key={item.id} toRender={this.state.toRender} showSubCategorie={()=>{this.showSubCategorie(index)}} showFinalCard={()=>{this.showFinalCard(index)}} categorie={this.props.categorie} name={item.name} picture={item.picture}/> )
      )
    if(this.state.subCategorie === 'finalCard'){
      whatToRender = (
        this.state.items.map((item, index) => <FinalCard key={item.id} name={item.name} picture={item.picture}/>)
        )
    }
    return (
      <React.Fragment>
      {whatToRender}    
      </React.Fragment>
    );
  }
}

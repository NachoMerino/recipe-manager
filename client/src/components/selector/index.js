import React, { Component } from 'react';

// Components
import Card from '../card';
import FinalCard from '../card/finalCard';

export default class Selector extends Component {

  state = {
    items: []
  };

  showSubCategorie = index => {
    const items = [...this.state.items];
    const catPath = `${this.props.categorie}/${items[index].name}`
    this.callApi(`/api/${catPath}`)
      .then(res => this.setState({
        items: res,
        catPath
      }))
      .catch(err => console.log(err));
  }

  showFinalCard = index => {
    const items = [...this.state.items];
    const catPath = `${this.props.categorie}-id/${items[index].id}`
    this.callApi(`/api/${catPath}`)
      .then(res => this.setState({
        items: res,
         catPath,
        finalCard: true
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
      this.state.items.map((item, index) => {
        return(
          <Card
            key={item.id}
            path={this.state.catPath}
            toRender={this.state.toRender}
            showSubCategorie={()=>{this.showSubCategorie(index)}}
            showFinalCard={()=>{this.showFinalCard(index)}}
            categorie={this.props.categorie}
            name={item.name}
            picture={item.picture}
          />
        )
      })
    )
    if(this.state.finalCard){
      whatToRender = (
        this.state.items.map(item => {
          return(
            <FinalCard
              key={item.id}
              item={item}
            />
          )
        })
      )
    }
    return (
      <React.Fragment>
      {whatToRender}    
      </React.Fragment>
    );
  }
}

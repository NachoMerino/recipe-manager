import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

// Components
import Card from '../card';
import FinalCard from '../card/finalCard';
import RecipeReviewCard from '../card/RecipeReviewCard';

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
        catPath,
        recipeReviewCard: true
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
        recipeReviewCard: false,
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
    let finalCardRender;
    let whatToRender = (
      this.state.items.map((item, index) => {
        return(
          <Grid item xs={4}>
            <Card
              key={item.id}
              toRender={this.state.toRender}
              showSubCategorie={()=>{this.showSubCategorie(index)}}
              categorie={this.props.categorie}
              name={item.name}
              picture={item.picture}
            />
          </Grid>
        )
      })
    )
    if(this.state.recipeReviewCard){
      whatToRender = (
        this.state.items.map((item, index) => {
          return (
            <Grid item xs={3}>
              <RecipeReviewCard
                key={item.id}
                showFinalCard={()=>{this.showFinalCard(index)}}
                item={item}
              />
            </Grid>
          )
        })
      )
    }

    if(this.state.finalCard){
      finalCardRender = (
        this.state.items.map(item => {
          return(
            <FinalCard
              key={item.id}
              item={item}
            />
          )
        })
      )
      whatToRender = null
    }
    return (
      <React.Fragment>
      <Grid container spacing={24}>
      {whatToRender} 
      </Grid> 
      {finalCardRender}  
      </React.Fragment>
    );
  }
}

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
// Components
import Card from '../card';
import FinalCard from '../card/finalCard';
import RecipeReviewCard from '../card/RecipeReviewCard';
// helpers
import { randomNum, callApi } from '../../helpers';

export default class Selector extends Component {

  state = {
    items: []
  }

  showSubCategorie = index => {
    const items = [...this.state.items];
    const catPath = `${this.props.categorie}/${items[index].name}`
    this.props.comingData(items[index].name)
    callApi(`/api/${catPath}`)
      .then(res => this.setState({
        items: res,
        recipeReviewCard: true
      }))
      .catch(err => console.log(err));
  }

  showFinalCard = index => {
    const items = [...this.state.items];
    const catPath = `${this.props.categorie}-id/${items[index].id}`
    this.props.comingData(items[index].id)
    callApi(`/api/${catPath}`)
      .then(res => this.setState({
        items: res,
        recipeReviewCard: false,
        finalCard: true
      }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    callApi(`/api/${this.props.categorie}`)
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }
  
  static getDerivedStateFromProps(nextProps, prevState){
    return { reset: true }
  }
  render() {
    if(this.state.reset){
      delete this.state.reset;
      delete this.state.recipeReviewCard;
      delete this.state.finalCard;
      this.componentDidMount()
    }
    let finalCardRender;
    let whatToRender = (
      this.state.items.map((item, index) => {
        return(
          <Grid key={randomNum()} item xs={4} >
            <Card
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
            <Grid key={randomNum()} item xs={3}>
              <RecipeReviewCard
                categorie={this.props.categorie}
                showFinalCard={()=>{this.showFinalCard(index)}}
                item={item}
              />
            </Grid>
          )
        })
      )
    }

    if(this.state.finalCard){
      finalCardRender = (this.state.items.map(item => <FinalCard key={randomNum()} item={item}/>));
      whatToRender = null;
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

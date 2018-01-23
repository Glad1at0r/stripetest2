import React from 'react';
//import {Card, CardTitle, CardText} from 'material-ui/Card';
//import Divider from 'material-ui/Divider';

import {getArticleList} from './api';

//import toolbar
import GetToolbar from './GetToolbar';
import CardProductList from './CardProductList'
import GridListExampleComplex from './GridList'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {lime100,green500,blue500,brown500} from 'material-ui/styles/colors';

class ProductList extends React.Component {

  constructor() {
    super()
    //Init an empty state
    //articles -> has a list of all articles
    //currentArticle -> the current article being shown in detail
    this.state = {
      products: [],
      isLoading: false
    };
  }

  componentDidMount() {
    //Fetch the list of articles from the DB using the Hasura data apis
    this.setState({
      ...this.state,
      isLoading: true
    })
    getArticleList().then(productList => {
      //Update the state with the fetched articles
      this.setState((prevState) => ({
        isLoading: false,
        products: productList
      }));
    });
  }

  render() {
    return (
		<MuiThemeProvider>
			<GetToolbar />
			<CardProductList />
		</MuiThemeProvider>
    );
  }
}

const articleCardStyle = {
  padding: '20px',
  margin: '20px'
};

export {
  ProductList
};

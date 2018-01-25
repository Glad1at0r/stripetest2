import React from 'react';
import ReactDOM from 'react-dom';

//to use hasura data api to retrieve products list
import {getArticleList} from './api';

//var bodyParser = require('body-parser');

import StripeCheckout from 'react-stripe-checkout';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import {deepOrange900, cyan700, grey300,grey50,
        grey600,blue500, pink500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles =	
  {
	root: 	  {						
				display: 'flex',
				flexWrap: 'wrap',						
			  },  
	gridList: {
				width: '100%',
				//height: 550,
				//padding: 20,
				overflowY: 'auto',
			  },
	subhead:  {
				color: grey50,
				backgroundColor: cyan700,
				fontSize: 20,
				fontWeight: 'bold',
				height: 50,
				textAlign:'center',
			  },	
  };

const tilesData = [
  {
    id: 1,
	img: 'images/grid-list/blueshirt1.jpg',
    title: 'Blue Formal Shirt',
    author: 'GBP 9.99',
  },
  {
	id: 2,
    img: 'images/grid-list/jacket1.jpg',
    title: 'Winter Jacket',
    author: 'GBP 39.99',
  },
  {
    id: 3,
	img: 'images/grid-list/cycle1.jpg',
    title: 'Mountain Bike',
    author: 'GBP 69.99',
  },
  {
    id: 4,
	img: 'images/grid-list/helmet1.jpg',
    title: 'Bike Helmet',
    author: 'GBP 19.99',
  },
   {
    id: 5,
	img: 'images/grid-list/blueshirt1.jpg',
    title: 'Blue Formal Shirt',
    author: 'GBP 9.99',
  },
  {
	id: 6,
    img: 'images/grid-list/jacket1.jpg',
    title: 'Winter Jacket',
    author: 'GBP 39.99',
  },
  {
    id: 7,
	img: 'images/grid-list/cycle1.jpg',
    title: 'Mountain Bike',
    author: 'GBP 69.99',
  },
  {
    id: 8,
	img: 'images/grid-list/helmet1.jpg',
    title: 'Bike Helmet',
    author: 'GBP 19.99',
  },
  
];
							
export class GridListExampleSimple extends React.Component
{
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
					
	onToken = (token) => {
		fetch('https://api.beseeching73.hasura-app.io/charge', {
			  method: 'POST',
			  body: JSON.stringify(token),			  
			  headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
			  },
			  mode: 'no-cors'
		}).then(res => { alert('Your order is successfully placed. You will receive an email shortly. Please click Ok to go to home page');});

	}
			
	render() 
	{return(
		<div style={styles.root}>				
			<GridList
			  cellHeight={300}
			  style={styles.gridList}
			  cols = {3}
			>
				<Subheader style={styles.subhead}>Items on Sale </Subheader>
				{this.state.products.map((product,i) => (
					<GridTile
					  key={i}
					  title={product.name}
					  padding={0}
					  subtitle={<span> <b>{product.price}</b></span>}
					  actionIcon={<StripeCheckout
									token={this.onToken}
									stripeKey={env.STRIPE_PUBKEY}
								  />    
								 }
					>
						<img src={'images/' + product.imagename}  />
					</GridTile>
				))}
			</GridList>				
		</div>); 
	}
}

export default GridListExampleSimple;		
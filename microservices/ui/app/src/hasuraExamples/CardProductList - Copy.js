import React from 'react';

import GridListExampleComplex from './GridList'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions, CardHeader,
        CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {grey50, blueGrey100, grey300, blue500, pink500} from 'material-ui/styles/colors';

const styles = {
  div:{
    display: 'flex',
    flexDirection: 'row',
//    width: '100%',
//    height: '100%',
//    backgroundColor: blueGrey100
  },
  NewTweet : {
    //display: 'inline-flex',
    width : '100%',
    height: '40px',
    padding: '3px 3px',
    color: blue500,
  },
}
const muiTheme = getMuiTheme({
    flatButton : {
          fontSize: '12px',
          textTransform: 'capitalize',
          color: grey50,
   },
  });
const CardProductList = () => (
  <div style = {styles.div}>
      <div id = 'mainElements' style = {{ marginLeft: '	0px', width: '70%',
                                          marginRight: '0px', marginTop: '20px'}}>

          <GridListExampleComplex />
      </div>
  </div>
);

export default CardProductList;

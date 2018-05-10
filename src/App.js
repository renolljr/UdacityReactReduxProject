import React, { Component } from 'react';
import {Provider} from 'react-redux'
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import Main from './components/main';
import CategoryContainer from './components/categoryContainer';
import TopNavBar from './components/topnavbar';
import CreateNewPost from './components/create';

import post from './reducers/post'
import category from './reducers/category'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

import './styles.css';

const store = createStore(
  combineReducers({category, post}),
  composeWithDevTools(applyMiddleware(thunk),
  )
);

const View = ({component: Component, ...rest}) => (
  <Route {...rest}
    render={props => (
      (
        <div className="container">
          <TopNavBar/>
          <Component {...props} />
        </div>
      )
    )}
  />
);

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <View exact path="/" component={Main}/>
            <View exact path="/create" component={CreateNewPost}/>
            <View path="/:category" component={CategoryContainer}/> 

          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;

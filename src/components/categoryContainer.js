import React, {Component} from 'react'
import {connect} from 'react-redux'
import Main from './main';

import {getCategories} from '../actions/categories'
import {getPostsByCategory} from '../actions/posts'

class CategoryContainer extends Component {
  componentDidMount() {
    //get category from the request
    const category = this.props.match.params.category
    
    //calling get Categories()
    this.props.getCategories()
    
    //getting all the posts for the particular category
    this.props.getPostsByCategory(category)

  }

  componentWillReceiveProps(nextQS) {
    //get the current route from the match collection
    let currentRoute = this.props.match.params.category;

    //get the next route from the incoming match
    let nextRoute = nextQS.match.params.category;

    //Assuming that we have new props from this container for this component, we have a new route. 
    let hasNewRoute = (currentRoute !== nextRoute)

    //If a new route, then get the posts given the category.
    if(hasNewRoute) {
      this.props.getPostsByCategory(nextRoute)
    }
  }
 
  render() {
    return (
      <Main {...this.props}/>
    ) 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories : () => dispatch(getCategories()),
    getPostsByCategory: (id) => dispatch(getPostsByCategory(id)),
  }
}

function mapStateToProps(state){
  return {
      category: state.category,
      post: state.post
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer)
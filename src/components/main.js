import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Select from 'react-select'

import Post from './post'
import Category from './category'

import {getCategories} from '../actions/categories'
import {getPostComments} from '../actions/comments'
import {getAllPosts, voteOnPost, deletePostById} from '../actions/posts'

class Main extends Component {
   state = {
      selectedOption: 'asc'  //change to placeHolder value
   }

   componentDidMount() {
    //get Categories and for each Post grab the comments
    this.props.getCategories();
    this.props.getAllPosts()
      .then(res=> {
        res.map(post=>{
          this.props.getCommentsForPost(post.id);
        });
      })
  }

  sortByOrder(val) {
    this.setState({selectedOption: val})
    if(val != null){
      this.props.updateSort(val)
    }
  }

  displayPosts() {
    const {sorted} = this.props.post
    //sort here
    return <div id="posts">
        {
          sorted ? sorted.map((pc, i) => {
            return <Post
                      key={i}
                      data={pc}
                      comments={this.props.post.comments}
                      voteOnPost={this.props.voteOnPost}
                      deletePostById={this.props.deletePostById}
                   />
          }) : null
        }
      </div>
  }

  displayCategories() {
    const {categories} = this.props.category  
    return categories 
          ? categories.map((cat, i) => {
              return <Category key={i} data={cat}/>
            }) 
          : <div>Categories are Unavailable</div>
  }

  render() {
    return (
        <div>
          <div className="row">
            <div className="col-sm-2">
              <div className = "row">
              <div id='categories' className ='author-name'>Categories </div>   
                    {this.displayCategories()}
              </div>
              <div className="row space-top">
                  <div className='author-name'>Sort </div>
                  <div className ="radio">
                      <label><input type="radio" name="selectedSort" value="asc"
                      checked={this.state.selectedOption === 'asc'} 
                      onChange={() => this.sortByOrder('asc')}/>Votes Ascending </label>
                  </div>
                  <div className ="radio">
                    <label> <input type="radio" name="selectedSort" value="desc"
                      checked={this.state.selectedOption === 'desc'}
                      onChange={() => this.sortByOrder('desc')}/>Votes Descending</label>
                  </div>
                  <div className ="radio">
                      <label> <input type="radio" name="selectedSort" value="newest"
                      checked={this.state.selectedOption === 'newest'}
                      onChange={() => this.sortByOrder('newest')}/>Newest</label>
                  </div>
                  <div className ="radio">
                    <label> <input type="radio" name="selectedSort" value="oldest"
                      checked={this.state.selectedOption === 'oldest'}
                      onChange={() => this.sortByOrder('oldest')}/>Oldest</label>
                  </div> 
              </div>
              <div className ="row add-new">
                {   <div className="btn btn-primary" onClick={() => this.props.history.push('add')}>
                     Add New Post
                  </div> }                   
                </div>
            </div>
            <div className="col-sm-10">
              <div className="row">
                <div className="col-sm-8">
                    {this.displayPosts()}
                </div>
                <div className="col-sm-2">
                </div>
            </div>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories : () => dispatch(getCategories()),
    getAllPosts: () => dispatch(getAllPosts()),
    deletePostById: (id) => dispatch(deletePostById(id)),
    voteOnPost: (postId,vote) => dispatch(voteOnPost(postId, vote)),
    getCommentsForPost: (postId) => dispatch(getPostComments(postId)),
    updateSort: (criteria) => dispatch({type:'SORT_BY', 'GET_ALL_POSTS': criteria})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)
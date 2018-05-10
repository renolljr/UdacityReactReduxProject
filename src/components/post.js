import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {getTimeOfCreation} from '../globalutil/helpers'
import {connect} from 'react-redux'
import Comment from './comment'
import AddNewComment from './addNewComment'
import {getPostsById, deletePostById, voteOnPost} from '../actions/posts'
import {getPostComments, createComment, editComment,voteOnComment, deleteCommentById} from '../actions/comments'

class Post extends Component{
  state = {
    visible:false
  }

  componentWillUnmount() {
    this.props.clearPost()
  }

  //post needs to get the comments 
  getCommentsForPost() {
    const id = this.props.data.id
    let hasComments = Boolean(this.props.comments && this.props.comments[id])
    if(hasComments) {
      console.log("hey we have comments!")
      const _comments = this.props.comments[id]
      return _comments ? _comments.map(l =>
          <Comment
            className = 'comments'
            key={l.id} data={l}
            voteOnComment={this.props.voteOnComment}
            editComment={this.props.editComment}
            deleteCommentById={this.props.deleteCommentById}
          />) : null
    }
  }

  getNumOfComments() {
    const id = this.props.data.id
    let hasComments = Boolean(this.props.comments && this.props.comments[id])
    if(hasComments) {
      const items = this.props.comments[id];
      return (
        (items.length === 1 ? `${items.length} comment` : `${items.length} comments`)
      ) 
    }
  }

  //post needs to clear 
  render(){
    const {data, comments} = this.props
    const hasComment = Boolean(comments && comments[data.id])
    return (
      <div className="post">
        <div className="post row">
          <div className="col-xs-12">

            <div className="col-sm-1">
            <div className="pull-left center-text comments-block">
              <span className="post-arrow-up clickable" onClick={() => this.props.voteOnPost(data.id, 'upVote')}></span>
              <span className="post-votescore fw">{data.voteScore}</span> 
              <span className="post-arrow-down fw clickable" onClick={() => this.props.voteOnPost(data.id, 'downVote')}></span>
            </div>
            </div>
          
            <div className="col-sm-10">
            <div className="title">
              <b><Link to={`/${data.category}/${data.id}`}> {data.title}</Link></b> 
            </div>
            <span className="section">
                <span className="author-name">by {data.author} | </span>
                <span className="date">{getTimeOfCreation(data.timestamp)} | </span>
                <span className="post-comments">{hasComment ? comments[data.id].length : 0} {hasComment && comments[data.id].length === 1 ? `comment` : `comments`} | </span>
                <Link to={`/create?edit=${data.id}`} className="edit clickable">edit</Link > |                                    
                <span className="post-delete clickable" onClick={() => this.props.deletePostById(data.id)}> delete</span>
            </span>
            </div>
          
            <div className ="row">
              <div className= "col-sm-2"/>
              <div className ="col-sm-10">
              <div className="body">
                {this.props.data.body}
              </div>
              </div>
            </div>
            <div>
            <div>
                {this.getCommentsForPost()}
                <AddNewComment
                  addNewComment={this.props.addNewComment}
                  post={this.props.data}
                />
            </div>
            </div>
          </div>
         </div>
        </div>
  
  );
  }
}

const mapStateToProps = (state) => {
  return { post: state.post }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (id) => dispatch(getPostsById(id)),
    deletePostById: (id) => dispatch(deletePostById(id)),
    clearPost: () => dispatch({type:'CLEAR_POST'}),
    getPostComments: id => dispatch(getPostComments(id)),
    addNewComment: data => dispatch(createComment(data)),
    editComment: (commentId, data) => dispatch(editComment(commentId,data)),
    deleteCommentById: (id) => dispatch(deleteCommentById(id)),
    voteOnPost: (postId,vote) => dispatch(voteOnPost(postId, vote)),
    voteOnComment: (commentId, vote) => dispatch(voteOnComment(commentId,vote))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Post);
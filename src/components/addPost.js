import React, {Component} from 'react'
import Link from 'react-router-dom'
import {connect} from 'react-redux'

//we need an easy way to serialize some form data
import serialize from 'form-serialize'
//we need a way to create a guid
import uuidv1 from 'uuid/v1'


import {getCategories} from '../actions/categories'
import {getPostsById, createNewPost, editPost} from '../actions/posts'


class AddNewPostView extends Component{
   
    componentDidMount(){
        //run anything that needs to be run when the component mounts 
        console.log("hello")
        this.props.getCategories();
    }

    componentWillReceiveProps(){
        //will we be receiving any props?  

    }

    componentWillUnmount(){
        this.props.clearPost()
    }

    handleAddNewPostEvent(e){
        //handle the form submit event
        e.preventDefault();
        let addPostForm = document.querySelector("#add-post")
        let formVars = serialize(addPostForm, {hash:true});
        let guid = uuidv1();

        let post = {
            id: guid,
            timestamp: Date.now(),
            ...formVars,
            voteScore:0,
            deleted:false,
            commentCount:0
        }
        this.props.createNewPost(post).then(res => {
            addPostForm.reset()
            this.props.history.push(`/`)
        }).catch(e => {
            console.log(e);
        })        
    }
    render(){
        let post = this.props.post
        let categories = this.props.category.categories;
    
        return (post) ?
        <div className="col-sm-6 col-sm-offset-3">
          <div className="panel panel-default create-panel">
            <div className="panel-heading create-new">
              <h3 className="panel-title create-new-text">Create Post</h3>
            </div>
            <div className="panel-body">
              <form id="add-post">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input defaultValue={post ? post.title : ''} required type="text" className="form-control" name="title"/>
                </div>
                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <input type="text" defaultValue={post ? post.author : ''} required className="form-control" name="author"/>
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input type='text' defaultValue={post ? post.category: ''} required className="form-control" name="category"/>
                </div>
                <div className="form-group">
                  <label htmlFor="body">Body</label>
                  <textarea defaultValue={post ? post.body : ''} required className="form-control" name="body" id="" />
                </div>
                <button className="btn btn-default" onClick={() => this.props.history.push('/')}>Back</button>
                <button type="submit" onClick={(e) => this.handleAddNewPostEvent(e)} className="btn pull-right btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>: <div className="alert">
                We're sorry, and error occured.  
            </div>
    }

}

function mapDispatchToProps(dispatch){
    return {
        getCategories: () => dispatch(getCategories()),
        createNewPost: (data) => dispatch(createNewPost(data)),
        editPost: (postId,data) => dispatch(editPost(postId,data)),
        clearPost: () => dispatch({type:'CLEAR_POST'}),
        getPost: (id) => dispatch(getPostsById(id))
    }
}

function mapStateToProps(state){
    return {
        category: state.category,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddNewPostView)
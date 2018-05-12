import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import serialize from 'form-serialize'
import queryString from 'query-string'

import {mapDispatchToProps,mapStateToProps} from '../globals/globals'

class EditPostView extends Component{

    componentDidMount(){
        //do any async processing here
        const {id} = this.props.match.params //get id from match collection
       
        this.props.getCategories().catch(e => {
            console.log(e);
        })   ;  //grab the categories
        this.props.getPost(id).catch(e => {
            console.log(e);
        })   ; //get the post
    
    }
    componentWillReceiveProps(){
        //are we receiving any props, if so do work here
    }

    componentWillUnmount(){
        //component is getting ready to be unmounted 
        this.props.clearPost()
    }

    handlePostEditFormSubmit(e){
        //handle the form submit without side effects
        //select form id #edit-post  
        e.preventDefault();
        let editPostForm = document.querySelector("#edit-post")
        let formVars = serialize(editPostForm, {hash:true});
        let edit = {
            ...formVars
        }
        let id = this.props.match.params.id;
        this.props.editPost(id,edit)
           .then(res => {
                editPostForm.reset()
                this.props.history.push(`/`)
            })
            .catch(e => {
              console.log(e)
          })
    }

    render(){
        let post = this.props.post.post;
        let categories = this.props.category.categories;
        return (post) ?
            <div className="col-sm-6 col-sm-offset-3">
            <div className="panel panel-default create-panel">
                <div className="panel-heading create-new">
                    <h3 className="panel-title create-new-text">Edit Your Post</h3>
                </div>
                <div className="panel-body">
                    <form id="edit-post">
                        <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input defaultValue={post ? post.title : ''} required type="text" className="form-control" name="title"/>
                        </div>
                        <div className="form-group">
                        <label htmlFor="author"> Author Name</label>
                        <input type="text" defaultValue={post ? post.author : ''} required className="form-control" name="author"/>
                        </div>
                        <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input type='text' defaultValue={post ? post.category: ''} required className="form-control" name="category"/>
                        </div>
                        <div className="form-group">
                        <label htmlFor="body">Enter Post Body</label>
                        <textarea defaultValue={post ? post.body : ''} required className="form-control" name="body" id="" />
                        </div>
                        <button className="btn btn-default" onClick={() => this.props.history.push('/')}>Back</button>
                        <button type="submit" onClick={(e) => this.handlePostEditFormSubmit(e)} className="btn pull-right btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            </div> : <div className="alert">
                We're sorry, and error occured.  
            </div>
            
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (EditPostView)
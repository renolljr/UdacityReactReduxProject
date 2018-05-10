import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCategories} from '../actions/categories'
import {getPostsById, createNewPost, editPost} from '../actions/posts'
import serialize from 'form-serialize'
import uuidv1 from 'uuid/v1'
import queryString from 'query-string'
import Select from 'react-select'

class CreateNewPost extends Component {
  state = {
    selectedCategory: '',
    edit: queryString.parse(this.props.location.search).edit,
   
  }

  componentDidMount() {
    const {edit} = this.state
    this.props.getCategories();
    if (edit)
      this.props.getPost(edit)
        .then(res => {
          this.setState({selectedCategory: {value: res.category, label: res.category}})
        })
        .catch(e => this.props.history.push('/'))
  }

  componentWillUnmount() {
    this.props.clearPost()
  }

  handleFormSubmit(){
    //TODO
  }

  handleSelectionChange(val){
    console.log("handleSelectionChange fired")
    this.setState({selectedCategory: val})
  }

  render() {
    let {edit} = this.state
    let {post} = this.props.post
    let categories = this.props.category.categories;

    return (edit && post) || !edit ?
    <div className="col-sm-6 col-sm-offset-3">
      <div className="panel panel-default create-panel">
        <div className="panel-heading create-new">
          <h3 className="panel-title create-new-text">Create Post</h3>
        </div>
        <div className="panel-body">
          <form id="create-post">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input defaultValue={post && edit ? post.title : ''} required type="text" className="form-control" name="title"/>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input type="text" defaultValue={post && edit ? post.author : ''} required className="form-control" name="author"/>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input type='text' defaultValue={post && edit ? post.category: ''} className="form-control" name="category"/>
{/*               {categories 
                ?
                <select name="category" >
                  {categories.map( p =>
                    <option key={p.name} value={p.name} onChange={()=>this.handleSelectionChange.bind(this,p.name)}>{p.name}</option>
                  )}
               </select>
               : null
              } */}
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea defaultValue={post && edit ? post.body : ''} required className="form-control" name="body" id="" />
            </div>
            <button className="btn btn-default" onClick={() => this.props.history.push('/')}>Back</button>
            <button type="submit" className="btn pull-right btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>: null
  }
}

const mapStateToProps = (store) => {
  return {
    category: store.category,
    post: store.post
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
    createNewPost: (data) => dispatch(createNewPost(data)),
    editPost: (postId,data) => dispatch(editPost(postId,data)),
    clearPost: () => dispatch({type:'CLEAR_POST'}),
    getPost: (id) => dispatch(getPostsById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPost)
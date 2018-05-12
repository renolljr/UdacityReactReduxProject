import React, {Component} from 'react';
import serialize from 'form-serialize'
import uuidv1 from 'uuid/v1'

class AddNewComment extends Component{
  //this is a stateful component, not stateless functional component
  state = {
    formid: ''
  }
  componentWillMount(){
    //we need to create a unique form id to attach our event handler to
    let uuid = uuidv1(), prefix = "comment-form-",
      id = prefix + uuid;
    this.setState({formid: id})   
  }
  formSubmit(e){
    //prevent default event
    e.preventDefault()
    //get formID from the state
    let formid = this.state.formid;
    //select the form element
    let form = document.querySelector(`#${formid}`);
    // serialize takes the form and serializes the form fields into prettier json
    let data = serialize(form,{ hash: true })
    // create a unique identifier (uuid/guid) for the new comment
    this.props.addNewComment({...data, id: uuidv1(),parentId:this.props.post.id,timestamp: Date.now()})
    //reset the form 
    form.reset()
  }
  render(){
    let formid = this.state.formid;
    return (
      <form className="divider comment" id={`${formid}`}>
        <div className="row">
          <div className="col-sm-4">
            <div className="form-group comment-add-name">
              <input type="text" className="form-control" id="author" name="author" placeholder="Name" />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <textarea rows="4" className="form-control" id="body" name="body" placeholder="Comment" />
            </div>
          </div>
          <div className="col-sm-2">
            <button className="btn btn-readable" type="submit" onClick={e => this.formSubmit(e)}>Add</button>
          </div>
        </div>
      </form>
    )
  }
 
}

export default AddNewComment;


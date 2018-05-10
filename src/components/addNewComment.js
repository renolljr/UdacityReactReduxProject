import React from 'react';
import serialize from 'form-serialize'
import uuidv1 from 'uuid/v1'

const AddNewComment = (props) => {
  function formSubmit(e){
    e.preventDefault()
    let form = document.querySelector('#comment-form');
    // serialize takes the form and serializes the form fields into prettier json
    let data = serialize(form,{ hash: true })
    // create a unique identifier (uuid/guid) for the new comment
    props.addNewComment({...data, id: uuidv1(),parentId:props.post.id,timestamp: Date.now()})
    //reset the form 
    form.reset()
  }
  return (
    <form className="divider comment" id="comment-form">
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
          <button className="btn btn-readable" type="submit" onClick={e => formSubmit(e)}>Add</button>
        </div>
      </div>
    </form>
  )
}

export default AddNewComment;
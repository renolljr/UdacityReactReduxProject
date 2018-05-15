import React, {Component} from 'react'
import {getCreatedDate} from '../globals/helpers'

export default class Comment extends Component {
  state = {
    edit:false
  }

  saveEditedComment(id) {
    let data = {
        body: this.refs.comment.value
    }

    this.props.editComment(id,data)
      .then(r =>{
        this.setState({edit: false})
      })
  }

  render() {
    const {data} = this.props
    let {edit} = this.state
    return (
        <div id="comments" className ="comment">
          <div className="row divider">
              <div className="col-sm-1 center-text">
                <div className="comments-block">
                  <span className="comment-arrow-up clickable" onClick={() => this.props.voteOnComment(data.id,'upVote')}></span>
                  <span className="post-votescore fw">{data.voteScore}</span> 
                  <span className="comment-arrow-down fw clickable" onClick={() => this.props.voteOnComment(data.id,'downVote')}></span>
                </div>
              </div>
              <div className="col-sm-10">
                <span className="author-name">{data.author}</span>
                <p>{edit ? <input type="text" ref="comment" defaultValue={data.body} className="form-control" />
                    : data.body
                  }
                </p>
              </div>
           </div>
          <div className="row comment-controls">
              <div className="col-sm-1">
              </div>
              <div className="col-sm-8">
              <span className="section">
                <span className="clickable spacer" onClick={() => this.props.deleteCommentById(data.id)}> remove </span>  
                  {edit ?
                      <span>
                        <span onClick={() => this.setState({edit:false})} className="clickable spacer">undo</span>            
                        <span onClick={() => this.saveEditedComment(data.id)} className="clickable spacer">save</span>
                      </span>
                    : <span className="clickable spacer" onClick={() => this.setState({edit:true})} >  edit  </span> 
                  } 
                  <span className="date">  {getCreatedDate(data.timestamp)} </span>
              </span>
              </div>
              </div>
        </div>

    )
  }
}

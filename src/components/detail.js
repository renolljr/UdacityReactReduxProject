
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Post from './post'
import {mapDispatchToProps,mapStateToProps} from '../globals/globals'

//show a single page for the post itself.
//this explicit view is not needed.

class PostDetail extends Component{
    componentDidMount(){
        //get the post id from the match collection
    
        const {post_id} = this.props.match.params
        this.props.getPostById(post_id)
            .catch(error => console.error(error)) 
            .then(post => {
                    this.props.getCommentsForPost(post.id);
                })
            
        }
    displayPost(){
        const post = this.props.post
        return <div id="posts"><Post
                    data={post}
                    comments={this.props.post.comments}
                    voteOnPost={this.props.voteOnPost}
                    deletePostById={this.props.deletePostById}
                /></div>
    }        

    render() {
        return (
            <div>
              <div className="row">
                <div className="col-sm-2">
                  <div className = "row"></div>
                  <div className="row space-top"></div>
                  <div className ="row add-new"></div>
                </div>
                <div className="col-sm-10">
                  <div className="row">
                    <div className="col-sm-8">
                        {this.displayPost()}
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

export default connect(mapStateToProps,mapDispatchToProps)(PostDetail);


import {getCategories} from '../actions/categories'
import {getPostsById, getAllPosts, getPostsByCategory, deletePostById, createNewPost, editPost, voteOnPost} from '../actions/posts'
import {getPostComments, createComment, editComment,voteOnComment, deleteCommentById} from '../actions/comments'

export const READABLE_API_BASEURL = "http://localhost:3001/"
export const READABLE_API_POSTS_URL = "http://localhost:3001/posts/"
export const basicAuthHeaders =   { 'Authorization': 'whatever-you-want' } 
export const postAndPutAuthHeaders = { 
  'Authorization': 'whatever-you-want',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
} 

export function mapDispatchToProps(dispatch){
  return {
      getCategories: () => dispatch(getCategories()),
      createNewPost: (data) => dispatch(createNewPost(data)),
      clearPost: () => dispatch({type:'CLEAR_POST'}),
      getPost: (id) => dispatch(getPostsById(id)),
      getAllPosts: () => dispatch(getAllPosts()),
      getPostsByCategory: (id) => dispatch(getPostsByCategory(id)),
      deletePostById: (id) => dispatch(deletePostById(id)),
      editPost: (postId,data) => dispatch(editPost(postId,data)),
      voteOnPost: (postId,vote) => dispatch(voteOnPost(postId, vote)),
      getCommentsForPost: (postId) => dispatch(getPostComments(postId)),
      addNewComment: data => dispatch(createComment(data)),
      editComment: (commentId, data) => dispatch(editComment(commentId,data)),
      deleteCommentById: (id) => dispatch(deleteCommentById(id)),
      voteOnComment: (commentId, vote) => dispatch(voteOnComment(commentId,vote)),
      updateSort: (criteria) => dispatch({type:'SORT_BY', 'GET_ALL_POSTS': criteria})
  }
}

export function mapStateToProps(state){
  return {
      category: state.category,
      post: state.post
  }
}

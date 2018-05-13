import {READABLE_API_BASEURL} from './misc/globals'
import {postAndPutAuthHeaders, basicAuthHeaders} from './misc/globals'
import { GET_COMMENTS_FOR_POST, CREATE_A_COMMENT, VOTE_ON_COMMENT, EDIT_A_COMMENT, DELETE_A_COMMENT} from "./types" 

export const getPostComments = (postId) => {
  return dispatch => {
    return fetch(READABLE_API_BASEURL + 'posts/' + postId + '/comments/',
    { 
        method: "GET",
        headers: basicAuthHeaders
    })
    .catch(error => console.error(error))  
    .then((resp) => resp.json())
    .then((data) => {
      dispatch(
        {
          type: GET_COMMENTS_FOR_POST,
          postComments: {
                          parentId: postId,
                          data: data
                        }
          });
      return data
    })
  }
}

export const createComment = (data) =>{
  return dispatch => {
    return fetch(READABLE_API_BASEURL + 'comments/',
    {   
        method: 'POST',
        headers: postAndPutAuthHeaders,
        body: JSON.stringify(data)
    })
    .catch(error => console.error(error))  
    .then((resp) => resp.json())
    .then((data) =>{
      dispatch({type:'CREATE_A_COMMENT', comment: data})
      return data
    }) 
  }
}

export const voteOnComment = (commentId, vote) => {
  const data = { option: vote }
  return dispatch => {
    return fetch(READABLE_API_BASEURL + 'comments/' + commentId + '/',
    {   
        method: 'POST',
        headers: postAndPutAuthHeaders,
        body: JSON.stringify(data)
    })
    .catch(error => console.error(error)) 
    .then((resp) => resp.json())
    .then((data) =>{
      dispatch({type:'VOTE_ON_COMMENT', comment: data})
      return data
    }) 
  }
}

export const editComment = (commentId, data) => {
  return dispatch => {
    return fetch(READABLE_API_BASEURL + 'comments/' + commentId + '/',
    {   
        method: 'PUT',
        headers: postAndPutAuthHeaders,
        body: JSON.stringify(data)
    })
    .catch(error => console.error(error)) 
    .then((resp) => resp.json())
    .then((data) =>{
      dispatch({type:'EDIT_A_COMMENT', comment: data})
      return data
    }) 
  }
}

export const deleteCommentById = (commentId) => {
  return dispatch =>{
    return fetch(READABLE_API_BASEURL + 'comments/' + commentId + '/',
    { 
      method: "DELETE",
      headers: basicAuthHeaders
    })
    .catch(error => console.error(error)) 
    .then((resp) => resp.json())
    .then((data) =>{
      dispatch({type:'DELETE_A_COMMENT', comment: data})
      return data
    }) 
  }
}


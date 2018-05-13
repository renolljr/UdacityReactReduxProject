import {READABLE_API_POSTS_URL, READABLE_API_BASEURL} from './misc/globals'
import {postAndPutAuthHeaders, basicAuthHeaders} from './misc/globals'
import {
    GET_ALL_POSTS,
    GET_POST_BY_ID, 
    CREATE_NEW_POST, 
    VOTE_POST, 
    EDIT_A_POST, 
    DELETE_A_POST, 
    GET_POST_ACK
 } from "./types"


export const getAllPosts = () => {
    return dispatch => { //dispatch c/o mapDispatchToProps
        return fetch(READABLE_API_POSTS_URL, {
            method: 'GET',
            headers: basicAuthHeaders
        })
        .catch(error => console.error(error))
        .then((response) => response.json())
        .then((data) => {
                //dispatch an action, to update the store
            dispatch({ type: GET_ALL_POSTS, posts: data });
            return data;
        })
    }
};

//parameter id is a string 
export const getPostsById = (id) => {
    return dispatch => { //dispatch c/o mapDispatchToProps
        return fetch(READABLE_API_POSTS_URL + id, { headers: basicAuthHeaders })
            .then((response) => response.json())
            .catch(error => console.error(error))
            .then((data) => {
                //dispatch an action, to update the store
                dispatch({ type: GET_POST_BY_ID, post: data });
                return data;
            })
    }
};

export const getPostsByCategory = (category) =>{
    return dispatch =>{
        let CATEGORY_POST_URL = READABLE_API_BASEURL + category + '/posts/'
        return fetch(CATEGORY_POST_URL,
             {headers: basicAuthHeaders})
            .then((response) => response.json())
            .catch(error => console.error(error))
            .then(function(data){
                dispatch({type: GET_POST_ACK, posts: data});
                return data;
            })
    }
};

//post here is a javascript object, which may be converted to a string in Json
export const createNewPost = (post) => {
    return dispatch => {   //dispatch c/o mapDispatchToProps
        return fetch(READABLE_API_POSTS_URL, {
            method: 'post',
            headers: postAndPutAuthHeaders,
            body: JSON.stringify(post)
        })
        .catch(error => console.error(error))
        .then((response) => response.json())
        .then((data) => {
             //dispatch an action
            dispatch({ type: CREATE_NEW_POST, post: data });
            return data;
        })
    }
};

//vote is a value, postId is a GUID
export const voteOnPost = (postId, vote) => {
    const data = { option: vote }
    return dispatch => {
        return fetch(READABLE_API_POSTS_URL + postId + '/', {
            method: 'post',
            headers: postAndPutAuthHeaders,
            body: JSON.stringify(data)
        })
        .catch(error => console.error(error))
        .then((response) => response.json())
        .then((data) => {
             //dispatch an action
            dispatch({ type: VOTE_POST, post: data });
            return data;
        })
    }
};

export const editPost = (postId, data) => {
    return dispatch => {
        return fetch(READABLE_API_POSTS_URL + postId + '/', {
            method: 'put',
            headers: postAndPutAuthHeaders,
            body: JSON.stringify(data)
        })
        .catch(error => console.error(error))
        .then((response) => response.json())
        .then((data) => {
             //dispatch an action
            dispatch({ type: EDIT_A_POST, post: data });
            return data;
        })
    }
};

export const deletePostById = (postId) =>  {
    return dispatch => {
        return fetch(READABLE_API_POSTS_URL + postId + '/',{ 
                 method: 'DELETE',
                 headers: postAndPutAuthHeaders
             })
            .catch(error => console.error(error))  //ok for now
            .then((response) => response.json())
            .then((data) => {
                 //dispatch an action
                dispatch({ type: DELETE_A_POST, post: data });
                return data;
            })
    }
};
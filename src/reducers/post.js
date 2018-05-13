import {sortByCriteria} from '../globals/helpers'

const post = (state = {currentSort: 'desc'}, action) => {
  let _post;
/* 
  Post Data Looks like this on the server
  posts[post.id] = {
    id: post.id,
    timestamp: post.timestamp,
    title: post.title,
    body: post.body,
    author: post.author,
    category: post.category,
    voteScore: 1,
    deleted: false,
    commentCount: 0
  }
  
  With redux the reducer should return the state of the object without side effects.  

 Comment looks like this.   

 comments[comment.id] = {
  id: comment.id,
  timestamp: comment.timestamp,
  body: comment.body,
  author: comment.author,
  parentId: comment.parentId,   
  voteScore: 1,
  deleted: false,
  parentDeleted: false
} 
  
  Notes:  Every comment has a parent associated with it.  It's parentID is the post's UUID.  
  */

  switch (action.type) {

      case 'CREATE_A_COMMENT':
        // action is dispatched, call createComment, get some data back (retval)
    
        let {comments} = state
        let comment = action.comment;
        let postId = action.comment.parentId;

        comments[postId].push(comment)
        comments[postId].sort((a, b) => b.voteScore - a.voteScore)
        
        return {
          ...state,
          comments: comments
        }

      case 'GET_COMMENTS_FOR_POST':
        //get the comments from the store, if no comments initialize empty object
        comments = {...state.comments} || {}
        postId = action.postComments.parentId;
      
        let comments_for_post = action.postComments.data;
      
        //Question: do these need to be sorted?  
        comments[postId] = comments_for_post.sort((a, b) => b.voteScore - a.voteScore)
  
        return {
          ...state,
          comments
          }

      case 'VOTE_ON_COMMENT':

          //we get a comment back
        comments = {...state.comments}  //the comments 
        let post = comments[action.comment.parentId];  //get all post comments       
        let commentId = post.findIndex(z => z.id === action.comment.id);
  
        post[commentId] = action.comment
        post.sort((a, b) => b.voteScore - a.voteScore)
        comments[action.comment.parentId] = post
        
        return {
            ...state,
             comments: comments
        }
  
      case 'EDIT_A_COMMENT':

        comments = {...state.comments}
     
        postId = action.comment.parentId;
 
        post = comments[postId];
  
        //find the comment id
        let commentID = post.findIndex(z => z.id === action.comment.id);
        post[commentID] = action.comment;  // replace the comment with the new / edited one       
        comments[postId] = post;  // update the post comments
     
        return {
            ...state,
             comments
        }
  
      case 'DELETE_A_COMMENT':

        comment = action.comment;  
        comments = {...state.comments};  //get the comments from the store
        postId = action.comment.parentId;
        post = comments[postId];

        //remove it from the store
        comments[action.comment.parentId] =  post.filter(z => z.id !== comment.id);
        
        return {
            ...state,
             comments
            }
  
    case "GET_POST_BY_ID":
        _post = action.post;
        return {
          ...state,
          post: _post
        };

    case "GET_POST_ACK":
        let categoryPosts = action.posts
        return {
          ...state,
          allPosts: categoryPosts,
          sorted: categoryPosts.sort((a, b) => b.voteScore - a.voteScore)  
        };

    
    case 'GET_ALL_POSTS':
        let activePosts = action.posts.filter(z => !z.deleted)
        return {
          ...state,
          allPosts: activePosts,
          sorted: activePosts.sort((a, b) => b.voteScore - a.voteScore)  
        };

    case "VOTE_POST":
        _post = action.post;

        let allPosts = state.allPosts || []
        let postIndex = allPosts.findIndex(x => x.id == action.post.id);

        allPosts[postIndex] = _post;
       
        return {...state,
          allPosts,
          post: _post,
          sorted: sortByCriteria([...allPosts], state.currentSort)
        };

    case "CREATE_NEW_POST":
        //get the collection of all posts, if we don't have any posts create new collection
        allPosts = state.allPosts || []
        
         //get the post from the dispatched action
        _post = action.post

        //add the post to the posts collection
        allPosts.push(_post);

        //ensure we aren't displaying deleted entries 
        activePosts = allPosts.filter(z => !z.deleted)

        //return updated state
        return {
          ...state,
          post: _post,
          allPosts: activePosts,
          sorted: activePosts.sort((a, b) => b.voteScore - a.voteScore)  
        };

        break;

    case "EDIT_A_POST":
    
        //get the post from the action
        _post = action.post;
        //grab the allPosts collection from the store, if undefined create it
        allPosts = state.allPosts;
        //obtain the index of the post
        postIndex = allPosts.findIndex(x => x.id == action.post.id);
        //replace that value
        allPosts[postIndex] = _post;
        //return the new state
        return {...state, allPosts };
        
        break;

    case "DELETE_A_POST"://set deleted flag
        let all_posts = state.allPosts || []
     
        postId = action.post.id;
        postIndex = all_posts.findIndex(x => x.id == postId);

        all_posts[postIndex] = action.post

        let active_posts = all_posts.filter(z => !z.deleted);
      
        return {
          ...state,
          post: null,
          allPosts: active_posts,
          sorted: sortByCriteria([...active_posts], state.currentSort)
        }

    case 'CLEAR_POST':
      return {...state, post: null}
    case 'SORT_BY':
      //sort by the criteria, we are displaying the sorted list of posts assuming the list exists.
      return {...state,
         currentSort: action.criteria,
         sorted: sortByCriteria(state.allPosts, action.criteria)
        }
    default:
      return state;
  }
};

export default post;


//Category Reducer, dispatch an action here.  

function category(state = {}, action){
  if (action.type === 'GET_ALL_CATEGORIES'){
    return {
      ...state,
      categories: action.categories
    };
  }
  return state;
}
export default category;
//Category Reducer, dispatch an action here.  

function category(state = {}, action){
  switch (action.type) {
    case 'GET_ALL_CATEGORIES':
      return {
        ...state,
        categories: action.categories
      };
    default:
      return state;
  }
}
export default category;
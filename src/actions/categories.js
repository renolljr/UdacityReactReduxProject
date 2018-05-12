import {
  READABLE_API_BASEURL,
  basicAuthHeaders
} from '../globals/globals'

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

export function getCategories() {
  return dispatch => {
    return fetch(READABLE_API_BASEURL + 'categories/',
       { headers: basicAuthHeaders})
      .catch(error => console.error(error)) 
      .then((resp) => resp.json())
      .then((data) => {
        let all = {name: 'All Categories', path: ""}
        let categories = data.categories
        if (categories){
          categories.unshift(all);
        }
        dispatch({type: GET_ALL_CATEGORIES, categories: data.categories});
      })
  }
}; 
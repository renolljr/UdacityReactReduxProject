import React from 'react';
import {withRouter} from 'react-router-dom'

//stateless functional component for Category
function Category(props){

  const {data} = props
  const currentPath = props.match.params.category
  
  return (
    <div className='radio'>
    <label className={data.path==='' ? "first" : ""}>
       <input type="radio"
              className='hidden'
              name="category"
              value={data.path}
              checked={data.name === currentPath}
              onChange={() => props.history.push('/' + data.path)}/>
              {data.name}
    </label>
    </div>
  )

}

export default withRouter(Category)
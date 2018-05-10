import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class TopNavBar extends Component {
  render(){
    return(
      <div>
        <header className="navbar navbar-default navbar-fixed-top" id="top"> 
          <div className="container"> 
            <div className="navbar-header"> 
              <Link to="/" className="navbar-brand" >Udacity Nanodegree Project </Link>
            </div> 
          </div> 
        </header>
        <div className="header-spacing"/>
      </div>
    )
  }
}

export default TopNavBar;
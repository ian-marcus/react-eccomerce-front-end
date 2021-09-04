/*
      Activity
      1. Create NotFound.js inside the page folder, when the user goes to a rout that is not included in the Switch component, it should display 'Page Not Found/Error 404. Go back to the homepage(Link to "/")'


    */

import React from 'react'
import { Link } from 'react-router-dom'

export default function Notfound(){
      return(
                <>
                        <h1>Error 404</h1>
                        <span>Go back to the </span>
                        <Link to="/">Homepage</Link> 
                </>  
            )
}

//Other solution
//<p>Go back to the <Link to="/">homepage</Link></p>
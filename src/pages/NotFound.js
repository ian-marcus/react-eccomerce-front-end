import React from 'react'
import { Link } from 'react-router-dom'

export default function Notfound(){
      return(
                <>
                        <h1>"Sorry..."</h1>
                        <span>Go back to the </span>
                        <Link to="/">Homepage</Link> 
                </>  
            )
}

//Other solution
//<p>Go back to the <Link to="/">homepage</Link></p>
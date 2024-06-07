import React from 'react'
import { Link } from 'react-router-dom'
function PageNotFound() {
  return (
    <div>
      <h1>Page Not Found :/</h1>
      <h1>Go to the homePage <Link to="/"> Home Page</Link></h1>
    </div>
  )
}

export default PageNotFound

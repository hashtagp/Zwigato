import React from 'react'
import './Header.css'
import ExploreMenu from '../ExploreMenu/ExploreMenu'


const Header = () => {
  return (
    <>
    <div className='header'>
      <div className="header-contents">
        {/* <h2>Setup your peth puja here</h2> */}
        <a href="#explore-menu">
          <button>View Menu</button>
        </a>
      </div>
    </div>
    </>
  )
}

export default Header

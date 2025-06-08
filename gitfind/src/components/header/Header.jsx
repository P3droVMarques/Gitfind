import React from 'react'
import './header.css';
import "../../pages/home/global.css";
import "../../../src/responsive.css";
// Header Component
// This component renders the header of the application with the title 'GitFind'.

function Header() {
  return (
    <header className='Header'>
        <h1>GitFind</h1>
    </header>
  )
}

export default Header;
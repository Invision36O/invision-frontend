import React from 'react'
import './Navbar.css'

export default function(){
    return(
    <>
        <nav className='navbarr'>
            <div>
                <a className='nav1' href="">Home</a>
                <a className='nav1' href="">Features</a>
                <a className='nav1' href="">How to use</a>
                <a className='nav1' href="/importmodel">Import Model</a>
            </div>
            <div className='nav2'>
                <a className='nav1 right' href="">Login</a>
            </div>
        </nav>
    </>
    )
}


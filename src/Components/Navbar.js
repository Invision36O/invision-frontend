import React from 'react'
import navstyle from './Navbar.module.css'

export default function(){
    return(
    <>
        <nav className={navstyle.navbarr}>
            <div>
                <a className={navstyle.nav1} href="">Home</a>
                <a className={navstyle.nav1} href="">Features</a>
                <a className={navstyle.nav1} href="">How to use</a>
                <a className={navstyle.nav1} href="/importmodel">Import Model</a>
            </div>
            <div className={navstyle.nav2}>
                <a className={navstyle.nav1} href="">Login</a>
            </div>
        </nav>
    </>
    )
}


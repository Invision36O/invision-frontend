import React, {useState} from 'react'
import logo from "../Logo/applogo.png"
import './Navbar.css'
import{Link} from 'react-router-dom'

export default function(){
    const [click,setClick]=useState(false);
    return(
    <>
        <nav className="navbar">

            <div className='menu-items'>
            
               <ul>
               <img className="applogo" src={logo} width={300} height={54}></img>
                <li><a href="/">Home</a></li>
                <li><a href="/Login">Features</a></li>
               </ul>
             </div>

        </nav>
    </>
    )
}


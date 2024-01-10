import React from 'react'
import "./Footer.css"
export default function Footer() {
  return (
    <div>
      <div className="background">
        <div className="logos">
            <div className="logo">
                <img src="/Icons/FYPLogo.png" alt="" />
            </div>
            <div className="icons">
                <img src="/Icons/Linkedin.png" alt="" />
                <img src="/Icons/Instagram.png" alt="" />
                <img src="/Icons/Facebook.png" alt="" />
            </div>
        </div>

        <div className='info'>
            <ul>
                <a href=""><li>Contact</li></a>
                <a href=""><li>About</li></a>
                <a href=""><li>Terms & Policy</li></a>
            </ul>
        </div>

        <div className="bottom">
            <p>Copyright &#169; 2024 Invison360</p>
        </div>
        
      </div>
    </div>
  )
}

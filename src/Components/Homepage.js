import React from 'react';
import Navbar from './Navbar'
import styles from './Homepage.module.css'

export default function Homepage(){
    return(
        <>
        <Navbar/><br/>
        <h1 className={styles.welcome}>Welcome</h1>
        <a href=""><h1>Hello</h1></a>
        </>
    )
}

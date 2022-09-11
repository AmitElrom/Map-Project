import React from 'react'

import classes from './Button.module.css';

const Button = ({ children, onClick }) => {
    return (
        <button className={classes['button-28']} onClick={onClick} >{children}</button>
    )
}

export default Button
import classes from './Card.module.css'
import { Fragment } from 'react';


const Card = (props) => {
  return (
    <div className={classes.card}>{props.children}</div>
    )
}

export default Card;
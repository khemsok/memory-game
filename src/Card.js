import React, {Component} from "react";
import PropTypes from "prop-types"
import "./Card.css";

const Card = (props) => {
    let style = {}
    if(props.showing){
        style.backgroundColor = props.card.backgroundColor
    }
    return(
        <div onClick = {props.onClick} style = {style} className = "card-container">


        </div>

    )
}

Card.propTypes = {
    showing: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Card
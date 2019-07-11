import React from 'react';
import PropTypes from 'prop-types';

function Challenge(props){
    let { challenge } = props;

    let match = ()=>{
        var word = document.querySelector('#word').value.toLowerCase(); 
        if(word === challenge.word.toLowerCase()){
            props.match(true);
            return true;
        }
        props.match(false);
        return false;
    }
    

    return(
        <div className="challenge">
            <img className="image" src={challenge.image} />
            <input id="word" className="name" id="word"/>
            <button onClick={match}>Já fiz</button>
        </div>
    )
}

Challenge.propTypes = {
    challenge: PropTypes.object.isRequired,
    match: PropTypes.func.isRequired,
}

export default Challenge;
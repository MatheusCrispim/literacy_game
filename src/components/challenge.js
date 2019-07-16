import React from 'react';
import PropTypes from 'prop-types';
import { CardB, ButtonB, InputGroupB, FormControlB } from './components';

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

    let playAudio = (src)=>{
        let audio = new Audio();
        audio.src = src;
        audio.play();
    }
    

    return(
        /*<div className="challenge">
            <img className="image" src={challenge.image} />
            <input id="word" className="name" id="word"/>
            <button onClick={match}>Já fiz</button>
        </div>*/
        <CardB id="card-challenge-one">
            <CardB.Img id="card-challenge" variant="top" src={challenge.image} />
            <CardB.Body>
                <CardB.Text>
                <InputGroupB className="mb-3">
                    <FormControlB
                    placeholder="digite a palavra relacionada a imagem"
                    aria-label="digite a palavra relacionada a imagem"
                    aria-describedby="basic-addon2"
                    />
                    <InputGroupB.Append>
                        <ButtonB id="button-confirm" variant="dark" onClick={match}><i class="fa fa-check-square"></i></ButtonB>
                    </InputGroupB.Append>
                </InputGroupB>
                </CardB.Text>
                    {challenge.sound !== null & challenge.sound !== undefined & challenge.sound !== ""?                   
                        <ButtonB variant="dark" onClick={()=>playAudio(challenge.sound)}><i className="fa fa-volume-up" aria-hidden="true"></i></ButtonB>
                    :
                        <ButtonB variant="dark" disabled><i className="fa fa-volume-up" aria-hidden="true"></i></ButtonB>
                    }
            </CardB.Body>
        </CardB>
    )
}

Challenge.propTypes = {
    challenge: PropTypes.object.isRequired,
    match: PropTypes.func.isRequired,
}

export default Challenge;
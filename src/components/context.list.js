import React,{ Fragment } from 'react';
import PropTypes from 'prop-types';
import { CardB, CardDeckB, ButtonB } from './components';
import './style/style.css';

function ContextList(props){

    let playAudio = (src)=>{
        let audio = new Audio();
        audio.src = src;
        audio.play();
    }

    let contexts = props.contexts.map((context)=>{
        return(
            <CardB
                key={context.id}>
                <CardB.Img variant="top" src={context.image} />
                <CardB.Body>
                    <CardB.Text>
                        {context.name}
                    </CardB.Text>
                    <ButtonB variant="dark" onClick={()=>props.selectContext(context)}><i className="fa fa-play" aria-hidden="true"></i></ButtonB>
                    {context.sound !== null & context.sound !== undefined & context.sound !== ""?                   
                        <ButtonB variant="dark" onClick={()=>playAudio(context.sound)}><i className="fa fa-volume-up" aria-hidden="true"></i></ButtonB>
                    :
                        <ButtonB variant="dark" disabled><i className="fa fa-volume-up" aria-hidden="true"></i></ButtonB>
                    }
                </CardB.Body>
            </CardB>
            
        );
    });

    return(
        <Fragment>
            <CardDeckB>
                {contexts}
            </CardDeckB>        
        </Fragment>   
    );
}

ContextList.propTypes = {
    contexts: PropTypes.array.isRequired,
    selectContext: PropTypes.func.isRequired
}

export default ContextList;
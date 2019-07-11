import React,{ Fragment } from 'react';
import PropTypes from 'prop-types';
import { CardComp } from './components';
import './style/style.css';

const { Meta } = CardComp;

function ContextList(props){

    let contexts = props.contexts.map((context)=>{
        return(
            <CardComp
                className = "card"
                key={context.id}
                onClick={()=>props.selectContext(context)}
                cover={<img className="image" src={context.image} alt={context.name} />}>
                <Meta 
                    title={context.name}/>
            </CardComp>
        );
    });

    return(
        <Fragment>
            {contexts}
        </Fragment>
    );
}

ContextList.propTypes = {
    contexts: PropTypes.array.isRequired,
    selectContext: PropTypes.func.isRequired
}

export default ContextList;
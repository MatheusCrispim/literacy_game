import React,{ Fragment } from 'react';
import PropTypes from 'prop-types';
import { CardB, CardDeckB, ButtonB } from './components';
import './style/style.css';

//const { Meta } = CardComp;

function ContextList(props){

    let contexts = props.contexts.map((context)=>{
        return(
            /*<ColComp   
                span={7}                              
                key={context.id}
                >
                <CardComp 
                    className = "card"
                    onClick={()=>props.selectContext(context)}
                    cover={<img className="image" src={context.image} alt={context.name} />}>
                    <Meta 
                        title={context.name}/>
                </CardComp>
            </ColComp>*/

            <CardB
                key={context.id}
                onClick={()=>props.selectContext(context)}>
                <CardB.Img variant="top" src={context.image} />
                <CardB.Body>
                    <CardB.Text>
                        {context.name}
                    </CardB.Text>
                    <ButtonB variant="dark"><i class="fa fa-arrow-right" aria-hidden="true"></i></ButtonB>
                    <ButtonB variant="dark">Dark</ButtonB>
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
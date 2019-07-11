import React from 'react';
import { connect } from 'react-redux';
import Actions from '../../../api/actions';
import { manipulateElementDisplay } from '../../../utils/ui.utils';

//Other Containers
import GameChallengeContainer from'./game-challenge.container.js';

//Components
import ContextList from '../../../components/context.list';

const { getContext, getContextChallenges  } = Actions;

class GameContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            contexts: [],
            challenges: []
        };

        this.props.dispatch(getContext());
    }

    componentDidUpdate(prevProps, prevState){   
        if(prevProps !== this.props){
            this.setState({
                contexts: this.props.contexts,
                challenges: this.props.challenges 
            });
        }
    }

    searchContext = ()=>{
        const { contexts } = this.props;
        let searchValue = document.querySelector('#contextSearch').value.toLowerCase();
        let results = [];

        if(searchValue !== ""){

            for(var i=0;i<contexts.length;i++){
                let contextName = contexts[i].name.toLowerCase();
                
                if(contextName.indexOf(searchValue) !== -1){
                    results.push(contexts[i]);
                }
            }
    
            this.setState({contexts:results});
        }else{
            this.setState({contexts:this.props.contexts});
        }
    }


    selectContext = (context)=>{
        let { id } = context;
        this.props.dispatch(getContextChallenges(id));
        
        manipulateElementDisplay('#contextSelector', 'none');
        manipulateElementDisplay('#challengeGame', 'block');
    }


    render(){
        return (
            <div>
                <input id="contextSearch" onChange={this.searchContext}/>
                <div id="contextSelector">
                    <ContextList  contexts={this.state.contexts} selectContext={this.selectContext}/>
                </div>
                <div id="challengeGame" style={{'display':'none'}}>
                    <GameChallengeContainer  />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>({
    contexts: state.context.data,
    challenges: state.challenge.data
});

export default connect(mapStateToProps)(GameContainer);



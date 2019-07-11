import React from 'react';
import GameContainer from '../containers/game.container';
import '../style/style.css';

class GameLayout extends React.Component{

    render(){
        return(
            <div>
                <GameContainer />
            </div>
        );
    }
}

export default GameLayout;
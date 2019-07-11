import React from 'react';
import { connect } from 'react-redux';

import Challenge from '../../../components/challenge';

class GameChallegeContainer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            playing: false,
            time: 30,
            end: false,
            lifes: 3,
            play: [],
            played: [],
            challenges: [],
            current:0,
            score: 0
        };
    }

    componentDidUpdate(prevProps, prevState){   
        if(prevProps !== this.props){
            this.setState({
                play:  [...this.props.challenges],
                challenges: [...this.props.challenges],
            });
        }
    }
    
    setTime = (time)=>{
        this.setState({
            time: time
        });
    }

    resetTimer = ()=>{
        this.setTime(30);
    }

    startTime = () => {
        this.time = setInterval(this.timer, 1000); 
    }

    stopTimer = ()=>{
        clearInterval(this.time);
    }

    timer = ()=>{
        let { playing, time } = this.state;

        if(playing){
            if(time === 0){
                this.match(false);
            }else{
                time--;
                this.setTime(time);
            }
        }
    }

    playingStatus = (status)=>{
        this.setState({
            playing: status,
        })
    }

    startGame = ()=>{
        if(this.state.challenges.length>0){
            this.resetTimer();
            this.startTime();
            this.playingStatus(true);
            this.setState({
                end:false
            });
        }
    }

    endGame = ()=>{
        this.setState({
            end:true
        });
    }

    nextChallenge = ()=>{
        this.resetTimer();
        this.startTime();
        this.playingStatus(true);

        let { current, play, played, challenges } = this.state;
        play.splice(current, 1);

        let newChallenge = Math.floor((Math.random() * play.length));
        played.push(newChallenge);

        if(played.length>=3){
            this.endGame();
        }

        this.setState({
            challenges: challenges,
            play: play,
            played: played,
            current: newChallenge
        });
    }

    addScore = (score)=>{
        score += this.state.score;
        this.setState({
            score: score
        });
    }

    damage = (lifes) =>{
        lifes = this.state.lifes - lifes;
        this.setState({
            lifes: lifes
        });
    }


    fault = ()=>{
        this.damage(1);
    }

    hit = ()=>{
        this.addScore(10);
    }
    
    match = (result)=>{
        this.stopTimer();
        if(result){
            if(!this.state.end){
                this.hit();
                this.nextChallenge();
            }
        }else{
            this.fault();
        }
    }

    render(){
        const { challenges, current, play, playing, score, lifes, time, end } = this.state;
        return (
                <div>
                    {   
                        challenges.length> 2?
                            playing ?
                                lifes > 0?    
                                    !end?
                                        <div>
                                            <div>{time} S</div>
                                            <div>{score} Pontos</div>
                                            <div>{lifes} Vidas</div>
                                            <Challenge challenge={ play[current] } match={this.match}/>
                                        </div>
                                    :
                                    "Parabéns, você venceu"
                                :
                                "Não foi dessa vez, tente novamente"
                            :
                            <button onClick={this.startGame}>Jogar</button>
                        :
                        "Não há desafios suficientes para jogar neste contexto"
                    }   
                </div>
        );
    }
}

const mapStateToProps = (state)=>({
    challenges: state.challenge.data
});

export default connect(mapStateToProps)(GameChallegeContainer);
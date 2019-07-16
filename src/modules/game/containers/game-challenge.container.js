import React from 'react';
import { connect } from 'react-redux';
import { ButtonB } from '../../../components/components';
import { manipulateElementDisplay } from '../../../utils/ui.utils';

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

    backToContexts = ()=>{
        this.setState({            
            playing: false,
            time: 30,
            end: false,
            lifes: 3,
            challenges: [],
            current:0,
            score: 0,
            play:  [...this.props.challenges],
            challenges: [...this.props.challenges],
        });
        manipulateElementDisplay('#challengeGame', 'none');
        manipulateElementDisplay('#contextSelector', 'block');
        manipulateElementDisplay('#contextSearch', 'block');
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
                                        <div id="container-root">
                                            <div className="row">
                                                <div className="col">
                                                    <Challenge challenge={ play[current] } match={this.match}/>
                                                </div>
                                                <div className="col">
                                                    <div className="container" id="bloco-pontos">
                                                        <div className="row" id="cronometro">{time} S</div>
                                                        <div className="row" id="pontos">{score} Pontos</div>
                                                        <div className="row" id="vidas">{lifes} Vidas</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    :
                                    <div className="container" id="congratulations">
                                        <p>Parabéns, você venceu.</p>
                                        <p>Sua pontuação foi: {score}</p>
                                        <ButtonB variant="danger" onClick={this.backToContexts}>Voltar</ButtonB>            
                                    </div>
                                :
                                <div className="container" id="not-permission">
                                    <p>Não foi dessa vez, tente novamente.</p><br></br>
                                    <ButtonB variant="danger" onClick={this.backToContexts}>Voltar</ButtonB>            
                                </div>
                            :
                            <div>
                                <div className="row" id="button-start">
                                    <ButtonB variant="success" onClick={this.startGame}>Iniciar</ButtonB>
                                </div>
                                <div className="container" id="instruction">
                                    <div>
                                        <h6>Instruções do jogo: </h6>
                                        <p id="text-instruction">
                                            <br></br>
                                            - Você tem até 30 segundos para resolver cada desafio<br></br>
                                            - Pode errar até 3 vezes<br></br>
                                            - A cada 3 desafios cumpridos você finaliza o jogo
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            //<button id="button-play" onClick={this.startGame}>Jogar</button>
                        :
                        <div className="container" id="not-permission">
                            <p>Não há desafios suficientes para jogar neste contexto.</p><br></br>
                            <p>Cadastre um novo contexto em nossa plataforma: <a href="https://app.sisalfa.dcx.ufpb.br">SISALFA</a></p>
                            <p>ou</p>
                            <p>Escolha um novo contexto, clique em 'voltar'</p>
                            <ButtonB variant="danger" onClick={this.backToContexts}>Voltar</ButtonB>            
                        </div>
                        
                    }   
                </div>
        );
    }
}

const mapStateToProps = (state)=>({
    challenges: state.challenge.data
});

export default connect(mapStateToProps)(GameChallegeContainer);
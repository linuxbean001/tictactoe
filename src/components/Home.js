import React, { Component } from 'react';

import logo from '../assets/logo.png'
import victory from '../assets/victory-icon.svg'

//import icons

class Home extends Component {
  
  constructor (props) {
     super(props)
     this.state = {
      show: false,
      newgame:true,
      creditshow:false,
      game:false,
      fields:[],
     }
  }


//autoload function
componentDidMount(){

}


showModal = () => {
  this.setState({ show: true });
}

showcredit = () => {
  this.setState({ newgame: false,creditshow:true,game:false });
}

gameStart = () => {
  this.setState({ newgame: false,creditshow:false,game:true,show: false });
}

showback = () => {
  this.setState({ newgame: true,creditshow:false,game:false });
}

hideModal = () => {
  this.setState({ show: false });
}


handleSelect=(event)=>{
	let fields = this.state.fields;
	const { name,value} = event.target;
	fields[name] = value; 
	//set state	
	this.setState({fields});
}


//renedr
render() {
 
  const {newgame,creditshow,game,fields } = this.state;



  const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  
    return (
      <div className={showHideClassName}>
        <section className='modal-main'>
          {children}
          {/* <button
            onClick={handleClose}
            className="btnclose"
          >
            x
          </button> */}
        </section>
      </div>
    );
  };
    return (<div>

<div className={(game)?'topplayerhead display-block':'topplayerhead display-none'}  >
<div > <span className="playspan">Player 1</span>  <input type="text" className="textread" value={fields["fplayer"] ?fields["fplayer"] :''} readOnly /> </div>
    <br/>
    <div > <span className="playspan">Player 2</span>  <input type="text" className="textread"  value={fields["splayer"] ?fields["splayer"] :''} readOnly  /></div>
</div>
  <div className={(newgame)?'homecontent display-block':'homecontent display-none'}>

     <img src={logo} className="imglogo"/>
      <div className="">
      <button className="btnnew" onClick={this.showModal} >New Game</button>
      <button className="btncredit" onClick={this.showcredit}>Credit </button>
      <button className="btnexit">Exit </button>
      </div>

  </div>

    <Modal show={this.state.show} handleClose={this.hideModal} >
    <div className="">
      <h3 className="h3pops">Start a New Game</h3>
      
    <div > <span className="playspan">Player 1</span>  <input type="text" name="fplayer" onChange={this.handleSelect} value={fields["fplayer"] ?fields["fplayer"] :''}  /></div>
    <br/>
    <div > <span className="playspan">Player 2</span>  <input type="text" name="splayer" onChange={this.handleSelect} value={fields["splayer"] ?fields["splayer"] :''}   /></div>
  <button className="btnstart" onClick={this.gameStart}>Start</button>
   
    
      </div>
    </Modal>
{/* credit page */}


<div className={(creditshow)?'homecontent display-block':'homecontent display-none'}>

     <img src={logo} className="imglogo"/>
     <span className="credititle">Credit</span>
      <div className="creditcontent" >
        <div className="testcen">Harold Leonard</div>   
        <div className="testcen">Jordan Santos</div> 
        <div className="testcen">Fraces Barnett</div> 
        <div className="testcen">Ciera Riley</div>  
        <div className="testcen">Dakota Kelley</div>  
        <div className="testcen">Esther Lloyd</div>  
      <div className="testcen">Mitchell Fitzgerald</div>     
      </div>
    <button className="btnback" onClick={this.showback}>Back</button>

  </div>


<div className={(game)?'homecontent display-block':'homecontent display-none'}>

<img src={logo} className="imglogo"/>
<span className="credititle">game</span>
 <div className="creditcontent" >
 <Game />
 </div>
<div className="testbalck"></div>
</div>

     
  </div>)
  }
}


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      show: false,
    });

  }

  showModal = () => {
    this.setState({ show: true });
  }

  gameStart = () => {
    window.location.reload();
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);


    const Modal = ({ handleClose, show, children }) => {
      const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    
      return (
        <div className={showHideClassName}>
          <section className='modal-main'>
            {children}
            {/* <button
              onClick={handleClose}
              className="btnclose"
            >
              x
            </button> */}
          </section>
        </div>
      );
    };


    const moves = history.map((step, move) => {
const desc = move ?'' : 'Restart';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    let tstate;
    let tstatew;
    if (winner) {
      status =  winner;
      tstate = true;
    } else {
      // status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    if (winner!='O' || winner!='X') {
      tstatew = true;
    }

   
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
         
        </div>

      <Modal show={tstate} handleClose={this.hideModal} >
      <div className="">
      <h3 className="h3pops">Victory to Player {(status==='X')?'1!':''} {(status==='O')?'2!':''}</h3>
      <img src={victory} className="imgvictory"/>
      <div >    
      <button className="btnstart" onClick={() => this.jumpTo(0)}>Restart</button>
      <button className="btnstart" onClick={this.gameStart}>Quit</button>
      </div>

      </div>
      </Modal>   


      </div>
    );
  }
}


export default Home;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
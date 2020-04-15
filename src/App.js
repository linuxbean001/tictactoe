import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Home from './components/Home'

const mapStateToProps = function(state,props) {
  return {}
}

const mapDispatchToProps = dispatch => ({
  
});

class App extends Component {
  render() {
    return (
      <div className="App">

        <Router>
          <Switch> 
             <Route exact path="/" component={Home} />
         </Switch>
     </Router> 
      
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

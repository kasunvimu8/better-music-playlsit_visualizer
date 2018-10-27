import React, { Component } from 'react';
import './App.css';

let defaultStyle ={
  color : '#00f'
}

class Aggregate extends Component{
render(){
  return(
      <div style={{width : "40%" , display : 'inline-block'}}>
        <h2 style={defaultStyle}>Number of songs and play list</h2>

      </div>

  );
}
}

class Filter extends Component{
render(){
  return(
    <div style={defaultStyle}>
      <img/>
      <input type ="text"/>
    </div>
  );

}
}

class Playlist extends Component{
  render(){
    return(
      <div style ={{...defaultStyle,width:"25%",display:'inline-block'}}>
        <img/>
        <h3>Playlist Name</h3>
        <ul>
          <li>song 1</li>
          <li>song 2</li>
          <li>song 3</li>
        </ul>
      </div>
  
    );
   }
  }


class App extends Component {
  render() {
    
    return (
      <div className="App">
      <h1 style={{...defaultStyle,'font-size' : '54px'}}>Title</h1>
      <Aggregate/>
      <Aggregate/>
      <Filter/>
      <Playlist/>
      <Playlist/>
      <Playlist/>
      
      </div>
    );
  }
}

export default App;

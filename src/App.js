import React, { Component } from 'react';
import './App.css';

let defaultStyle ={
  color : '#00f'
}
let fakeServerData = {
  user : {
    name: 'kasun',
    playlists :[
        {
          name : 'my fav',
          songs: [
            {name :'uu',duration :2000},
            {name:'mm',duration :3000},
            {name:'kk',duration :3211}
          
          ]

        },
        {
          name :"my best",
          songs: [
            {name :'uu',duration :2000},
            {name:'mm',duration :3000},
            {name:'kk',duration :3211}
          
          ]
        },
        {
          name: "my hits",
          songs: [
            {name :'uu',duration :2000},
            {name:'mm',duration :3000},
            {name:'kk',duration :3211}
          
          ]
        },
        {
          name :"my last",
          songs: [
            {name :'uu',duration :2000},
            {name:'mm',duration :3000},
            {name:'kk',duration :3211}
          
          ]
        }

    ]

  }

}

class PlaylistsCount extends Component{
render(){
  return(
      <div style={{width : "40%" , display : 'inline-block'}}>
        <h2 style={defaultStyle}> {this.props.playlists && this.props.playlists.length -1} Playlist's</h2>

      </div>

  );
}
}
class HoursCount extends Component{
    render(){
      let allSongs = this.props.playlists.reduce((songs ,eachPlayList)=>{
        return songs.concat(eachPlayList.songs)
      },[])

      let totalDuration = allSongs.reduce((sum ,eachSong)=>{
        return sum + eachSong.duration
      },0)
      
      return(
          <div style={{width : "40%" , display : 'inline-block'}}>
            <h2 style={defaultStyle}>{Math.round(totalDuration/60)} Hours</h2>
    
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
        <h2 >{this.props.playlist.name}</h2>
        <ul style= {{...defaultStyle , textAlign : 'left'}}>

          { this.props.playlist.songs.map(song => //map the 
          <li> {song.name}</li>
          )}
          
        </ul>
      </div>
  
    );
   }
  }


class App extends Component {
  constructor(){
    super();
    this.state = {serverData:{}}
  }
  componentDidMount(){  //hold the state untill data fletch
    setTimeout( ()=>
    {this.setState({serverData : fakeServerData} )} ,1000 );
}
  render() {
    return (
      <div className="App">

        { this.state.serverData.user ?
          <div>
              <h1 style={{...defaultStyle,'font-size' : '54px'}}>
              { this.state.serverData.user.name }'s Playlist
              </h1>
              <PlaylistsCount playlists ={this.state.serverData.user.playlists}/>
              <HoursCount playlists ={this.state.serverData.user.playlists}/>
              <Filter/>

             { this.state.serverData.user.playlists.map(playlist => //mapping the values to Playlist
                <Playlist playlist ={ playlist}/>
                )}
              
          </div> : <h1 style={defaultStyle}>"Loading ..."</h1>  //if else statement 
        }
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

let defaultStyle ={
  color : '#00f'
}
let fakeServerData = {
  user : {
    name: 'kasun',
    playlists :[
        {
          name : 'my-fav',
          songs: [
            {name :'uu',duration :2000},
            {name:'mm',duration :3000},
            {name:'kk',duration :3211}
          
          ]

        },
        {
          name :"my-best",
          songs: [
            {name :'uu',duration :2000},
            {name:'mm',duration :3000},
            {name:'kk',duration :3211}
          
          ]
        },
        {
          name: "my-hits",
          songs: [
            {name :'uu',duration :2000},
            {name:'mm',duration :3000},
            {name:'kk',duration :3211}
          
          ]
        },
        {
          name :"my-last",
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
        <h2 style={defaultStyle}> {this.props.playlists && this.props.playlists.length } Playlist's</h2>

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
      <input type ="text" onKeyUp ={event =>
      this.props.changeText(event.target.value)
      }
      />
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
    this.state = {serverData:{},filterString :''}
  }
/*  componentDidMount(){  //hold the state untill data fletch
    setTimeout( ()=>
    {this.setState({serverData : fakeServerData})} ,1000 );
    
}*/
  componentDidMount(){
    let parsed = queryString.parse(window.location.search);
    console.log(parsed);
    let accessToken = parsed.access_token;
    fetch('https://api.spotify.com/v1/me',{
      headers: {
        'Authorization': 'Bearer ' + accessToken}
      }).then(response=>response.json())
      .then(data=>this.setState({serverData : {user: {name : data.display_name}}}))  ; 
    
  }


  render() {

    let playlistToRender =this.state.serverData.user && this.state.serverData.user.playlists
    ? this.state.serverData.user.playlists.filter( playlist=>  // filtering the words and display
      playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase()))
    : []  //if user exists assign otherwise null
  
    return (
      <div className="App">

        { this.state.serverData.user ?
          <div>
              <h1 style={{...defaultStyle,'font-size' : '54px'}}>
              { this.state.serverData.user.name }'s Playlist
              </h1>
              <PlaylistsCount playlists ={playlistToRender}/>
              <HoursCount playlists ={playlistToRender}/>
                      
              <Filter changeText = { text => this.setState({filterString :text} )}/> 
              
             { playlistToRender .map(playlist => //mapping the values to Playlist
                <Playlist playlist ={ playlist}/>
                )}
              
          </div> :<button  onClick={()=>window.location='http://localhost:8888/login' }
          style={{padding:'20px',fontSize:'50px',marginTop:'20px'}}>Sign in with spotify</button> //if else statement 
        }
      </div>
    );
  }
}

export default App;

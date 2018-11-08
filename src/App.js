import React, { Component } from 'react';
import 'reset-css/reset.css';
import './App.css';
import queryString from 'query-string';

let defaultStyle ={
  color : '#fff',
  'font-family' :'papyrus'
};  

function isEven(i){
  return i%2;
}

class PlaylistsCount extends Component{
render(){
  let sty ={width : "40%" , display : 'inline-block','margin-bottom' :'10px','font-size' :'14px', 'line-height':'30px' };
  return(
      <div style={sty}>
        <h2 style={defaultStyle}> {this.props.playlists && this.props.playlists.length } Playlist's</h2>

      </div>

  );
}
}
class HoursCount extends Component{
    render(){
      let playliststyle={width : "40%" , display : 'inline-block','margine-bottom':'20px','font-size':'20px','line-height':'30px'}

      let allSongs = this.props.playlists.reduce((songs ,eachPlayList)=>{
        return songs.concat(eachPlayList.songs)
      },[])

      let totalDuration = allSongs.reduce((sum ,eachSong)=>{
        return sum + eachSong.duration
      },0)
      
      return(
          <div style={playliststyle}>
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
      style={{...defaultStyle,'color':'black' ,'font-size':'20px',padding:'10px'}}
      />
    </div>
  );

}
}

class Playlist extends Component{
  render(){
    let playlist =this.props.playlist;
    return(
      <div style ={{...defaultStyle,width:"25%",display:'inline-block',width:'20%',padding:'10px','margin-top':'4px','background-color':
      isEven(this.props.index) ? '#9FBAC2' :'#808080	'
      }}>
        
        <img src ={ playlist.imageUrl} style={{width:'80px'}}/>

        <h3 >{playlist.name}</h3>
        <ul style= {{...defaultStyle , textAlign : 'left', 'margin-top':'10px','font-weight':'bold'}}>

          { playlist.songs.map(song => //map the 
          <li style={{'padding-top':'2px'}}> {song.name}</li>
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
    let accessToken = parsed.access_token;
    if(!accessToken){
      return;
    }

     fetch('https://api.spotify.com/v1/me',{
       headers: {
         'Authorization': 'Bearer ' + accessToken}
       }).then(response=>response.json())
       .then(data=>this.setState({
         user: {
           name : data.display_name
          }
        }))  
    
      fetch('https://api.spotify.com/v1/me/playlists',{
      headers: {
        'Authorization': 'Bearer ' + accessToken}
      }).then(response=>response.json())
      .then(playlistData=>{
        let playlists = playlistData.items;
        let trackDataPromises =playlists.map(playlist =>{
          let responsePromise =fetch(playlist.tracks.href,{
            headers: {'Authorization': 'Bearer ' + accessToken}
          })

        let trackDataPromise =responsePromise
        .then(response =>response.json())
        return trackDataPromise
        })

        let allTracksDataPromises=
        Promise.all(trackDataPromises)

        let playlistsPromise = allTracksDataPromises.then(trackDatas=>{
          trackDatas.forEach((trackData,i) => {
            playlists[i].trackDatas =trackData.items
            .map(item=>item.track)
            .map(trackData=>({
              name :trackData.name,
              duration :trackData.duration_ms /1000
              }))
          })
          return playlists
        })
        return playlistsPromise
      })
    

      .then(playlists=>this.setState({
        playlists: playlists.map(item =>{
            console.log(item.trackDatas)
             return {
            name :item.name,
            imageUrl : item.images[0].url,
            songs : item.trackDatas.slice(0,3)
             }  
          })

       }))
      
  }


  render() {

    let playlistToRender =this.state.user && this.state.playlists
    ? this.state.playlists.filter( playlist=>{  // filtering the words and display
     
        let matchesPlaylist=playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase())

        let matchesSong = playlist.songs.find(song => song.name.toLowerCase()
        .includes(this.state.filterString.toLowerCase()))
        return matchesPlaylist || matchesSong
          
      }) :[]
      //if user exists assign otherwise null
  
    return (
      <div className="App">

        { this.state.user ?
          <div>
              <h1 style={{...defaultStyle,'font-size' : '54px'}}>
              { this.state.user.name }'s Playlist
              </h1>
              <PlaylistsCount playlists ={playlistToRender}/>
              < HoursCount playlists ={playlistToRender}/>
                      
              <Filter changeText = { text => this.setState({filterString :text} )}/> 
              
             { playlistToRender .map((playlist,i)=> //mapping the values to Playlist
                <Playlist playlist ={playlist}   index={i}/>
                )}
              
          </div> :<button  onClick={()=> {
              window.location=window.location.href.includes('localhost')
              ? 'http://localhost:8888/login' 
              : 'https://backend-better-music-playlist.herokuapp.com/login' }
            }
              style={{padding:'20px',fontSize:'50px',marginTop:'20px'}}>Sign in with spotify</button> //if else statement 
            }
      </div>
    );
  }
}

export default App;

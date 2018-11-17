how to run this in local machine
---------------------------------
i).first you have to have an Spotify account.spotify is a music application and they provide Api's for open source developments.

ii).In order to create account in spotify you should be brwosering in US.Make sure that you use a VPN service(recommended : TunnelBear) for sign up in spotify.
 (https://www.spotify.com/us/signup/)
 after sign up in spotify create some playlists.Windows have spotify by defalt.you just have to login with credentials and then create  the playlists.that will be helpfull in testing.

iii).After that you can start the cloning the backend and the frontend parts to your lacl machine.This is the frontend and the backend will be here. (https://github.com/kasunvimu8/backend_better-music-visualizer_playlist)

  iv).After cloning the backend file go to that directory and install the npm dependacies by executing the command "npm install" .
  then the backend severe will be listing to the http://localhost:8888
  
  v).After that go to the frontend directory and install npm dependacies in there in the same way.In here you have to give the CLIENT_SECRET and the CLIENT_ID values in the command line .Otherwise it can steal by anybody who have the secrets.therefore the secrets are tied up to the command line.use mine for testing.I will delete them later.CLIENT_SECRET and CLIENT_ID are there for security purposes in spotify.Only valid clients have access to the their Api's.
  
  to do that execute these in frontend command line
  
    *  export SPOTIFY_CLIENT_SECRET=08c9c571b1bd4a9a9db84807bae0e865 
    
    *  export SPOTIFY_CLIENT_ID=9a779d8bf3b14e31b2416a5fb76434df "
     
 vi). Then you will be able to run the frontend sever locally.it will be automatically run.
 
 
--------------------------------------------------------------------------------------
go to your browser and type  
                                  http://localhost:8888/login
                                  then you will be able to see the playlists that you have in your spotify account with the songs.
                                  
  vii).Add the relevent changes that you want to do and do the "pull request".i separate the space for visualisation part in public/index.html in frontend.
  
--------------------------------------------------------------------------------------
got to this site to use this application online
https://bestmusicvisualizer.herokuapp.com
    
   viii).just use your credentials to login to the acoount in there.then your playlist will be shown.  
     

  
  
  
  


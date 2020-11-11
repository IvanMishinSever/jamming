
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{name:'name1', artist:'artist1', album: 'album1', id: 1}, 
      {name:'name2', artist:'artist2', album: 'album2', id: 2}, 
      {name:'name3', artist:'artist3', album: 'album3', id: 3}],

      playlistTracks: [{name:'name12', artist:'artist12', album: 'album12', id: 6}, 
      {name:'name22', artist:'artist22', album: 'album22', id: 7}, 
      {name:'name32', artist:'artist32', album: 'album32', id: 8},
      {name:'name1', artist:'artist1', album: 'album1', id: 1}],
      playlistName: 'THE main'

    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      tracks.push(track);
      this.setState({playlistTracks: tracks})
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter( currentTrack => currentTrack.id !== track.id)
      this.setState({playlistTracks: tracks})
    
  }
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist(){
   // alert('ok');
   const trackUris = this.state.playlistTracks.map(track => track.uri);
   Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
     this.setState({
       playlistName: 'New Playlist',
       playlistTracks: []
     })
   });
  }
  search(term) {
  //  alert('ok');
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      })
    })
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} 
             />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} 
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }

}



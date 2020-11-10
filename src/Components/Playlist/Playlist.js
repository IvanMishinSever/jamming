import React from 'react';
import './Playlist.css';
import  TrackList  from '../TrackList/TrackList';

export default class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(event) {
        this.props.onNameChange(event);
    }
    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'}/>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} 
                onChange={this.handleNameChange} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}
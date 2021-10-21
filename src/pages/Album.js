import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      album: '',
    };

    this.getAlbumMusics = this.getAlbumMusics.bind(this);
    this.renderAlbumMusics = this.renderAlbumMusics.bind(this);
  }

  componentDidMount() {
    this.getAlbumMusics();
  }

  getAlbumMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    this.setState({
      album: music,
    });
  }

  renderAlbumMusics = () => {
    const { album } = this.state;
    return (
      <div className="musics">
        <div>
          <h2 data-testid="artist-name">{album[0].artistName}</h2>
          <h3 data-testid="album-name">{album[0].collectionName}</h3>
          <div>
            {album.slice(1)
              .map((element, index) => (
                <MusicCard
                  key={ index }
                  trackName={ element.trackName }
                  previewUrl={ element.previewUrl }
                />
              ))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { album.length > 0 && this.renderAlbumMusics() }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

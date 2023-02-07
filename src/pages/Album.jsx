import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
// import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    artistMusic: {},
    fullAlbum: [],

  };

  componentDidMount() {
    this.fetch();
  }

  // requisito 8

  // requisito 7
  fetch = async () => {
    const { match: { params: { id } } } = this.props;
    const albumFetch = await getMusics(id);
    const musics = albumFetch.filter((obj) => obj.kind === 'song');
    this.setState({
      artistMusic: albumFetch[0],
      fullAlbum: musics,
    });
  };

  render() {
    const { artistMusic, fullAlbum } = this.state;

    return (
      <>
        <div data-testid="page-album">
          <Header />

          <p data-testid="artist-name">{ artistMusic.artistName }</p>
          <p data-testid="album-name">{ artistMusic.collectionName }</p>
        </div>

        <div>
          { fullAlbum.map((music, index) => (
            <section key={ index }>
              <MusicCard
                trackId={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                // handleChange={ this.}
              />

            </section>

          )) }
        </div>
      </>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;

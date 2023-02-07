import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artistMusic: {},
    fullAlbum: [],
  };

  componentDidMount() {
    this.fetch();
  }

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
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    artistMusic: {},
    fullAlbum: [],
    loading: false,
    favorites: [],

  };

  componentDidMount() {
    this.fetch();
  }

  checked = (music) => {
    const { favorites } = this.state;
    const some = favorites.some((musicChoose) => music.trackId === musicChoose.trackId);
    return some;
  };

  getFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
    });
  };

  // requisito 8 função (checked, getFavorites >> fetchFavoriteSong). Lógica construida na monitoria com summer Pablo
  fetchFavoriteSong = (music) => {
    this.setState({
      loading: true,
    }, async () => {
      await addSong(music);
      await this.getFavorites();
      this.setState({
        loading: false,
      });
    });
  };

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
    const { artistMusic, fullAlbum, loading } = this.state;

    return (
      <>
        <div data-testid="page-album">
          <Header />

          <p data-testid="artist-name">{ artistMusic.artistName }</p>
          <p data-testid="album-name">{ artistMusic.collectionName }</p>
        </div>

        <div>
          {loading ? <Loading /> : (

            <div>
              { fullAlbum.map((music, index) => (
                <section key={ index }>
                  <MusicCard
                    trackId={ music.trackId }
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    music={ music }
                    fetchFavoriteSong={ this.fetchFavoriteSong }
                    checked={ this.checked(music) }
                  />

                </section>

              )) }
            </div>

          )}

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

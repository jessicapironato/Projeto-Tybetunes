import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumFromApi from '../components/AlbumFromApi';

class Search extends Component {
  state = {
    artistName: '',
    nameChecked: true,
    loading: false,
    artistSearched: '',
    listSearched: [],

  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.buttonEnable();
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    const album = await searchAlbumsAPI(artistName);
    this.setState({
      artistName: '',
      loading: false,
      artistSearched: artistName,
      listSearched: album,
    });
  };

  buttonEnable = () => {
    const { artistName } = this.state;
    const nameLength = 1;
    if (artistName.length >= nameLength) {
      this.setState({ nameChecked: false });
    }
  };

  render() {
    const { artistName, nameChecked, artistSearched, listSearched, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <>
        <Header />
        <div data-testid="page-search" />

        <form>
          <fieldset>
            <legend>Nome do artista</legend>
            <label htmlFor="artistName">
              Nome
              <input
                data-testid="search-artist-input"
                id="artistName"
                name="artistName"
                type="text"
                onChange={ this.handleChange }
                value={ artistName }
              />

              <button
                data-testid="search-artist-button"
                id="search-artist-button"
                name="search-artist-button"
                type="button"
                disabled={ nameChecked }
                onClick={ this.handleClick }
              >
                Pesquisar

              </button>

            </label>

          </fieldset>
        </form>
        <div>
          {listSearched.length !== 0
            ? (<p>{`Resultado de álbuns de: ${artistSearched}`}</p>)
            : (<p>Nenhum álbum foi encontrado </p>)}
        </div>
        {/* parte da 6 feita com auxílio da colega Carol Fernandes - tive dificuldad em implementar a lógica do Link após a Hof map passar pelos albuns. */}

        <section>
          { listSearched.map((album) => (
            <div key={ album.artistId }>

              <AlbumFromApi
                artistId={ album.artistId }
                artistName={ album.artistName }
                collectionName={ album.collectionName }
              />
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Album
              </Link>
            </div>

          ))}
          ;
        </section>

      </>

    );
  }
}

export default Search;

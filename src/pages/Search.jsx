import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artistName: '',
    nameChecked: true,

  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.buttonEnable();
  };

  buttonEnable = () => {
    const { artistName } = this.state;
    const nameLength = 1;
    if (artistName.length >= nameLength) {
      this.setState({ nameChecked: false });
    }
  };

  render() {
    const { artistName, nameChecked } = this.state;
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
                onClick={ this.handelClick }
              >
                Pesquisar

              </button>

            </label>

          </fieldset>
        </form>
      </>

    );
  }
}

export default Search;

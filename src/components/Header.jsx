import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    user: {},
    loading: true,
  };

  // consulta>> https://www.alura.com.br/artigos/async-await-no-javascript-o-que-e-e-quando-usar
  // o código é usado para atualizar o estado do componente com os dados de um usuário vindos da função getUser e não interrompe o fluxo da execução.

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    const result = await getUser();
    this.setState({
      loading: false,
      user: result.name,
    });
  };

  render() {
    const { user, loading } = this.state;
    if (loading === true) return <Loading />;

    return (
      <>
        <div data-testid="header-component" />

        <p data-testid="header-user-name">
          {user}

        </p>

      </>
    );
  }
}

export default Header;

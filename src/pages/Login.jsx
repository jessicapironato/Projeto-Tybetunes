import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    name: '',
    nameChecked: true,
    loading: false,

  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.buttonEnable();
  };

  buttonEnable = () => {
    const { name } = this.state;
    const nameThree = 2;
    if (name.length >= nameThree) {
      this.setState({ nameChecked: false });
    }
  };

  // consulta em https://codesource.io/how-to-use-this-props-history-push-on-your-react-project/ (tive que desestruturar this.props.history.push)
  handleClick = async () => {
    const { name } = this.state;
    const { history: { push } } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false }, () => push('/search'));
  };

  render() {
    const { name, nameChecked, loading } = this.state;
    if (loading) return <Loading />;

    return (

      <div>
        <div data-testid="page-login" />

        <form>
          <fieldset>
            <legend>Digite seu nome</legend>

            <label htmlFor="name">
              Nome
              <input
                data-testid="login-name-input"
                id="name"
                name="name"
                type="text"
                onChange={ this.handleChange }
                value={ name }
              />

              <button
                data-testid="login-submit-button"
                id="login-submit-button"
                name="login-submit-button"
                type="submit"
                disabled={ nameChecked }
                onClick={ this.handleClick }
              >
                Entrar

              </button>

            </label>

          </fieldset>
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        <p>
          {trackName}
        </p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>

        <label htmlFor="checkbox-music">
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="checkbox-music"

          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.elementType.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;

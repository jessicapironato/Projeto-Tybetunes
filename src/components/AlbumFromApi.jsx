import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumFromApi extends Component {
  render() {
    const {
      artistId,
      artistName,
      collectionName,
      collectionId,
    } = this.props;

    return (

      <div>
        <p>{artistId}</p>
        <p>{artistName}</p>
        <p>{collectionId}</p>
        <p>{collectionName}</p>
      </div>
    );
  }
}

AlbumFromApi.propTypes = {
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
};

export default AlbumFromApi;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';

import {
  ImageGalleryListItem,
  ImageGalleryImage,
  ImageLarge,
} from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = { modalOpen: false };

  openModal = () => this.setState({ modalOpen: true });

  closeModal = () => this.setState({ modalOpen: false });

  render() {
    const { id, tags, webformatURL, largeImageURL } = this.props;
    return (
      <ImageGalleryListItem id={id}>
        <ImageGalleryImage
          onClick={this.openModal}
          src={webformatURL}
          alt={tags}
        />
        {this.state.modalOpen && (
          <Modal onClose={this.closeModal}>
            <ImageLarge src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </ImageGalleryListItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

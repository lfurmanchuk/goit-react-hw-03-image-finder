import React from 'react';
import PropTypes from 'prop-types';
import { Item } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGalllery.module.css';

// Побудова галереї з елементів отриманих від ImageGalleryItem
export const ImageGallery = ({ images, ...othersProps }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <Item
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            {...othersProps}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

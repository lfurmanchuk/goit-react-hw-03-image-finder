import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

// Побудова li і img, експорт картки в галерею
export const Item = ({ webformatURL, largeImageURL, tags, onSelected }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={() => onSelected({ largeImageURL, tags })}
      />
    </li>
  );
};

Item.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onSelected: PropTypes.func,
};

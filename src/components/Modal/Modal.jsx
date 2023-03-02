import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    onCloseByEscape: PropTypes.func.isRequired,
    largeImg: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  // Монтування компонену по кліку
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  // Розмонування компоненту по кліку
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  // Клік на Escape і закриття модалки
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseByEscape();
    }
  };

  // Клік по backdrop і закриття модалки
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseByEscape();
    }
  };

  // Виведення модалки з Overlay
  render() {
    const { largeImg, tags } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={largeImg} alt={tags} />
        </div>
      </div>
    );
  }
}

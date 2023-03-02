import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchbarForm } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { getImages } from './Servise/Api';
import css from './App.module.css';

export class App extends Component {
  state = {
    imageName: '',
    images: [],
    loading: false,
    visibleBtn: false,
    largeImg: '',
    tags: '',
    page: 1,
    error: null,
  };

  // Виклик методу оновлення компоненту
  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;

    if (prevState.imageName !== imageName || prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const data = await getImages(imageName, page);
        const { hits, totalHits } = data;

        if (!hits.length) {
          toast.error(`We can't found ${imageName}`);
        }

        if (totalHits !== 0) {
          this.setState({ visibleBtn: true });
        }

        // Запис в state результатів пошуку
        this.setState(({ images }) => ({
          images: [...images, ...hits],
        }));
      } catch (error) {
        const message = 'Oops, something went wrong ...';
        this.setState({ error: message });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onSubmitForm = value => {
    if (value !== this.state.imageName) {
      this.setState({
        imageName: value,
        images: [],
        visibleBtn: false,
        page: 1,
        totalPages: 0,
      });
    }
  };

  // Завантаження у модальне вікно великого зображення
  onSelectedImage = ({ largeImageURL, tags }) => {
    this.setState({ largeImg: largeImageURL, tags });
  };

  // Завантаження додаткової сторінки до галареї
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  // Закриття модалки по Escape
  onCloseByEscape = () => {
    this.setState({ largeImg: '' });
  };

  // Закриття модалки по кліку
  onCloseByClick = e => {
    const clickBackdrop = e.target.id;
    if (clickBackdrop === 'backdrop') {
      this.setState({ largeImg: '' });
    }
  };

  render() {
    const { images, loading, visibleBtn, page, totalPages, largeImg, tags } =
      this.state;

    return (
      <div className={css.App}>
        <SearchbarForm onSubmit={this.onSubmitForm} />
        {loading && <Loader />}
        <ImageGallery images={images} onSelected={this.onSelectedImage} />
        {visibleBtn && (
          <Button
            onLoadMore={this.onLoadMore}
            page={page}
            totalPages={totalPages}
          />
        )}
        {largeImg && (
          <Modal
            largeImg={largeImg}
            tags={tags}
            onCloseByClick={this.onCloseByClick}
            onCloseByEscape={this.onCloseByEscape}
          />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

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
  static defaultProps = { PER_PAGE: 12 };

  state = {
    imageName: '',
    images: [],
    loading: false,
    visibleBtn: false,
    largeImg: '',
    tags: '',
    page: 1,
    totalPages: 0,
  };

  // Виклик методу оновлення компоненту
  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    const { PER_PAGE } = this.props;

    if (prevState.imageName !== imageName || prevState.page !== page) {
      this.setState({ loading: true });

      const data = await getImages(imageName, page, PER_PAGE).finally(() =>
        this.setState({ loading: false })
      );

      const { hits, totalHits } = data;

      this.setState(({ images }) => ({
        images: [...images, ...hits],
      }));

      if (page === 1) {
        toast.success(`Hooray! We found ${totalHits} images`);
        window.scroll(0, 0);
      }

      if (totalHits !== 0) {
        this.setState({ visibleBtn: true });
      }

      const countPages = Math.ceil(totalHits / PER_PAGE);
      this.setState({ totalPages: countPages });

      if (page >= countPages) {
        this.setState({ visibleBtn: false });
        toast.info(
          `We're sorry, but you've reached the end of search "${imageName}". Please start a new search`
        );
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
    } else {
      toast.warn('The new search must be different from the current search');
    }
  };

  // Завантаження у модальне вікно великого зображення
  onSelectedImage = ({ largeImageURL, tags }) => {
    this.setState({ largeImg: largeImageURL, tags });
  };

  // Зантаження додаткової сторінки до галареї
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onCloseByEscape = () => {
    this.setState({ largeImg: '' });
  };

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

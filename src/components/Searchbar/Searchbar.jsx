import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export class SearchbarForm extends Component {
  state = { imageName: '' };

  handleChangeInput = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmitForm = e => {
    const { imageName } = this.state;

    e.preventDefault();
    if (imageName.trim() === '' || imageName.length < 3) {
      toast.warning('Search field is empty!');
      this.resetForm();
      return;
    }
    this.props.onSubmit(imageName);
    this.resetForm();
  };

  resetForm = () => this.setState({ imageName: '' });

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmitForm} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos..."
            value={this.state.imageName}
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}

SearchbarForm.propTypes = {
  onSubmit: PropTypes.func,
};

// export class SearchbarForm extends Component {
//   // Запис state початкового стану
//   state = {
//     searchRequest: '',
//     images: [],
//     galleryPage: 1,
//     error: null,
//   };

//   handleRequestChange = event => {
//     this.setState({ searchRequest: event.currentTarget.value.toLowerCase() });
//   };

//   handelSubmite = event => {
//     event.preventDefault();

//     if (this.state.searchRequest.trim() === '') {
//       // не працює
//       //   toast.error('Search field is empty!');
//       alert('Search field is empty!');
//       return;
//     }

//     this.props.onSubmit(this.state.searchRequest);
//     this.setState({ searchRequest: '' });
//   };

//   render() {
//     return (
//       <header className={style.Searchbar}>
//         <form className={style.SearchForm} onSubmit={this.handelSubmite}>
//           <button type="submit" className={style.SearchForm_button}>
//             <span className={style.SearchForm_button_label}>Search</span>
//           </button>

//           <input
//             className={style.SearchForm_input}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.searchRequest}
//             onChange={this.handleRequestChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

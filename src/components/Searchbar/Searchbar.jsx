import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export class SearchbarForm extends Component {
  // Стейт форми з початковим пустим значенням
  state = { imageName: '' };

  // Метод, що спостерігає за інпутами і записує в state їх значення
  handleChangeInput = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  // Метод на відправці форми, що формує зі state контакт і передає до зовнішного методу
  handleSubmitForm = e => {
    const { imageName } = this.state;

    e.preventDefault();
    if (imageName.trim() === '' || imageName.length < 2) {
      toast.warning('Search field is empty!');
      this.resetForm();
      return;
    }
    this.props.onSubmit(imageName);
    this.resetForm();
  };

  // Очищення полів форми після відправки
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

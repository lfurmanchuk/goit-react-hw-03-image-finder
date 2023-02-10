import { Component } from 'react';
import style from './Searchbar.module.css';

export class SearchbarForm extends Component {
  state = {
    searchRequest: '',
  };

  handleRequestChange = event => {
    this.setState({ searchRequest: event.currentTarget.value.toLowerCase() });
  };

  handelSubmite = event => {
    event.preventDefault();

    if (this.state.searchRequest.trim() === '') {
      alert('введіть текст');
      return;
    }

    this.props.onSubmit(this.state.searchRequest);
    this.setState({ searchRequest: '' });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handelSubmite}>
          <button type="submit" className={style.SearchForm_button}>
            <span className={style.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={style.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchRequest}
            onChange={this.handleRequestChange}
          />
        </form>
      </header>
    );
  }
}

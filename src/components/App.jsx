import { Component } from 'react';
import { SearchbarForm } from './Searchbar/Searchbar';

export class App extends Component {
  // state = {
  //   image: null,
  //   loading: false,
  // };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   fetch(
  //     'https://pixabay.com/api/?q=cat&page=1&key=32171681-841588777ba13ffebe0102a86&image_type=photo&orientation=horizontal&per_page=12'
  //   )
  //     .then(res => res.json())
  //     .then(image => this.setState({ image }))
  //     .finally(() => this.setState({ loading: false }));
  // }

  state = {
    searchRequest: '',
  };

  handleSearchFormSubmit = searchRequest => {
    this.setState({ searchRequest });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <SearchbarForm onSubmit={this.handleSearchFormSubmit} />
        {/* {this.state.loading && <h2>Loading...</h2>}
        {this.state.image && (
          <div>
            <img src="{this.state.image.webformatURL}" alt="img" />
          </div>
        )} */}
      </div>
    );
  }
}

import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FindImages } from './services/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Finish } from './Finish/Finish';

import { AppContainer } from './App.styled';

const KEY = '30885515-e5cd8644896c6a7d3960ad51e';

export class App extends Component {
  state = {
    error: false,
    page: 1,
    totalResults: null,
    searchQuery: '',
    images: [],
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      (this.state.searchQuery !== prevState.searchQuery &&
        this.state.searchQuery !== '')
    ) {
      try {
        this.setState({ isLoading: true });
        const newUrl = `?q=${this.state.searchQuery}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
        const responseWithTotal = await FindImages(newUrl);
        const totalResults = responseWithTotal.totalHits;

        const response = responseWithTotal.hits;

        if (response.length === 0) {
          toast.error('Nothing found for your request', { autoClose: 3000 });
        }

        const imagesData = response.map(
          ({ id, tags, webformatURL, largeImageURL }) => {
            return {
              id,
              tags,
              webformatURL,
              largeImageURL,
            };
          }
        );

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...imagesData],
            totalResults,
          };
        });
      } catch (error) {
        this.setState({ error: true });
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  setSearchQuery = query => {
    if (query.trim().length === 0) {
      toast.warn('Sorry, search field if empty :(', { autoClose: 3000 });
      this.setState({ images: [], page: 1, searchQuery: '' });
      return;
    }

    if (query.trim().length > 0) {
      this.setState({ images: [], page: 1, searchQuery: query });
    }
  };

  pageIncrement = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  countTotalPages = totalResults => {
    const totalPages = Math.ceil(totalResults / 12);
    return totalPages;
  };

  positiveResponse = () => {
    toast.success(`Hooray! We found ${this.state.totalResults} images.`, {
      autoClose: 3000,
    });
  };

  render() {
    return (
      <AppContainer>
        <Searchbar onSubmit={this.setSearchQuery} />
        <ImageGallery images={this.state.images} />
        {this.state.page === 1 &&
          this.state.images.length > 0 &&
          this.positiveResponse()}
        {this.state.images.length > 0 &&
          this.countTotalPages(this.state.totalResults) !== this.state.page && (
            <LoadMoreBtn onClick={this.pageIncrement} />
          )}
        {this.state.isLoading && <Loader />}
        <ToastContainer />
        {this.state.page === this.countTotalPages(this.state.totalResults) && (
          <Finish />
        )}
      </AppContainer>
    );
  }
}

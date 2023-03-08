import React, { Component } from 'react';
import { GlobalStyles } from "./GlobalStyles";
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {fetchData}  from '../Fetch/Fetch';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button }  from 'components/Button/Button';
import { Modal }  from 'components/Modal/Modal';
import { Loader }  from 'components/Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    isLoading: false, 
    query: '',
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const { page } = this.state;

    if (prevQuery !== nextQuery || (prevState.page !== page && page !== 1)) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, page } = this.state;
    const perPage = 12;

    this.setState({ isLoading: true });

    fetchData(query, page, perPage)
      .then(({ hits, totalHits }) => {
        const totalPages = Math.ceil(totalHits / perPage);

        if (hits.length === 0) {
          return toast.error('Sorry, no images found. Please, try again!');
        }

        if (page === 1) {
          toast.success(`Way! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
        }

        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });
        this.setState(({ images }) => ({
          images: [...images, ...data],         
          total: totalHits,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onSearch = query => {
    if (query === this.state.query) return;
    this.setState({
      images: [],
      query,
      page: 1,
      error: null,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,   
    }));
  };

 toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL: largeImageURL });
  };

  
  render() {
    const { images, error, isLoading, showModal, largeImageURL, tags, total } = this.state;
    const loadImages = images.length !== 0;
    const isLastPage = images.length === total;
    const loadMoreBtn = loadImages && !isLoading && !isLastPage;

    return (
      <Container>
        <GlobalStyles />
        <Searchbar onSubmit={this.onSearch}/>
        {error && toast.error(error.message)}
        {isLoading && <Loader/>}
        {loadImages && <ImageGallery images={images} onClick={this.toggleModal}/>}
        {loadMoreBtn && <Button onClick={this.loadMore}>Load more</Button>}
        {showModal && <Modal onClose={this.toggleModal}><img src={largeImageURL} alt={tags}/></Modal>}
        <ToastContainer theme="dark" position="top-right" autoClose={2000}/>      
      </Container>
    );
  };
};


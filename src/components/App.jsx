import { useState, useEffect } from 'react';
import { GlobalStyles } from "./GlobalStyles";
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {fetchData}  from '../Fetch/Fetch';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button }  from 'components/Button/Button';
import { Modal }  from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';


export function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setErrore] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState('');

  useEffect(() => {    
    if (!query) return;
    fetchImages(query, page);    
  }, [query, page]);

  const fetchImages = (query, page) => {
    const perPage = 12;
    setIsLoading(true);

    fetchData(query, page, perPage)
      .then(({ hits, totalHits }) => {
        const totalPages = Math.ceil(totalHits / perPage);

        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });
        setImages(images => [...images, ...data]);
        setTotal(totalHits);

        if (hits.length === 0) {
          return toast.error('Sorry, no images found. Please, try again!');
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
        }

      })
  
      .catch(error => setErrore( error ))
      .finally(() => setIsLoading(false));
  };

  const onSearch = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
    setErrore(null);  
  };

  const  loadMore = () => {
    setPage(page => page + 1);
  };

  const  toggleModal = (largeImageURL, tags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };
  
  const loadImages = images.length !== 0;
  const isLastPage = images.length === total;
  const loadMoreBtn = loadImages && !isLoading && !isLastPage;

  return (
      <Container>
        <GlobalStyles />
        <Searchbar onSubmit={onSearch}/>
        {error && toast.error(error.message)}
        {isLoading && <Loader/>}
        {loadImages && <ImageGallery images={images} onClick={toggleModal}/>}
        {loadMoreBtn && <Button onClick={loadMore}>Load more</Button>}
        {showModal && <Modal onClose={toggleModal}><img src={largeImageURL} alt={tags}/></Modal>}
        <ToastContainer theme="dark" position="top-right" autoClose={2000}/>      
      </Container>
    );
};

















import { useEffect, useState } from 'react';
import fetchApiImages from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { SectionApp, ErrorMessage } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (search) {
      const getImages = async () => {
        try {
          setIsLoading(true);
          const data = await fetchApiImages(search, page);
          if (data.hits.length === 0) {
            return toast.error('Repeat the question again please');
          }
          setImages(prevState => [...prevState, ...data.hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      getImages();
    }
  }, [search, page]);

  const searchImages = ({ search }) => {
    if (search.trim() === '') {
      setImages([]);
      setPage(1);
      return toast.error('Repeat the question again please');
    }
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = data => {
    setCurrentImage(data);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <SectionApp>
      <Searchbar onSubmit={searchImages} />

      {error && (
        <ErrorMessage>
          Something went wrong. Try reloading the page
        </ErrorMessage>
      )}

      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} search={search} />
      )}

      {images.length > 0 && !isLoading && (
        <Button text="Load more" loadMoreImages={loadMoreImages} />
      )}

      <ToastContainer />
      {isLoading && <Loader />}

      {currentImage && (
        <Modal
          currentImage={currentImage}
          closeModal={closeModal}
          search={search}
        />
      )}
    </SectionApp>
  );
};

export default App;

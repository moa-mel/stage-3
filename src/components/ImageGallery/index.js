import React, { useContext } from 'react';
import { ImageContext } from '../../context/ImageContex';
import Image from '../Image';
import Loader from '../Loader';
import SearchBar from '../SearchBar';

function ImageGallery() {
  const { images, loading } = useContext(ImageContext);

  return (
    <div>
      <SearchBar />
      {loading ? (
        <Loader />
      ) : (
        <div className="gallery">
          {images.map((image) => (
            <Image key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;


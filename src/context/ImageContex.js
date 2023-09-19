import React, { createContext, useState } from 'react';

export const ImageContext = createContext();

function ImageContextProvider({ children }) {
  const [images, setImages] = useState([
    { id: 1, src: '../images/image1.jpg', tag: 'Nature' },
    { id: 2, src: '../images/image2.jpg', tag: 'Travel' },
  ]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const addImage = (newImage) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  return (
    <ImageContext.Provider value={{ images, loading, filter, setFilter, addImage }}>
      {children}
    </ImageContext.Provider>
  );
}

export default ImageContextProvider;
 







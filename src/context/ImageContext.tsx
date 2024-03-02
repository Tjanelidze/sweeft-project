import React, { createContext, useState, useContext } from 'react';
import { ImageContextType } from './interfaces';

const ImageContext = createContext<ImageContextType | any>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchedImages, setSearchedImages] = useState<ImageContextType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const updateImages = (images: ImageContextType[]) => {
    setSearchedImages(images);
  };

  return (
    <ImageContext.Provider
      value={{
        isLoading,
        setIsLoading,
        searchedImages,
        updateImages,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = (): ImageContextType => {
  const context = useContext(ImageContext);

  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};

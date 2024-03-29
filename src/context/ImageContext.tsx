import React, { createContext, useState, useContext } from 'react';
import { ImageContextType, UnsplashImage } from './interfaces';

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchedImages, setSearchedImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [targetImage, setTargetImage] = useState<UnsplashImage>();

  const updateImages = (images: UnsplashImage[]) => {
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
        targetImage,
        setTargetImage,
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

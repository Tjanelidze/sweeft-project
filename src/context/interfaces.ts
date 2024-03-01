export interface UnsplashImage {
  id: string;
  alt: string | null;
  url: {
    regular: string;
  };
}

export interface ImageContextType {
  searchedImages: UnsplashImage[];
  updateImages: (image: UnsplashImage[]) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

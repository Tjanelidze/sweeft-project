export interface UnsplashImage {
  id: string;
  alt_description: string | null;
  urls: {
    regular: string;
  };
}

export interface ImageContextType {
  searchedImages: UnsplashImage[];
  updateImages: (image: UnsplashImage[]) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

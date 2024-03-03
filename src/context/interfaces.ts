export interface UnsplashImage {
  alt_description: string;
  urls: { regular: string };
  id: string;
  total: number;
}

export interface ImageContextType {
  searchedImages: UnsplashImage[];
  updateImages: (image: UnsplashImage[]) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  targetImage: UnsplashImage | undefined;
  setTargetImage: React.Dispatch<
    React.SetStateAction<UnsplashImage | undefined>
  >;
}

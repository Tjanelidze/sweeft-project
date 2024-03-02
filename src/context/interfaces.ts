export interface UnsplashImage {
  map(arg0: () => void): any;
  alt_description: any;
  urls: any;
  id: any;
  total: number;
}

export interface ImageContextType {
  searchedImages: UnsplashImage[];
  updateImages: (image: UnsplashImage[]) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

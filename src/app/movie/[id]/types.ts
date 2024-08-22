interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    original_language: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genres: [{ id: number; name: string }];
    production_companies: [{ id: number; name: string; logo_path: string }];
    production_countries: [{ name: string }];
  }
  interface VideoResponse {
    id: number;
    results: Video[];
  }
  
  interface ApiResponse {
    results: Movie[];
  }
  interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
  }
  
  type Params = { id: string };
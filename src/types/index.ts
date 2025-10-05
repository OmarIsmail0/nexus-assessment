// OMDb API Response Types
export interface MovieSearchItem {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface MovieDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response: string;
}

export interface MovieSearchResponse {
    Search: MovieSearchItem[];
    totalResults: string;
    Response: string;
    Error?: string;
}

export interface MovieDetailsResponse extends MovieDetails {
    Response: string;
    Error?: string;
}

// API Request Types
export interface GetMoviesParams {
    imdbID?: string;
    title?: string;
    type?: string | null;
    year?: string;
    page?: number;
}

// App Config Types
export interface FilterType {
    value: string | null;
    label: string;
}

export interface AppConfig {
    app: {
        name: string;
        version: string;
        description: string;
    };
    filters: {
        types: FilterType[];
        yearRange: {
            min: number;
            max: number;
        };
    };
}


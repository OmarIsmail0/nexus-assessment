import type { AppConfig } from "../types";

export const APP_CONFIG: AppConfig = {
    // App Information
    app: {
        name: "OMDb API - Movies",
        version: "1.0.0",
        description: "A modern movie search application",
    },

    // Filter Options
    filters: {
        types: [
            { value: null, label: "All" },
            { value: "movie", label: "Movie" },
            { value: "series", label: "Series" },
            { value: "episode", label: "Episode" },
        ],
        yearRange: {
            min: 1900,
            max: new Date().getFullYear() + 1,
        },
    },
};

export const getContainerClasses = (): string => {
    return "max-w-[90vw]";
};


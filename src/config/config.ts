export interface AppConfig {
    BASE_API_ENDPOINT: string
}

export const CONFIG: AppConfig = {
    BASE_API_ENDPOINT: process.env.REACT_APP_API_URL!
};
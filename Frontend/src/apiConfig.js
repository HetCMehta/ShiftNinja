let BASE_URL;

if (process.env.NODE_ENV === "development") {
    BASE_URL = "http://localhost:6400/";
} else {
    BASE_URL = "https://your-server-url/";
}

export const API_URLS = {
    myShifts: `${BASE_URL}/all-events`,
    availableShifts: `${BASE_URL}/postSomething`,
    postShifts: `${BASE_URL}/postSomething`,
    schedule: `${BASE_URL}/all-events`
    // You can add more URLs here...
};

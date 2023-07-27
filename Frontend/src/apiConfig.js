let BASE_URL = "http://localhost:8080";

export const API_URLS = {
    login: `${BASE_URL}/users/login`,
    signup: `${BASE_URL}/users/signup`,
    myShifts: `${BASE_URL}/all-events`,
    availableShifts: `${BASE_URL}/postSomething`,
    postShifts: `${BASE_URL}/events`,
    schedule: `${BASE_URL}/events`,
    approve: `${BASE_URL}/events/approve`,
    update: `${BASE_URL}/events/update/`
    // You can add more URLs here...
};


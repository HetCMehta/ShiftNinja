import { schedule } from "./mockData";

let BASE_URL = "http://backend:8080";

export const API_URLS = {
    login: `${BASE_URL}/users/login`,
    myShifts: `${BASE_URL}/all-events`,
    availableShifts: `${BASE_URL}/postSomething`,
    postShifts: `${BASE_URL}/events`,
    schedule: `${BASE_URL}/events`
    // You can add more URLs here...
};



export const fetchSchedule = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(schedule);
        }, 1000);
    });
};

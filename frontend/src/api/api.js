import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:4000/api" });

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export const createUser = (data) => API.post("/users", data);
export const getUsers = () => API.get("/users");

export const createGroup = (data) => API.post("/groups", data);
export const getGroups = () => API.get("/groups");

export const addExpense = (groupId, data) => API.post(`/groups/${groupId}/expenses`, data);
export const getSummary = (groupId) => API.get(`/groups/${groupId}/expenses/summary`);

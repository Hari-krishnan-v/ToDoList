import {create} from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_SeverIp;

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    loading: true,
    user: null,
    todolist: [],
    loginError: null,
    signupError: null,


        checkAuth: async () => {
            try {
                const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true });
                if(response.data.isAuthenticated) {
                    set({
                        isAuthenticated: true,
                        user: response.data.user,
                        loading: false
                    });
                } else {
                    set({
                        isAuthenticated: false,
                        user: null,
                        loading: false
                    });
                }
            } catch (error) {
                set({loading: false});
            }
        },

        login: async (email,password) => {
            set({loading: true , loginError: null});
            try {
                const response = await axios.post(`${API_URL}/login`, {
                    email: email,
                    password: password
                },{ withCredentials: true });
                if(response.status === 200) {
                    const { token, data } = response.data;
                    set({
                        isAuthenticated: response.data.isAuthenticated,
                        user: response.data.user,
                        loading: false
                    });
                    localStorage.setItem("token", token);
                } else {
                    set({
                        isAuthenticated: false,
                        user: null,
                        loading: false,
                        loginError: response.data.message || "Login failed. Please try again."
                    });
                }
            }
            catch (error) {
                set({
                    loading: false,
                    loginError: error.response ? error.response.data.message : "Login failed. Please try again."
                });
                console.error("Login error:", error);
            }
        },

        signup: async (userData) => {
            set({loading: true, signupError: null});
            try{
                const response = await axios.post(import.meta.env.VITE_SeverIp+'/register', {
                    username: userData.username,
                    email: userData.email,
                    password: userData.password,
                    confirmPassword: userData.confirmPassword
                },
                    { withCredentials: true });
                if(response.status === 201) {
                    const { token, data } = response.data;
                    set({
                        isAuthenticated: response.data.isAuthenticated,
                        user: response.data.user,
                        loading: false
                    });
                    localStorage.setItem("token", token);
                } else {
                    set({
                        isAuthenticated: false,
                        user: null,
                        loading: false,
                        loginError: response.data.message || "Login failed. Please try again."
                    });
                }
            }catch (e) {
                set({loading: false, signupError: e.response ? e.response.data.message : "Signup failed. Please try again."});
                console.error("Signup error:", e);
            }
       },

        logout: async () => {
            try {
                set({loading: true});
                const response = await axios.get(import.meta.env.VITE_SeverIp+'/logout', { withCredentials: true });
                if (response.status !== 200) {
                    console.error("Logout failed:", response.data.message);
                }
                localStorage.removeItem("token");
                set({
                    isAuthenticated: false,
                    user: null,
                    loading: false
                });
            } catch (error) {
                set({loading: false});
            }
        },

        getToDoList: async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_SeverIp+'/get-todo', { withCredentials: true });
                console.log("Response from getToDoList:", response);
                if (!response.data || !response.data.data) {
                    console.error("No todo list found in response");
                    return;
                }
                const todos = response.data.data.map(todo => ({
                    ...todo,
                    id: todo._id,  // add 'id' for React keys
                }));
                set({
                    todolist: todos,
                    loading: false
                });
            } catch (error) {
                console.error("Error fetching todo list:", error);
            }
        },

        addToDo: async (todoData) => {
            set((state) => ({ loading: true }));
            try {
                const response = await axios.post(import.meta.env.VITE_SeverIp+'/create-todo', {
                    title: todoData.title,
                    description: todoData.description,
                }, { withCredentials: true });
                if( response.status === 201) {
                    set((state) => ({
                        todolist: [...state.todolist, response.data.data],
                        loading: false
                    }));
                } else {
                    console.error("Error adding todo:", response.data.message);
                    set((state) => ({ loading: false }));
                }
            } catch (error) {
                console.error("Error adding todo:", error);
                set((state) => ({ loading: false }));
            }
        },

        updateToDo: async (todoId, updatedData) => {
            try {
                const response = await axios.put(import.meta.env.VITE_SeverIp+`/update-todo/${todoId}`, updatedData,
                    { withCredentials: true });
                if (response.status === 200) {
                    set((state) => ({
                        todolist: state.todolist.map(todo =>
                            todo.id === todoId ? {...todo, ...updatedData} : todo
                        ),
                        loading: false
                    }));
                } else {
                    console.error("Error updating todo:", response.data.message);
                }
            } catch (error) {
                console.error("Error updating todo:", error);
            }
        },

        deleteToDo: async (todoId) => {
            set((state) => ({ loading: true }));
            try {
                const response = await axios.delete(import.meta.env.VITE_SeverIp+`/delete-todo/${todoId}`,
                    { withCredentials: true });
                if (response.status === 200) {
                    set((state) => ({
                        todolist: state.todolist.filter(todo => todo.id !== todoId),
                        loading: false
                    }));
                } else {
                    console.error("Error deleting todo:", response.data.message);
                }
            } catch (error) {
                console.error("Error deleting todo:", error);
            }
        }


}
));

export default useAuthStore;
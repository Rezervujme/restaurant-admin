import { defineStore } from 'pinia';
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    user: {},
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async init() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (!token || !user) {
        this.logout();
      } else {
        this.token = token;
        this.user = JSON.parse(user);
      }
    },
    async login(login: string, password: string) {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { login, password });

      this.token = data.data.token;
      this.user = data.data.user;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));

      // console.log(login, password);
    },
    async logout() {
      this.token = '';
      this.user = {};
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

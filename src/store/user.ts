import { defineStore } from 'pinia';
// import axios from 'axios';

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
    async login(login: string, password: string) {
      // const { data } = await axios.post('', { login, password });
      console.log(login, password);
    },
  },
});

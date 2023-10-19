import { reactive, ref } from 'vue';
import { useApi } from './api';

export function useUser() {
  
  let userReq = reactive(useApi());
  let user = ref();
  let client = ref();

  let getUser = () => {
    userReq.send(
      `/api/v1/user`
    )
    .then (res => {
      if (res) {
        user.value = res.user;
        client.value = res.user.client;
      }
    });
  }

  let hasRole = (role) => {
    if (user.value) {
      return user.value.roles.some(item => {
        return (item.description === role);
      });
    }
  }

  let isAmong = (roles) => {
    roles = roles.split('|');

    return roles.some(role => hasRole(role));
  }

  let refresh = () => {
    getUser();
  }

  getUser();

  return {
    user: user,
    client: client,
    hasRole,
    isAmong,
  }
}
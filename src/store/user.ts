import { get_user_info } from '@/api/user.api';
import store from 'store2'

export const user = {
  namespaced: true,
  state: () => ({
    userName: '',
    userId: '',
    isLogin:false,
  }),
  getters: {
    userInfo(state: any) {
      return {
        userName: state.userName,
        userId: state.userId
      }
    }
  },
  mutations: {
    // 更新本地用户信息
    updateUserInfo(state: any, userInfo: any): void {
      state.userName = userInfo.userName;
      state.userId = userInfo.userId;
      state.isLogin=true;
    }
  },
  actions: {
    async requestUserInfo({ commit }: any): Promise<{
      userName: string,
      userId: number
    }> {
      const response=await get_user_info();
      commit('updateUserInfo',response.data);
      return response.data;
    }
  },
}
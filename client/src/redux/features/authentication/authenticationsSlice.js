import { createSlice } from '@reduxjs/toolkit'

const authenticationsSlice = createSlice({
  name: 'auth',
  initialState: {
    user:{},
    isLogin: false
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    logout: (state, action) =>{
      state.isLogin = false;
      state.user = {};
    },
  }
})

export const { login, logout } = authenticationsSlice.actions
export default authenticationsSlice.reducer

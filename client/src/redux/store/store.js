import { configureStore } from '@reduxjs/toolkit'
import filesReducer from '../features/files/filesSlice'
import authReducer from '../features/authentication/authenticationsSlice'

export const store = configureStore({
  reducer: {
    files: filesReducer,
    auth: authReducer
    // filters: filtersReducer
  }
})
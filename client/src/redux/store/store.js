import { configureStore } from '@reduxjs/toolkit'
import filesReducer from '../features/files/filesSlice'
// import filtersReducer from '../features/filters/filtersSlice'

export const store = configureStore({
  reducer: {
    files: filesReducer,
    // filters: filtersReducer
  }
})
import { createSlice } from '@reduxjs/toolkit'



const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files:[
      // this is file  => {name, mediaLink, contentType, timeCreated, updated}
    ]
  },
  reducers: {
    fileAdded: (state, action) => {
      state.files.push(action.payload)
    },
    fileDelete: (state, action) =>{
      console.log("fileDelete");
      state.files = state.files.filter( file => file.name.split('/')[1] != action.payload);
    },
    filesGet: (state, action) =>{
      state.files = action.payload;
    }

  }
})

export const { fileAdded, filesGet, fileDelete } = filesSlice.actions
export const selectFiles = state => state.files.files
export default filesSlice.reducer

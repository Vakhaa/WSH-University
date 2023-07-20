
import { createSlice } from '@reduxjs/toolkit'

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: [
      // this is file  => {name, mediaLink, contentType, timeCreated, updated}
    ]
  },
  reducers: {
    fileAdded: (state, action) => {
      state.files.push(action.payload);
    },
    fileDelete: (state, action) => {

      let fullPath = action.payload.path + action.payload.name;
      state.files = state.files.filter(file => file.path != fullPath);
    },
    filesGet: (state, action) => {
      state.files = action.payload;
    },
    folderAdded: (state, action) => {
      state.files.push(action.payload);
    }

  }
})

export const { fileAdded, filesGet, fileDelete, folderAdded } = filesSlice.actions;
export const selectFiles = state => state.files.files;
export const selectFolders = state => state.files.files.filter(file => file.isFolder);
export default filesSlice.reducer;

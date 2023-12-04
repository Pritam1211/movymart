import { createSlice } from '@reduxjs/toolkit'

export interface HomeState {
  urls: any,
  genres: any
}

const initialState: HomeState = {
  urls: {},
  genres: {}
}

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setApiConfiguration: (state, action) => {
      state.urls = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
})

export const { setApiConfiguration, setGenres } = homeSlice.actions

export default homeSlice.reducer
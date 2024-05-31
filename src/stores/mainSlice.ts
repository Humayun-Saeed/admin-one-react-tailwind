import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserPayloadObject } from '../interfaces'

interface MainState {
  
  isFieldFocusRegistered: boolean
  token:string
}

const initialState: MainState = {
  /* User */
 token:"",

  /* Field focus with ctrl+k (to register only once) */
  isFieldFocusRegistered: false,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      // state.userName = action.payload.name
      // state.userEmail = action.payload.email
    },
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setUser,setToken } = mainSlice.actions

export default mainSlice.reducer

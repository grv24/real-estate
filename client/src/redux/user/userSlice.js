import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    userMessage:null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signUpStart: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state, action) => {
            state.userMessage = action.payload;
            state.loading = false;
            state.error = null;
        },
        signUpFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
})


export const { signInStart, signInSuccess, signInFailure,signUpStart,signUpSuccess,signUpFailure } = userSlice.actions;
export default userSlice.reducer;
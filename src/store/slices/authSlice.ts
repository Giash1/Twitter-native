import { createSlice } from "@reduxjs/toolkit";
// imports the createSlice function from the Redux Toolkit library, which is used to create a Redux slice.
const initialState = {
  // initialState object, which represents the initial state of the 'auth' slice with
  // a single property loggedInAs initialized as undefined.
  loggedInAs: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      console.log("logIn action dispatched");
      state.loggedInAs = action.payload;
    },
    logOut: (state) => {
      console.log("logOut action dispatched");
      state.loggedInAs = undefined;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
// export the logIn and logOut action creators from the authSlice.actions object. These action creators can be used
// to dispatch actions to update the 'auth' slice's state.
export default authSlice.reducer;

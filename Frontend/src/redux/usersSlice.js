import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    // Logout: (state) => {
    //   // action parameter is unnecessary here
    //   state.user = null;
    // },
  },
});

export const { SetUser, Logout } = usersSlice.actions;
export default usersSlice.reducer;

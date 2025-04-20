import { createSlice } from "@reduxjs/toolkit";

export type UserType = {
  email: string;
  id: number;
  username: string;
};
const initialState: UserType = { email: "", id: 0, username: "" };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("пользователь", action.payload);
      state = action.payload as UserType;
    },
    removeUser: (state) => {
      state = initialState;
    },
  },
});
export const userActions = userSlice.actions;

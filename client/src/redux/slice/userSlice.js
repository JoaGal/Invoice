import { createSlice } from "@reduxjs/toolkit";

const user = {
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
}

const userSlice = createSlice({
  name: "user",

  initialState: user,

  reducers: {
    updateUser: (state, action) => {
        const { name, value,  } = action.payload;
        state[name] = value;
    },
    resetUser: () => user,
    setUser: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
    },
  },
});

export const { updateUser, resetUser, setUser} = userSlice.actions;
export default userSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INullable, IUserData } from "../types";
import { authAPI } from "../../axios";

type userState = {
  loading: boolean;
  error: INullable<string>;
  token: INullable<string>;
  redirect: INullable<string>;
};

const initialState: userState = {
  loading: false,
  error: null,
  token: null,
  redirect: null,
};

// Fixed fetchByAddNewUser function
export const fetchByAddNewUser = createAsyncThunk<
  string,
  IUserData,
  { rejectValue: string }
>("user/fetchByAddNewUser", async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.userRegist(data);
    if (res.status !== 201) {
      throw new Error("Server error");
    }
    return res.data.message as string;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchByLogin = createAsyncThunk<
  string,
  IUserData,
  { rejectValue: string }
>("user/fetchByLogin", async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.userLogin(data);
    if (res.status !== 200) {
      throw new Error("Server error");
    }
    return res.data.access as string;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearRedirect(state) {
      state.redirect = null;
    },
    logOut(state) {
      state.token = null;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchByAddNewUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addCase(fetchByAddNewUser.fulfilled, (state, action) => {
      if (action.payload.includes("Successfully")) {
        state.loading = false;
        state.redirect = "/login";
      }
    });
    addCase(fetchByAddNewUser.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.loading = false;
      }
    });
    //================================================================
    addCase(fetchByLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addCase(fetchByLogin.fulfilled, (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.redirect = "/";
    });
    addCase(fetchByLogin.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.loading = false;
      }
    });
    //================================================================
  },
});
export const { clearRedirect, logOut } = userSlice.actions;

export default userSlice.reducer;

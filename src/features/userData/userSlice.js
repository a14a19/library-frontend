import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../../apis/api";

const initialState = {
    usersData: []
}

export const getAllUsersApi = createAsyncThunk("users/AllUsers", async (str, thunkAPI) => {
    try {
        // return console.log("data login: ", str)
        return getAllUsers(str.body, str.params, str.options).then((res) => res.data).catch((e) => e.response.data)
    } catch (e) {
        return thunkAPI.rejectWithValue("something went wrong...")
    }
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserDetail: (state, { payload }) => {
            console.log(state.userDetail, payload.userDetail)
            // state.userDetail = payload.userDetail;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsersApi.fulfilled, (state, { payload }) => {
            // console.log(state, payload.data)
            state.usersData = payload.data;
        })
    }
})

export const { updateUserDetail } = userSlice.actions;

export default userSlice.reducer;
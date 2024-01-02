import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userSignIn, userSignUp } from "../../apis/api";

const initialState = {
    isLoading: true,
    isErr: false,
    errorMsgArr: [],
    errorMsg: "",
    auth: false,
    token: "",
    name: "",
    email: "",
    number: "",
    _id: "",
    role: "",
    userName: ""
}

export const authorization = createAsyncThunk("auth/authorization", async (str, thunkAPI) => {
    try {
        // return console.log("data login: ", str)
        return userSignIn(str).then((res) => res.data).catch((e) => e.response.data)
    } catch (e) {
        return thunkAPI.rejectWithValue("something went wrong...")
    }
})

export const userSignUpApi = createAsyncThunk("user/signup", async (str, thunkAPI) => {
    try {
        // return console.log("data login: ", str)
        return userSignUp(str).then((res) => res.data).catch((e) => e.response.data)
    } catch (e) {
        return thunkAPI.rejectWithValue("something went wrong...")
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.auth = false;
            state.role = "";
            state.userDetail = {};
            state.token = "";
            localStorage.setItem("user", JSON.stringify({}));
        },
        closeErrBox: (state) => {
            state.isErr = false;
            state.errorMsg = undefined;
        },
        openPopup: (state) => {
            state.isErr = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authorization.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.token = payload.token;
                state.name = payload.data.name;
                state.email = payload.data.email;
                state.number = payload.data.number;
                state._id = payload.data._id;
                state.role = payload.data.role;
                state.userName = payload.data.userName;
                state.isLoading = false;
                state.auth = true;

                let obj = {
                    token: payload.token,
                    name: payload.data.name,
                    email: payload.data.email,
                    number: payload.data.number,
                    _id: payload.data._id,
                    role: payload.data.role,
                    userName: payload.data.userName,
                    auth: true,
                }
                localStorage.setItem("user", JSON.stringify(obj));
            }
            if (payload.error || payload.errors) {
                state.auth = false;
                state.isErr = true;
                if (payload.errors) {
                    state.errorMsgArr = payload.errors
                }
                if (payload.error) {
                    state.errorMsg = payload.message
                }
                console.log(payload.errors, payload.error)
            }
            console.log(payload, btoa(JSON.stringify(payload)))
            // state.userDetail = payload;
        })
        builder.addCase(authorization.rejected, (state, action) => {
            console.log("here:", action)
            state.isLoading = false;
        })
        builder.addCase(authorization.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(userSignUpApi.fulfilled, (state, { payload }) => {
            if (payload.error || payload.errors) {
                state.auth = false;
                state.isErr = true;
                if (payload.errors) {
                    state.errorMsgArr = payload.errors
                }
                if (payload.error) {
                    state.errorMsg = payload.message
                }
                console.log(payload.errors, payload.error)
            }
        })
        builder.addCase(userSignUpApi.rejected, (state, action) => {
            console.log("here:", action)
            state.isLoading = false;
        })
        builder.addCase(userSignUpApi.pending, (state) => {
            state.isLoading = true;
        })
    }
})

export const { logoutUser, closeErrBox, openPopup } = authSlice.actions;

export default authSlice.reducer;
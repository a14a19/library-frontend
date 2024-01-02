import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addBook, allBooksData, bookDataById, bookDeleteById, getTransTypeUpdate, transTypeCreate, transTypeUpdate } from "../../apis/api";

const initialState = {
    bookData: [],
    bookById: {},
    transType: {},
    bookAdded: false,
    currentPage: 1,
    totalPage: 1,
    dataLoading: false
}

export const allBooksDataAPI = createAsyncThunk("books/getAllData", async (str, thunkAPI) => {
    try {
        // return console.log("data login: ", str)
        return allBooksData(str.body, str.params, str.options).then((res) => res.data).catch((e) => e.response.data)
    } catch (e) {
        return thunkAPI.rejectWithValue("something went wrong...")
    }
})

export const addBookAPI = createAsyncThunk("books/addBookAPI", async (str, thunkAPI) => {
    try {
        return addBook(str.body, str.params, str.options).then((res) => res.data).catch((e) => e.response.data)
    } catch (e) {
        return thunkAPI.rejectWithValue("something went wrong...")
    }
})

export const bookDataByIdAPI = createAsyncThunk("books/getBookById", async (str, thunkAPI) => {
    try {
        // return console.log("data login: ", str)
        return bookDataById(str.body, str.params, str.options).then((res) => res.data).catch((e) => e.response.data)
    } catch (e) {
        return thunkAPI.rejectWithValue("something went wrong...")
    }
})

export const transTypeUpdateApi = createAsyncThunk("books/transTypeUpdateApi", async (str, thunkAPI) => {
    try {
        // return console.log("data login: ", str)
        return transTypeUpdate(str.body, str.params, str.options).then((res) => res.data).catch((e) => e.response.data)
    } catch (e) {
        return thunkAPI.rejectWithValue("something went wrong...")
    }
})

export const transTypeCreateApi = createAsyncThunk("books/transTypeCreateApi", async (str, thunkAPI) => {
    try {
        // return console.log("data login: ", str)
        return transTypeCreate(str.body, str.params, str.options).then((res) => res.data).catch((e) => e.response.data)
    } catch (e) {
        return thunkAPI.rejectWithValue("something went wrong...")
    }
})

export const getTransTypeUpdateApi = createAsyncThunk("books/getTransTypeUpdateApi", async (str, thunkAPI) => {
    try {
        // return console.log("data login: ", str)
        return getTransTypeUpdate(str.body, str.params, str.options).then((res) => res.data).catch((e) => e.response.data)
    } catch (e) {
        return thunkAPI.rejectWithValue("something went wrong...")
    }
})

export const deleteBookAPI = createAsyncThunk("books/deleteBookAPI", async (str, thunkAPI) => {
    try {
        // return console.log("data login: ", str)
        return bookDeleteById(str.body, str.params, str.options).then((res) => res.data).catch((e) => e.response.data)
    } catch (e) {
        return thunkAPI.rejectWithValue("something went wrong...")
    }
})

const bookDataSlice = createSlice({
    name: "bookData",
    initialState,
    reducers: {
        books: (state, { payload }) => {

        },
        bookDeleteId: (state, { payload }) => {
            state.bookToDelete = payload.id
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addBookAPI.fulfilled, (state, { payload }) => {
            console.log(state, payload, "Book added")
            state.bookAdded = payload.status;
        })
        builder.addCase(allBooksDataAPI.fulfilled, (state, { payload }) => {
            state.bookData = payload.data
            // console.log(state.bookData, payload.data)
        })
        builder.addCase(bookDataByIdAPI.fulfilled, (state, { payload }) => {
            state.bookById = payload.data
            // console.log(state.bookData, payload.data)
        })
        builder.addCase(getTransTypeUpdateApi.fulfilled, (state, { payload }) => {
            state.transType = payload.data[0]
            // console.log(state.transType, payload)
        })
        builder.addCase(transTypeCreateApi.fulfilled, (state, { payload }) => {
            // state.transType = payload.data[0]
            console.log(state, payload)
        })
        builder.addCase(deleteBookAPI.fulfilled, (state, { payload }) => {
            state.bookById = {};
            // state.transType = payload.data[0]
            console.log(state, payload)
        })
    }
})

export const { books, bookDeleteId } = bookDataSlice.actions;

export default bookDataSlice.reducer;
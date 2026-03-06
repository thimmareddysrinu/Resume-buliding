// src/ReduxToolkit/Reducers/Inputsending.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const url = import.meta.env.VITE_API_URL

export const searching = createAsyncThunk(
    "inputsending/values",
    async (searchData, { rejectWithValue }) => {  // ✅ Fixed typo
       
        try {
            const formdata = new FormData()
            formdata.append("type", searchData.input_type || "baseUser");
            formdata.append("prompt", searchData.text)

            if (searchData.audio) formdata.append("audio", searchData.audio)
            if (searchData.file) formdata.append("file", searchData.file)

            const token = localStorage.getItem('access_token')
            const headers = {}
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            }
            const response = await fetch(`${url}/searching/`, {
                method: 'POST',
                headers: headers,
                body: formdata,

            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error("Backend error:", errorData)
                return rejectWithValue(errorData)
            }

            const data = await response.json()
            console.log("Response:", data)


            return {
                request: {
                    text: searchData.text,
                    input_type: searchData.input_type,
                    hasAudio: !!searchData.audio,
                    hasFile: !!searchData.file,
                },
                response: data
            }

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const inputsending = createSlice({
    name: "inputsending",
    initialState: {
        currentInput: 'baseUser',
        history: [],
        loading: false,
        status: 'idle',
        error: null
    },
    reducers: {
        setCurrentInput: (state, action) => {
            state.currentInput = action.payload
            console.log("✅ Current Input Changed:", action.payload);
        },
    },
    extraReducers: (builder) => { 
        builder
            .addCase(searching.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(searching.fulfilled, (state, action) => {
                state.status = 'success'
                state.history.push(action.payload)
            })
            .addCase(searching.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export const { setCurrentInput } = inputsending.actions
export default inputsending.reducer
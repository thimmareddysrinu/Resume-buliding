// src/ReduxToolkit/Reducers/Inputsending.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const url = 'http://127.0.0.1:8000'

export const fetchConversations = createAsyncThunk(
    "Conversations/values",
    async (searchData, { rejectWithValue }) => { 
       
        try {

            const response = await fetch(`${url}/conversations/${conversation_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }


            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error("Backend error:", errorData)
                return rejectWithValue(errorData)
            }

            const data = await response.json()
            console.log("Response:", data)
            return {response: data}

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const ConversationMessages = createSlice({
    name: "conversation",
    initialState: {},
    
    extraReducers: (builder) => {  
        builder
            .addCase(fetchConversations.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.status = 'success'
                state.history.push(action.payload)
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }})


export default ConversationMessages.reducer
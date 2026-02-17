// src/ReduxToolkit/Reducers/Inputsending.jsx
import { createSlice,createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"


const inputs=()=>[{
    id:1,
      audio: null,
    text: "",
    file: null,
}]

export  const searching=createAsyncThunk(
    "inputsending/values",
    async (searchData,{ rejectedWithValue })=>{
        console.log("🔍 RECEIVED DATA:", searchData);
        try {
            const formdata= new FormData()
            formdata.append("text",searchData.text)

            if (searchData.audio)  formdata.append("audio",searchData.audio)
            if (searchData.file)  formdata.append("file",searchData.file)

            console.log("formdata",formdata) 
            const response=await fetch("www.google",{
                method:'POST',
                body:formdata
            })   
            if (!response.ok) throw new Error("failed to submit") 
            console.log(response.json())    
            return await response.json() 
            
        } catch (error) {

            return rejectedWithValue(error.message)
        }
    }

    
)

const initialState = inputs() // Fixed: proper initial state

const inputsending = createSlice({
  name: "inputsending",
   initialState: {
    ...initialState[0],  // Current form
    history: [],         // Past submissions
    status: 'idle',
    error: null
  },
  reducers: {
   setCurrentInput:(state,action)=>{
    state.audio=action.payload.audio
    state.text=action.payload.text
    state.file=action.payload.file
   },
   clearInput:(state)=> inputs()[0]
    },
    extraReducers: (bulider)=>{
        bulider
         .addCase(searching.pending, (state) => {
        state.status = 'loading'
      })  .addCase(searching.fulfilled, (state,action) => {
        state.status = 'success'
        state.history.push({
            ...state,
            response:action.payload
        })
      })
        .addCase(searching.rejected, (state,action) => {
        state.status = 'failed'
        state.error=action.payload
      })

    }
   
  }
  // Fixed: removed broken extraReducers
)

export const { setCurrentInput,clearInput } = inputsending.actions
export default inputsending.reducer

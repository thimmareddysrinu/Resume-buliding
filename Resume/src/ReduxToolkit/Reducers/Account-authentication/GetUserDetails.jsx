import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'


const url = 'http://127.0.0.1:8000'

export const GetUserDetailbackend = createAsyncThunk("/User/details",
    async (signindata, { rejectWithValue }) => {
        console.log(signindata);
        try {
            
            const user_id=JSON.parse(localStorage.getItem("id"))

            const response = await fetch(`${url}/userdetails/${user_id}/`, {
                method: 'GET',
                
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Get Details  failed");
            }

            const data = await response.json();  
            console.log("USER Success:", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message)

        }

    }







)


export const UpdateUserDetailbackend = createAsyncThunk("Userdetails/Update",
    async (updatedata, { rejectWithValue }) => {
        console.log(updatedata);
        try {
            
            const user_id=JSON.parse(localStorage.getItem("id"))

            const response = await fetch(`${url}/userdetails/${user_id}/`, {
                method: 'PUT',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify(updatedata)
                
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Update Details  failed");
            }

            const data = await response.json();  
            console.log("User Update Success:", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message)

        }

    }







)


const GetUserDetails=createSlice({
    name:"UserDetails",
    initialState:{
        phone_number:"",
        first_name:"",
        last_name:"",
        email:"",
        status:'idle',
        response:null,
        errors:null
    },
    reducers:{},
    extraReducers:
        (builder)=>{
            builder
            .addCase(GetUserDetailbackend.pending,(state)=>{
                state.status='pending'

            })
            .addCase(GetUserDetailbackend.fulfilled,(state,action)=>{
                state.status='succeeded'
                state.response=action.payload

            })
             .addCase(GetUserDetailbackend.rejected,(state,action)=>{
                state.status='failed'
                state.errors=action.payload

            })
             .addCase(UpdateUserDetailbackend.pending,(state)=>{
                state.status='pending'

            })
            .addCase(UpdateUserDetailbackend.fulfilled,(state,action)=>{
                state.status='succeeded'
                state.response=action.payload

            })
             .addCase(UpdateUserDetailbackend.rejected,(state,action)=>{
                state.status='failed'
                state.errors=action.payload

            })

        }
    
})

export default GetUserDetails.reducer
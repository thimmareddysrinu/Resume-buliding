import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'


const url = import.meta.env.VITE_API_URL
const authHeader = () => {
    const token = localStorage.getItem('access_token')
    return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export const GetUserDetailbackend = createAsyncThunk("/User/details",
    async (signindata, { rejectWithValue }) => {
        console.log(signindata);
        try {
            
            const user_id=JSON.parse(localStorage.getItem("id"))

            const response = await fetch(`${import.meta.env.VITE_API_URL}/userdetails/${user_id}/`, {
                method: 'GET',
                headers: authHeader() 
                
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
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader()    // ← send token
                },
                body: JSON.stringify(updatedata)
                
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
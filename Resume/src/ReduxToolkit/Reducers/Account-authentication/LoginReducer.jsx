import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"



const url = import.meta.env.VITE_API_URL

export const Loginbackend = createAsyncThunk("User/login",
    async (logindata,{rejectWithValue}) => {
        console.log(logindata);
        try {
            const formData = new FormData()
            formData.append("phone_number", logindata.phone_number)
            formData.append("password", logindata.password)

            console.log("formdata", formData)

            const response = await fetch(`${url}/login-user/`, {
    method: 'POST',
    body: formData,
     // ← receives session cookie from Django
})
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login failed");
            }

            const data = await response.json();
            if (data.access) {
                localStorage.setItem('access_token', data.access)
                localStorage.setItem('refresh_token', data.refresh)
                localStorage.setItem('id', JSON.stringify(data.id))
            }
            
            console.log("Success:", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message)

        }

    }







)



const LoginReducer = createSlice({
    name: 'Loging',
    initialState: {
        phone_number:'',
        password:'',
        status:"idle",
        error:null,
        response:null
    },
    reducers: {
     clearLoginError: (state) => {
            state.error = null;
            state.status = 'idle';
        },
        // ← ADD LOGOUT ACTION
        logout: (state) => {
            state.response = null;
            state.status = 'idle';
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('id')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(Loginbackend.pending, (state)  => {
                state.status = 'loading';
            })
            .addCase(Loginbackend.fulfilled, (state,action)  => {
                state.status = 'succeeded';
                state.response = action.payload;
            })
            .addCase(Loginbackend.rejected, (state,action) => {
                state.status = 'failed';
                state.error = action.payload;
            })


    }
}




)
const {clearLoginError,logout}=LoginReducer.actions;
export default LoginReducer.reducer;
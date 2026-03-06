import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"



const url = 'http://127.0.0.1:8000'

export const Registerbackend = createAsyncThunk("Register/User",
    async (signindata, { rejectWithValue }) => {
        console.log(signindata);
        try {
            const formData = new FormData()
            formData.append("phone_number", signindata.phone_number)
            formData.append("password", signindata.password)
            formData.append("confirum_password", signindata.confirm_password)
            console.log("formdata", formData)

            const response = await fetch(`${url}/Register-User/`, {
                method: 'POST',
                body: formData
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed");
            }

            const data = await response.json();  // ✅ Await json()
            console.log("Success:", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message)

        }

    }







)



const SignupReducer = createSlice({
    name: 'Signing',
    initialState:
      {
        phone_number:'',
        password:'',
        confirm_password:'',
        status:"idle",
        error:null,
        response:null
    },
    reducers: {

    clearSignupError: (state) => {
      state.error = null;
      state.status = 'idle';
    },
    resetSignupForm: (state) => {
      state.phone_number = "";
      state.password = "";
      state.confirm_password = "";
      state.status = 'idle';
    }
    },
    extraReducers: (builder) => {
        builder
            .addCase(Registerbackend.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(Registerbackend.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.response = action.payload;
            })
            .addCase(Registerbackend.rejected, (state,action) => {
                state.status = 'failed';
                state.error = action.payload;
            })


    }
}




)
const {resetSignupForm,clearSignupError} =SignupReducer.actions;
export default SignupReducer.reducer;
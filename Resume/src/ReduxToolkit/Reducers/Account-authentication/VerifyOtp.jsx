import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const url = import.meta.env.VITE_API_URL

export const VerifyOtpbackend = createAsyncThunk("User/VerifyOtp",
    async (verifyOTPdata,{rejectWithValue}) => {
        console.log(verifyOTPdata);
        try {
            const formData = new FormData()
            formData.append("phone_number", verifyOTPdata.phone_number)
            formData.append("otp", verifyOTPdata.otp)

            console.log("formdata", formData)

            const response = await fetch(`${url}/otp-verify/`, {
                method: 'POST',
                body: formData
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Otp verification  failed");
            }

            const data = await response.json();  // ✅ Await json()
            console.log("Success:", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message)

        }

    }







)



const VerifyOtp = createSlice({
    name: 'Otpverify',
      initialState: {
        phone_number:'',
        otp:'',
     
        status:"idle",
        error:null,
        response:null
    },
    reducers: {
         clearOtpError: (state) => {
      state.error = null;
      state.status = 'idle';
    }
    },
    extraReducers: (builder) => {
        builder
            .addCase(VerifyOtpbackend.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(VerifyOtpbackend.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.response = action.payload;
            })
            .addCase(VerifyOtpbackend.rejected, (state,action) => {
                state.status = 'failed';
                state.error = action.payload;
            })


    }
}




)
const {clearOtpError} =VerifyOtp.actions;
export default VerifyOtp.reducer;
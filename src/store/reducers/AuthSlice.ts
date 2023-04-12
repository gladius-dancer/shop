import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    status: boolean;
    authStatus: boolean;
    error: string;
}

const initialState: UserState = {
    status: false,
    authStatus: false,
    error: "",

}

export const authSlice= createSlice({
    name: "auth",
    initialState,
    reducers:{
        login(state){
            state.status = true
        },
        loginSuccess(state, action: PayloadAction<boolean>){
            state.status = false
            state.error = ""
            state.authStatus = action.payload
        },
        loginError(state, action){
            state.status = false
            state.error = action.payload
        }
    }
})

export default authSlice.reducer;
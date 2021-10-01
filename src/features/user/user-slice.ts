import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Profile, washstationApi } from "../../services/washstation-service";

type UserState = {
    token: string | null;
    refreshToken: string | null;
    expires: string | null;

    profile: Profile | null;
    location_id: number;
}

const initialState: UserState = {
    token: null,
    refreshToken: null,
    expires: null,
    profile: null,
    location_id: -1
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLocation(state, action: PayloadAction<number>) {
            state.location_id = action.payload;
        },
        logout(state) {
            state.token = null;
            state.refreshToken = null;
            state.expires = null;
            state.profile = null;
            state.location_id = -1;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(washstationApi.endpoints.token.matchFulfilled, (state, { payload }) => {
            state.token = payload.access_token;
            state.refreshToken = payload.refresh_token;
            state.expires = new Date(Date.now() + payload.expires_in).toISOString();
        });

        builder.addMatcher(washstationApi.endpoints.profile.matchFulfilled, (state, { payload }) => {
            state.profile = payload;
            if(state.location_id === -1) {
                state.location_id = payload.default_location_id;
            }
        });
    }
});

export default userSlice.reducer;
export const { setLocation, logout } = userSlice.actions;
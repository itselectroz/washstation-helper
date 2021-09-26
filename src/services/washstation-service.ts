import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import formUrlEncoded from 'form-urlencoded';
import { RootState } from '../app/store';

const WASHSTATION_URL = 'https://cors-anywhere-electroz.herokuapp.com/https://mobile.kosmoshub.com/washstation/';

export type TokenPasswordPayload = {
    username: string;
    password: string;
    grant_type: 'password';
};

export type TokenRefreshPayload = {
    refresh_token: string;
    grant_type: 'refresh_token';
};

export type TokenPayload = TokenPasswordPayload | TokenRefreshPayload;

export type TokenResponse = {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string | null;
    refresh_token: string;
};

export type Machine = {
    id: number;
    name: string;
    size: string;
    isBroken: boolean;
    isAvailable: boolean;
    isBusy: boolean;
    statusName: string;
    isReserved: boolean;
    isReservedForMe: boolean;
    secLeft: number;
    statusId: number;
    type: number;
    endOfCycle: boolean;
    showLeftTime: boolean;
    manufacturerCode: string;
    hasExtraReservation: boolean;
    hasExtraReservationForMe: boolean;
    extraReservationTime: string;
    lastApiStatus: number;
    lastApiStatusTime: {
        date: string;
        timezone_type: number;
        timezone: string;
    };
    isReadyToStart: boolean;
}

export type MachineResponse = Machine[];

export type Profile = {
    is_company: boolean;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_name: string;
    company_code: string;
    company_vat: string;
    address: string;
    newsletter: boolean;
    send_notifications: boolean;
    default_location_id: number;
};

export type WashstationLocation = {
    id: number;
    name: string;
    address: string | null;
    onlyPreferred: boolean;
    coordinates: {
      lat: number | null;
      lng: number | null;
    };
    settings: {
      basicReservationMinutes: number | null;
      extendedReservationMinutes: number | null;
    };
    features: {
      basicReservationEnabled: boolean;
      extendedReservationEnabled: boolean;
    }
  }

export const washstationApi = createApi({
    reducerPath: 'washstation-service',
    baseQuery: fetchBaseQuery({
        baseUrl: WASHSTATION_URL,
        prepareHeaders(headers, { getState }) {
            const state: RootState = <RootState>getState();
            if (!!state.user.token) {
                headers.set('Authorization', `Bearer ${state.user.token}`);
            }

            headers.set('X-Requested-With', 'XMLHttpRequest');
            headers.set('Content-Type', 'application/x-www-form-urlencoded');



            return headers;
        },
    }),
    endpoints: (builder) => ({
        token: builder.mutation<TokenResponse, TokenPayload>({
            query: (args) => ({
                url: `/oauth/v2/token`,
                method: 'POST',
                body: formUrlEncoded({
                    ...args,
                    "client_id": "1_1881648594",
                    "client_secret": "A4f5d4gf59aT4566999999GHJ"
                })
            }),
        }),
        profile: builder.query<Profile, void>({
            query: () => ({
                url: '/api/profile'
            })
        }),
        machines: builder.query<MachineResponse, number>({
            query: (location: number) => ({
                url: '/api/catalog/machines/1',
                headers: {
                    Location: location.toString()
                }
            })
        }),
        locations: builder.query<WashstationLocation[], void>({
            query: () => ({
                url: '/api/catalog/locations'
            })
        }),
    })
});


export const { useTokenMutation, useMachinesQuery, useLocationsQuery } = washstationApi;
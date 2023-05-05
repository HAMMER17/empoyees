import { User } from "@prisma/client";
import { api } from './api'


export type UserData = Omit<User, 'id'>
type ResponceData = User & { token: string }

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponceData, UserData>({
      query: (userData) => ({
        url: '/user/login',
        method: 'POST',
        body: userData,
      }),
    }),
    register: builder.mutation<ResponceData, UserData>({
      query: (userData) => ({
        url: '/user/register',
        method: 'POST',
        body: userData,
      }),
    }),
    current: builder.query<ResponceData, void>({
      query: () => ({
        url: '/user/current',
        method: 'GET',
      }),
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation, useCurrentQuery } = authApi;
export const { endpoints: { login, register, current }, } = authApi;
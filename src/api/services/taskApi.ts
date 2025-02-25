import { api, tagTypes } from "../base";
import {
  AuthResult,
  LoginInput,
  User,
  Ticket,
  SubmitTicketTaskInput,
  HomeConn,
  SubmitTaskInput,
} from "../types/types";

export const authApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    login: mutation<AuthResult, LoginInput>({
      query: (body) => ({ url: "auth/login", method: "POST", body }),
      invalidatesTags: tagTypes,
    }),

    getAuthUser: query<User, void>({
      query: () => "auth/user",
      providesTags: ["user"],
    }),

    getTicket: query<Ticket, { id: string }>({
      query: ({ id }) => `tickets/${id}`,
      providesTags: ["tickets"],
    }),

    getTickets: query<Ticket[], void>({
      query: () => "tickets",
      providesTags: ["tickets"],
    }),

    listTickets: query<Ticket[], void>({
      query: () => "tickets/list",
      providesTags: ["tickets"],
    }),

    escalateTicket: mutation<void, any>({
      query: ({ id, ...body }) => ({
        url: `tickets/${id}/escalate`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["tickets"],
    }),

    resolveTicket: mutation<void, any>({
      query: ({ id, ...body }) => ({
        url: `tickets/${id}/resolve`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["tickets"],
    }),

    submitTicketTask: mutation<void, SubmitTicketTaskInput>({
      query: ({ id, ...body }) => ({
        url: `tickets/${id}/submit-task`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["tickets"],
    }),

    listHomeConn: query<HomeConn[], void>({
      query: () => ({ url: "homeconn" }),
      providesTags: ["tickets"],
    }),

    submitHomeConnTask: mutation<void, SubmitTaskInput>({
      query: ({ id, ...body }) => ({
        url: `homeconn/${id}/submit-task`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["tickets"],
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useLoginMutation,
  useGetTicketsQuery,
  useListTicketsQuery,
  useGetTicketQuery,
  useEscalateTicketMutation,
  useResolveTicketMutation,
  useSubmitTicketTaskMutation,
  useListHomeConnQuery,
  useSubmitHomeConnTaskMutation,
} = authApi;

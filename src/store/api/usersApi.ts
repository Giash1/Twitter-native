import { createApi } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  doc,
  deleteDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase-config";

// asynchronous function firebaseBaseQuery that handles Firebase requests:
const firebaseBaseQuery = async ({ baseUrl, url, method, body }) => {
  switch (method) {
      case "GET": {
// a switch statement based on the method property. If the method is 'GET', the code inside this block will be executed.

      // eslint-disable-next-line no-case-declarations
      const snapshot = await getDocs(collection(db, url));
      // For a 'GET' request, this line fetches data from a Firestore collection using the getDocs function.

      // eslint-disable-next-line no-case-declarations
      const data = snapshot.docs.map((doc) => ({
        // After fetching the data as a snapshot, this code maps the documents in the snapshot to an array of objects. Each object includes
        id: doc.id,
        ...doc.data(),
      }));
      return { data };
    }

      case "POST": {
          // eslint-disable-next-line no-case-declarations
      const docRef = await addDoc(collection(db, url), body);
      return { data: { id: docRef.id, ...body } };
    }


    case "DELETE":{// eslint-disable-next-line no-case-declarations
      const docDelRef = await deleteDoc(doc(db, url, body));
      return { data: { id: docDelRef } };}


      case "PUT": {
     await updateDoc(doc(db, url, body.id), body);
      return { data: { ...body } };
    }

    default:
      throw new Error(`Unhandled method ${method}`);
  }
};

export const usersApi = createApi({
  tagTypes: ["users"],
  reducerPath: "usersApi",
  baseQuery: firebaseBaseQuery,
  endpoints: (builder) => ({
    // createUser endpoint: It's a mutation that allows creating a new user in the Firebase Firestore collection.
    createUser: builder.mutation({
      query: ({ user }) => ({
        baseUrl: "",
        url: "users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
      // indicates that this mutation will invalidate data with the "users" tag when executed. This is used to update the cache when a new user is added.
    }),
    // getUsers endpoint: It's a query that allows fetching a list of users from the Firebase Firestore collection.
    getUsers: builder.query({
      query: () => ({
        baseUrl: "",
        url: "users",
        method: "GET",
        body: null, // or body: {}
      }),
      providesTags: ["users"],
      // //  indicates that this query provides data with the "users" tag. This tag is used to cache the list of users for efficient data retrieval.
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        baseUrl: "",
        url: "users",
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["users"],
    }),

    updateUser: builder.mutation({
      query: ({ user }) => ({
        baseUrl: "",
        url: "users",
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApi;

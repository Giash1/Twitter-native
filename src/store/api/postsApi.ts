import { createApi } from "@reduxjs/toolkit/query/react";
import { addDoc, doc, collection, getDocs } from "firebase/firestore";

import { db } from "../../../firebase-config";

// asynchronous function firebaseBaseQuery that handles Firebase requests:
const firebaseBaseQuery = async ({ baseUrl, url, method, body }) => {
  switch (method) {
    case "GET": {
      // a switch statement based on the method property. If the method is 'GET', the code inside this block will be executed.

      const snapshot = await getDocs(collection(db, url));
      // For a 'GET' request, this line fetches data from a Firestore collection using the getDocs function.

      const data = snapshot.docs.map((doc) => ({
        // After fetching the data as a snapshot, this code maps the documents in the snapshot to an array of objects. Each object includes
        id: doc.id,
        ...doc.data(),
      }));
      return { data };
    }

    case "POST": {
      const docRef = await addDoc(collection(db, url), body);
      return { data: { id: docRef.id, ...body } };
    }
  }
};
export const postsApi = createApi({
  tagTypes: ["posts"],
  reducerPath: "postsApi",
    baseQuery: firebaseBaseQuery,

    // all the enpoints
  endpoints: (builder) => ({
    // createUser endpoint: It's a mutation that allows creating a new user in the Firebase Firestore collection.
    createPost: builder.mutation({
      query: ({ post }) => ({
        baseUrl: "",
        url: "posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["posts"],
      // indicates that this mutation will invalidate data with the "users" tag when executed. This is used to update the cache when a new user is added.
    }),
    deletePost: builder.mutation({
    query: ({ postId }) => ({
        baseUrl: "",
        url: `posts/${postId}`,
            method: "DELETE",
        body: null
      }),
      invalidatesTags: ["posts"],
      // indicates that this mutation will invalidate data with the "users" tag when executed. This is used to update the cache when a new user is added.
    }),

    getPosts: builder.query({
      query: () => ({
        baseUrl: "",
        url: "posts",
        method: "GET",
        body: null, // or body: {}
      }),
      providesTags: ["posts"],
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery, useDeletePostMutation } = postsApi;

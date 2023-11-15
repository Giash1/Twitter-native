import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { useGetPostsQuery } from "../../../store/api/postsApi";

export const PostList = () => {
  const { data: posts, error } = useGetPostsQuery({});

  if (error) {
    // Handle error
    console.error("Error fetching posts:", error);
    return <Text>Error fetching posts</Text>;
  }

  return (
    <View style={styles.container}>
      {posts && posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Text style={styles.postText}>Text: {item.text}</Text>
              <Text style={styles.postCreatedBy}>
                Created By: {item.createdBy}
              </Text>
              <Text style={styles.postDate}>
                Created Date: {item.createdDate}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text>No posts available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  postContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  postText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postCreatedBy: {
    color: "#555",
  },
  postDate: {
    color: "#888",
  },
});

export default PostList;

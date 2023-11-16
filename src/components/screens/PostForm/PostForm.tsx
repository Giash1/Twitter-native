import { Input, Button } from "@rneui/themed";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { useSelector } from "react-redux";

import { useCreatePostMutation } from "../../../store/api/postsApi";

export const PostForm = (props) => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  const [postText, setPostText] = useState("");
  const [createPost, { isLoading }] = useCreatePostMutation();
  const toast = useToast();

  const handleSubmit = async () => {
    if (postText === "") {
      toast.show("Please enter some text for the post", {
        type: "warning",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
      return;
    }

    const postData = {
      text: postText,
        createdBy: loggedInAs?.id, // Se till att loggedInAs.id är giltig
      createdDate: new Date().toLocaleDateString(),
    };
// adding console.log
    console.log("loggedInAS", "Sunny");
    console.log("Post data being sent:", postData);

    try {
        await createPost({ post: postData });
        // Reset the input field after successfully creating a post
    setPostText("");
      toast.show("Post created successfully!", {
        type: "success",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      toast.show(error.message, { type: "danger" });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Create a Post</Text>
          <Input
            value={postText}
            disabled={isLoading}
            onChangeText={setPostText}
            placeholder="Post text"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
          <Button
            title="Create post"
            disabled={isLoading}
            loading={isLoading}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

// Define a new component and export it
export const MyPostFormComponent = (props) => <PostForm {...props} />;

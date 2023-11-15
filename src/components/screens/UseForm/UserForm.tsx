import { Input, Button } from "@rneui/themed";
import { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useToast } from "react-native-toast-notifications";

import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../../../store/api/usersApi";

export const UserForm = ({ route, navigation }) => {
  const { user: initialUser } = route.params || {};
  const lastNameRef = useRef(null);

  const [firstName, setFirstName] = useState(initialUser?.firstName || "");
  const [lastName, setLastName] = useState(initialUser?.lastName || "");
  const [createUser, { isLoading: createLoading }] = useCreateUserMutation();
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
  const toast = useToast();

  useEffect(() => {
    setFirstName(initialUser?.firstName || "");
    setLastName(initialUser?.lastName || "");
  }, [initialUser]);

  const handleSubmit = async () => {
    try {
      if (initialUser) {
        await updateUser({
          user: {
            id: initialUser.id,
            firstName,
            lastName,
          },
        });
      } else {
        await createUser({
          user: {
            firstName,
            lastName,
          },
        });
      }

      toast.show(`User ${firstName} ${lastName} has been saved!`, {
        type: "success",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
        // Reset the input fields after successful user creation or update
    setFirstName("");
    setLastName("");

      navigation.goBack();
    } catch (error) {
      console.error("Error saving user:", error);
      toast.show(error.message, { type: "danger" });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <Text>{initialUser ? "Edit User" : "Create User"}</Text>
          <Input
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current.focus()}
            blurOnSubmit={false}
            value={firstName}
            disabled={createLoading || updateLoading}
            onChangeText={(text) => setFirstName(text)}
            placeholder="First name"
          />
          <Input
            ref={lastNameRef}
            value={lastName}
            disabled={createLoading || updateLoading}
            returnKeyType="send"
            onSubmitEditing={() => handleSubmit()}
            onChangeText={(text) => setLastName(text)}
            placeholder="Last name"
          />
          <Button
            title={initialUser ? "Save Changes" : "Create user"}
            disabled={createLoading || updateLoading}
            loading={createLoading || updateLoading}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "wheat",
    borderColor: "#60cf4a",
    borderWidth: 1,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
});

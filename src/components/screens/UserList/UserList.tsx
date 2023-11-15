import { ListItem } from "@rneui/themed";
import { View, Text, FlatList, RefreshControl, Button } from "react-native";
import React, { useState, useMemo } from "react";

import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../../store/api/usersApi";

export const UserList = ({ navigation }) => {
    const { data, isLoading, refetch } = useGetUsersQuery({});
    // Use useMemo to sort the users alphabetically
  const sortedUsers = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => a.firstName.localeCompare(b.firstName));
  }, [data]);

  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (user) => {
    try {
      await deleteUser(user.id);
      refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={sortedUsers}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          renderItem={({ item }) => (
            <View>
              <ListItem
                key={item.id}
                onPress={() => {
                  navigation.navigate("UserInfo", { user: item });
                }}
              >
                <ListItem.Content>
                  <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
                </ListItem.Content>
                <Button title="Delete" onPress={() => handleDelete(item)} />
                <Button
                  title="Edit"
                  onPress={() => {
                    navigation.navigate("UserForm", { user: item });
                  }}
                />
              </ListItem>
            </View>
          )}
        />
      )}
    </View>
  );
};

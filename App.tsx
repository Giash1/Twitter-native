import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
//  imports the React library, which is used for building React components.
import { ToastProvider } from "react-native-toast-notifications";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MyPostFormComponent, PostForm } from "./src/components/screens/PostForm/PostForm";
import { PostList } from "./src/components/screens/PostList/PostList";
import { UserForm } from "./src/components/screens/UseForm/UserForm";
import { UserInfo } from "./src/components/screens/UserInfo/UserInfo";
import { UserList } from "./src/components/screens/UserList/UserList";
import { store, persistor } from "./src/store/store/store";
import i18n from "./i18n";
import { Settings } from "./src/components/screens/Settings/Settings"
import { I18nextProvider } from "react-i18next";
const UserListStack = createNativeStackNavigator();
// navigator named UserListStack using the createNativeStackNavigator function is used to manage navigation within the UserList section of my app.
const UserListScreen = () => {
  // functional component called UserListScreen.
  return (
    <UserListStack.Navigator>
      <UserListStack.Screen name="UserList" component={UserList} />
      <UserListStack.Screen name="UserInfo" component={UserInfo} />
      <UserListStack.Screen name="UserForm" component={UserForm} />
      <UserListStack.Screen name="PostForm" component={PostForm} />
      <UserListStack.Screen name="PostList" component={PostList} />
      <UserListStack.Screen name="Settings" component={Settings} />
    </UserListStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
// a bottom tab navigator named Tab using the createBottomTabNavigator function is used to manage navigation within my app.
const NavigationWrapper = () => {
  // functional component named NavigationWrapper responsible for configuring the main navigation structure of the app.
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  // useSelector hook to access the loggedInAs information from the Redux store that is related to the logged-in user.
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="UserListScreen"
          component={UserListScreen}
          options={{ headerShown: false }}
        />

        <Tab.Screen
          name="UserForm"
          component={UserForm}
          options={{ headerShown: true }}
          // options for this tab, including showing the header.
        />
        <Tab.Screen name="PostList" component={PostList} />
        <Tab.Screen name="Settings" component={Settings} />
        {loggedInAs && (
          // render a Tab.Screen based on whether a user is logged in.
          <Tab.Screen
            name="UserInfo"
            component={UserInfo}
            options={{
              headerShown: true,
              title: `${loggedInAs.firstName} ${loggedInAs.lastName}`,
            }}
          />
        )}
        <Tab.Screen
          name="PostForm"
                  component={MyPostFormComponent}
                //   new component from PostForm
          initialParams={{ loggedInAs }}
          options={{
            headerShown: true,
            title: "Create Post",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                   <I18nextProvider i18n={i18n}>
                  <NavigationWrapper />
                  </I18nextProvider>
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
}

export default App;

import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Text } from "react-native";

const UserList: FunctionComponent = () => {
  const screenState = useSelector((state: RootState) => state.userList);
  useSelector((state) => console.log(state));
  return (
    <>
      {screenState.error && <Text>test</Text>}
      {screenState.loading && <Text>loding</Text>}
    </>
  );
};

export default UserList;

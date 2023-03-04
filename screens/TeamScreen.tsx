import { View, Text, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Group } from "../store/slices/groupSlice";
import { useEffect } from "react";
import { getGroupFromDatabase } from "../utils/http/httpGroup";

const TeamScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getGroupFromDatabase(user.user.token, dispatch);
  }, []);

  const group = useSelector((state: RootState) => state.group);
  const user = useSelector((state: RootState) => state.user);

  console.log("In TeamScreen ", group);

  return (
    <SafeAreaView>
      <Text>prout</Text>
      <Text>{user.user.name}</Text>
    </SafeAreaView>
  );
};
export default TeamScreen;

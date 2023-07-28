import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../constants/routes";
import { RootState } from "../store/store";
import { getGroupFromDatabase } from "../store/slices/groupSlice";
import { fetchDefaultTasksFromDatabase } from "../store/slices/defaultTasksSlice";
import { fetchTasksFromDatabase } from "../store/slices/tasksSlice";
import {
  fetchDefaultGagesFromDatabase,
  fetchGagesFromDatabase,
} from "../store/slices/gagesSlice";
import { Title } from "../components";
import { getValueFor } from "../utils/secureStore";

const LoadingScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const { isGroupLoaded, group } = useSelector(
    (state: RootState) => state.group,
  );
  const { areDefaultTasksFetched } = useSelector(
    (state: RootState) => state.defaultTasks,
  );
  const { areTasksFetched } = useSelector((state: RootState) => state.tasks);
  const { areGagesFetched } = useSelector((state: RootState) => state.gages);
  const { areDefaultGagesFetched } = useSelector(
    (state: RootState) => state.gages,
  );
  const { isUserFetched, user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchDefaultTasksFromDatabase());
    dispatch(fetchDefaultGagesFromDatabase());

    if (!group) {
      navigation.navigate(ROUTES.REGISTER);
    } else {
      const fetchToken = async () => {
        const token = await getValueFor("token");
        return token ? token : false;
      };

      const checkToken = async () => {
        const token = await fetchToken();
        token
          ? navigation.navigate(ROUTES.HOME)
          : navigation.navigate(ROUTES.REGISTER);
      };

      checkToken();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Title titleType="h1">Loading...</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;

import { PersistedResult } from "@/types/PersistedResult";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStatistics = async (): Promise<PersistedResult[]> => {
  const statistics = await AsyncStorage.getItem("statistics");

  if (!statistics) return [];

  return JSON.parse(statistics);
};

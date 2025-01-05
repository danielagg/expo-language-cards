import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistedResult } from "@/types/PersistedResult";
import { Translation } from "@/types/Translation";

export const saveResult = async (result: boolean, word: Translation) => {
  const statistics = await AsyncStorage.getItem("statistics");

  if (!statistics) {
    await captureNewStatistics(result, word);
    return;
  }

  const statisticsEntries: PersistedResult[] = JSON.parse(statistics);

  const foundEntry = statisticsEntries.find((entry) => entry.nl == word.nl);

  if (foundEntry) {
    foundEntry.successCount += result ? 1 : 0;
    foundEntry.failureCount += result ? 0 : 1;

    await AsyncStorage.setItem("statistics", JSON.stringify(statisticsEntries));
  } else {
    statisticsEntries.push({
      nl: word.nl,
      en: word.en,
      successCount: result ? 1 : 0,
      failureCount: result ? 0 : 1,
    });

    await AsyncStorage.setItem("statistics", JSON.stringify(statisticsEntries));
  }
};

const captureNewStatistics = async (result: boolean, word: Translation) => {
  const newStatistics: PersistedResult[] = [];
  newStatistics.push({
    nl: word.nl,
    en: word.en,
    successCount: result ? 1 : 0,
    failureCount: result ? 0 : 1,
  });

  await AsyncStorage.setItem("statistics", JSON.stringify(newStatistics));
};

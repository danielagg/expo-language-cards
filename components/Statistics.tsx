import { View, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { getStatistics } from "@/utils/getStatistics";
import { useEffect, useState } from "react";
import { PersistedResult } from "@/types/PersistedResult";

type Props = {
  onRefresh: () => void;
};

export default function Statistics() {
  const [topFiveIncorrectGuesses, setTopFiveIncorrectGuesses] = useState<
    PersistedResult[]
  >([]);

  const onGetLatestData = async () => {
    const statistics = await getStatistics();

    const result = statistics
      .sort((a, b) => b.failureCount - a.failureCount)
      .slice(0, 5);

    setTopFiveIncorrectGuesses(result);
  };

  useEffect(() => {
    onGetLatestData();

    const intervalId = setInterval(() => {
      onGetLatestData();
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: 40,
        paddingTop: 40,
      }}
    >
      <Text style={{ color: Colors.text, fontSize: 22, fontWeight: "bold" }}>
        Most incorrect guesses
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          paddingTop: 12,
        }}
      >
        {topFiveIncorrectGuesses.map((word) => {
          return (
            <Text key={word.nl} style={{ color: Colors.text, fontSize: 14 }}>
              <Text style={{ fontWeight: "bold" }}>
                • {word.nl} - {word.en.join(", ")}:
              </Text>{" "}
              <Text style={{ color: "#64748b" }}>
                {word.failureCount} incorrect guess
              </Text>
            </Text>
          );
        })}
      </View>
    </View>
  );
}

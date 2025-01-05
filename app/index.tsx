import FailureFeedback from "@/components/FailureFeedback";
import LanguageCard from "@/components/LanguageCard";
import SuccessFeedback from "@/components/SuccessFeedback";
import { Colors } from "@/constants/Colors";
import { getTranslation } from "@/utils/getTranslations";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
  const [currentWord, setCurrentWord] = useState(getTranslation());

  console.log(currentWord);

  const [isSuccessFeedbackVisible, setIsSuccessFeedbackVisible] =
    useState(false);

  const [isFailureFeedbackVisible, setIsFailureFeedbackVisible] =
    useState(false);

  const onSubmitTranslation = (input: string) => {
    const parsedInput = input.toLowerCase().trim();

    if (currentWord.en.includes(parsedInput)) {
      setIsSuccessFeedbackVisible(true);
    } else {
      setIsFailureFeedbackVisible(true);
    }

    setTimeout(() => {
      setIsSuccessFeedbackVisible(false);
      setIsFailureFeedbackVisible(false);

      setCurrentWord(getTranslation());
    }, 2000);
  };

  const isAnyFeedbackOpen =
    isSuccessFeedbackVisible || isFailureFeedbackVisible;

  return (
    <>
      <Stack.Screen />
      {isSuccessFeedbackVisible && (
        <SuccessFeedback
          word={currentWord.nl}
          correctTranslations={currentWord.en}
        />
      )}
      {isFailureFeedbackVisible && (
        <FailureFeedback
          word={currentWord.nl}
          correctTranslations={currentWord.en}
        />
      )}

      {!isAnyFeedbackOpen && (
        <View style={styles.container}>
          <View style={styles.cardOuterContainer}>
            <View style={styles.absoluteBackground} />
            <View style={styles.cardContainer}>
              <LanguageCard
                word={currentWord.nl}
                phonetic={currentWord.phoneticNl}
                onSubmit={onSubmitTranslation}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardOuterContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  cardContainer: {
    paddingTop: 80,
    paddingHorizontal: 40,
    width: "100%",
  },
  absoluteBackground: {
    position: "absolute",
    backgroundColor: Colors.indigo,
    opacity: 0.5,
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});

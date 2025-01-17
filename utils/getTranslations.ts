import translations from "@/assets/translations/data.json";
import { Translation } from "@/types/Translation";

export const getTranslation = (previousNlWord?: string): Translation => {
  // random number between 0 and count-1:
  let randomIndex = Math.floor(Math.random() * (translations.length - 1));

  if (previousNlWord) {
    while (translations[randomIndex].nl === previousNlWord) {
      randomIndex = Math.floor(Math.random() * (translations.length - 1));
    }
  }

  return translations[randomIndex];
};

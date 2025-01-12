import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const nlWords = sqliteTable("dutch-words", {
  id: text("id").primaryKey(),
  nl: text("nl").notNull(),
  phoneticNl: text("phoneticNl").notNull(),
});

export const enTranslations = sqliteTable("english-translations", {
  id: text("id").primaryKey(),
  en: text("en").notNull(),
  nlId: text("nlId")
    .notNull()
    .references(() => nlWords.id),
});

export const statistics = sqliteTable("statistics", {
  id: text("id").primaryKey(),
  successCount: integer("successCount").notNull(),
  failureCount: integer("failureCount").notNull(),
  nlId: text("nlId")
    .notNull()
    .references(() => nlWords.id),
});

export type DutchWord = typeof nlWords.$inferSelect;
export type EnglishTranslation = typeof enTranslations.$inferSelect;

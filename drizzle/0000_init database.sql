CREATE TABLE `english-translations` (
	`id` text PRIMARY KEY NOT NULL,
	`en` text NOT NULL,
	`nlId` text NOT NULL,
	FOREIGN KEY (`nlId`) REFERENCES `dutch-words`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `dutch-words` (
	`id` text PRIMARY KEY NOT NULL,
	`nl` text NOT NULL,
	`phoneticNl` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `statistics` (
	`id` text PRIMARY KEY NOT NULL,
	`successCount` integer NOT NULL,
	`failureCount` integer NOT NULL,
	`nlId` text NOT NULL,
	FOREIGN KEY (`nlId`) REFERENCES `dutch-words`(`id`) ON UPDATE no action ON DELETE no action
);

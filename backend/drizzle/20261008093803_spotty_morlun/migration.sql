ALTER TABLE "user" ADD COLUMN "username" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_key" UNIQUE("username");
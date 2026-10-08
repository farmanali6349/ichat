ALTER TABLE "message" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET DATA TYPE varchar(255) USING "email"::varchar(255);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "full_name" SET DATA TYPE varchar(100) USING "full_name"::varchar(100);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET NOT NULL;
CREATE TABLE "records" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"user_id" uuid NOT NULL,
	"source_type" text DEFAULT 'in_person' NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"notes_internal" text,
	"current_segment_index" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"duration_seconds" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

ALTER TABLE
	"records"
ADD
	CONSTRAINT "records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
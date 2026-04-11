CREATE TABLE "recipients" (
	"id" text PRIMARY KEY NOT NULL,
	"names" text NOT NULL,
	"lastNames" text NOT NULL,
	"dni" text NOT NULL,
	"email" text,
	"address" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"notes" text,
	"primary_phone_number" text,
	"secondary_phone_number" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "recipients_dni_unique" UNIQUE("dni")
);

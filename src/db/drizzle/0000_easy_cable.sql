CREATE TYPE "public"."message_category" AS ENUM('Dúvida', 'Reclamação', 'Solicitação');--> statement-breakpoint
CREATE TYPE "public"."message_sentiment" AS ENUM('Positivo', 'Neutro', 'Negativo');--> statement-breakpoint
CREATE TYPE "public"."message_urgency" AS ENUM('Baixa', 'Média', 'Alta');--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_name" text,
	"original_message" text NOT NULL,
	"category" "message_category" NOT NULL,
	"urgency" "message_urgency" NOT NULL,
	"sentiment" "message_sentiment" NOT NULL,
	"department" text NOT NULL,
	"summary" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

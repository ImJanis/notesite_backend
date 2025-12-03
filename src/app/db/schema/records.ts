import { relations, sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  integer,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";

import { timestamps } from "../helper";
import { users } from "./auth-schema";

export const records = pgTable("records", {
  id: uuid("id").default(sql`uuidv7()`).primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references((): AnyPgColumn => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  sourceType: text("source_type").notNull().default("in_person"), //phone_call, in_person, visio, other
  title: text("title").notNull(),
  description: text("description"),
  notesInternal: text("notes_internal"),

  currentSegmentIndex: integer("current_segment_index").notNull().default(0),
  status: text("status").notNull().default("created"), // created, recording, paused, completed, cancelled
  durationSeconds: integer("duration_seconds").notNull().default(0),

  ...timestamps,
});

export const recordsRelations = relations(records, ({ one }) => ({
  user: one(users, {
    fields: [records.userId],
    references: [users.id],
  }),
}));

import { relations, sql } from "drizzle-orm";
import {
  type AnyPgColumn,
  index,
  integer,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";

import { timestamps } from "../helper";
import { users } from "./auth-schema";

export const records = pgTable(
  "records",
  {
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
  },

  (table) => [
    index("search_index").using(
      "gin",
      sql`(
          setweight(to_tsvector('simple', ${table.title}), 'A') ||
          setweight(to_tsvector('simple', ${table.description}), 'B') ||
          setweight(to_tsvector('simple', ${table.notesInternal}), 'C')
      )`,
    ),
  ],
);

export const recordsRelations = relations(records, ({ one }) => ({
  user: one(users, {
    fields: [records.userId],
    references: [users.id],
  }),
}));

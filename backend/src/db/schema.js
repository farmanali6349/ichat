import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { defineRelations } from "drizzle-orm";

const timeStamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
};
// User Table
export const userTable = pgTable("user", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  clerkId: text("clerk_id").unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  profilePic: text("profile_pic").default(""),
  ...timeStamps,
});

// Message Table
export const messageTable = pgTable("message", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  senderId: integer("sender_id")
    .notNull()
    .references(() => userTable.id),
  receiverId: integer("receiver_id")
    .notNull()
    .references(() => userTable.id),
  text: text("text"),
  image: text("image"),
  video: text("video"),
  ...timeStamps,
});

export const relations = defineRelations({ userTable, messageTable }, (r) => ({
  messageTable: {
    sender: r.one.userTable({
      from: r.messageTable.senderId,
      to: r.userTable.id,
    }),

    receiver: r.one.userTable({
      from: r.messageTable.receiverId,
      to: r.userTable.id,
    }),
  },
}));

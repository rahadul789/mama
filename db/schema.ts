import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";
import { sql } from "drizzle-orm";

export const role = pgEnum("role", ["user", "admin"]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  email: varchar().notNull(),
  password: varchar().notNull(),
  role: role().notNull().default("user"),
  ...timestamps,
});

export const sessions = pgTable("sessions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  // session: varchar().notNull(),
  userId: integer().notNull(),
  expiresAt: timestamp().notNull(),
  ...timestamps,
});

export const home = pgTable("home", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  subTitle: varchar().notNull(),
  buttonText: varchar().notNull(),
  features: varchar()
    .array()
    .notNull()
    .default(sql`ARRAY[]::varchar[]`),
  ...timestamps,
});

export const vision = pgTable("vision", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  heading: varchar().notNull(),

  solutionTitle: varchar().notNull(),
  solutionDescription: varchar().notNull(),

  visionTitle: varchar().notNull(),
  visionDescription: varchar().notNull(),

  impactTitle: varchar().notNull(),
  impactDescription: varchar().notNull(),
  ...timestamps,
});

export const services = pgTable("services", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  subTitle: varchar().notNull(),
  ...timestamps,
});

export const serviceItems = pgTable("service_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  serviceId: integer()
    .notNull()
    .references(() => services.id, { onDelete: "cascade" }),
  title: varchar().notNull(),
  description: varchar().notNull(),
  ...timestamps,
});

export const career = pgTable("career", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  heroTitle: varchar().notNull(),
  title: varchar().notNull(),
  subTitle: varchar().notNull(),
  email: varchar().notNull(),
  ...timestamps,
});

export const jobs = pgTable("jobs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  position: varchar().notNull(),
  type: varchar().notNull(),
  salaryRange: varchar().notNull(),
  location: varchar().notNull(),
  summary: varchar().notNull(),
  keyResponsibilities: varchar()
    .array()
    .notNull()
    .default(sql`ARRAY[]::varchar[]`),
  qualifications: varchar()
    .array()
    .notNull()
    .default(sql`ARRAY[]::varchar[]`),
  benefits: varchar()
    .array()
    .notNull()
    .default(sql`ARRAY[]::varchar[]`),
  ...timestamps,
});

export const partner = pgTable("partner", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  heroTitle: varchar().notNull(),
  heroDescription: varchar().notNull(),
  title: varchar().notNull(),
  ...timestamps,
});

export const partnerBenefits = pgTable("partner_benefits", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  description: varchar().notNull(),
  ...timestamps,
});

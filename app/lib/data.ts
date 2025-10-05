"use server";

import { db } from "@/db";
import {
  career,
  footer,
  home,
  jobs,
  partner,
  partnerBenefits,
  serviceItems,
  services,
  usersTable,
  vision,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserDetails = async (id: number) => {
  const users = await db.select().from(usersTable).where(eq(usersTable.id, id));
  return users;
};

export const getHomeDetails = async () => {
  const [item] = await db.select().from(home);
  return item;
};

export const getVisionDetails = async () => {
  const [item] = await db.select().from(vision);
  return item;
};

export const getServiccesDetails = async () => {
  const [item] = await db.select().from(services);
  return item;
};

export const getCareerDetails = async () => {
  const [item] = await db.select().from(career);
  return item;
};
export const getFooterDetails = async () => {
  const [item] = await db.select().from(footer);
  return item;
};

export const getAllServices = async () => {
  const allServices = await db
    .select()
    .from(serviceItems)
    .orderBy(serviceItems.id);
  return allServices;
};

export const getAllJobs = async () => {
  const allJobs = await db.select().from(jobs).orderBy(jobs.id);
  return allJobs;
};

export const getPartnerDetails = async () => {
  const [item] = await db.select().from(partner);
  return item;
};

export const getPartnerBenefits = async () => {
  const items = await db.select().from(partnerBenefits);
  return items;
};

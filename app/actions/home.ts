"use server";

import { HomeFormState, homeFormSchema } from "@/app/lib/definitions";
import { db } from "@/db";
import { home } from "@/db/schema";

export async function createHome(state: HomeFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = homeFormSchema.safeParse({
    title: formData.get("title"),
    subTitle: formData.get("subTitle"),
    buttonText: formData.get("buttonText"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, subTitle, buttonText } = validatedFields.data;

  // Call the provider or db to create a user...
  const data = await db
    .insert(home)
    .values({
      title,
      subTitle,
      buttonText,
    })
    .returning({ id: home.id });

  const user = data[0];

  if (!user) {
    return {
      message: "An error occurred while updating your information.",
    };
  }
}

"use server";

import {
  AddJobFormSchema,
  AddJobFormState,
  AddPartnerBenefitFormSchema,
  AddPartnerBenefitFormState,
  AddServiceFormSchema,
  AddServiceFormState,
  BenefitItemFormState,
  BenefitsFormState,
  CareerFormState,
  DeleteBenefitFormSchema,
  DeleteBenefitFormState,
  DeleteJobFormSchema,
  DeleteJobFormState,
  DeleteServiceFormSchema,
  DeleteServiceFormState,
  FooterFormState,
  HomeFormState,
  JobTypeFormState,
  KeyResponsibilitiesFormState,
  LocationFormState,
  PartnerFormState,
  PositionFormState,
  QualificationsFormState,
  SalaryFormState,
  ServiceFormState,
  ServiceItemFormState,
  SummaryFormState,
  VisionFormState,
  benefitItemFormSchema,
  benefitsFormSchema,
  careerFormSchema,
  footerFormSchema,
  homeFormSchema,
  jobTypeFormSchema,
  keyResponsibilitiesFormSchema,
  locationFormSchema,
  partnerFormSchema,
  positionFormSchema,
  qualificationsFormSchema,
  salaryFormSchema,
  serviceFormSchema,
  serviceItemFormSchema,
  summaryFormSchema,
  visionFormSchema,
} from "@/app/lib/definitions";
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
  vision,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateHome(state: HomeFormState, formData: FormData) {
  // Parse করে array বানানো
  let features: string[] = [];
  const rawFeatures = formData.get("features");

  if (rawFeatures) {
    try {
      features = JSON.parse(rawFeatures as string); // string থেকে array এ রূপান্তর
    } catch (err) {
      console.error("Failed to parse features:", err);
    }
  }

  // Validate form fields
  const validatedFields = homeFormSchema.safeParse({
    title: formData.get("title"),
    subTitle: formData.get("subTitle"),
    buttonText: formData.get("buttonText"),
    features,
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
  await db.update(home).set({ title, subTitle, buttonText, features });

  revalidatePath("/dashboard/home");

  return {
    success: true,
  };
}

export async function updateVision(state: VisionFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = visionFormSchema.safeParse({
    heading: formData.get("heading"),
    solutionTitle: formData.get("solutionTitle"),
    solutionDescription: formData.get("solutionDescription"),
    visionTitle: formData.get("visionTitle"),
    visionDescription: formData.get("visionDescription"),
    impactTitle: formData.get("impactTitle"),
    impactDescription: formData.get("impactDescription"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    heading,
    solutionTitle,
    solutionDescription,
    visionTitle,
    visionDescription,
    impactTitle,
    impactDescription,
  } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.update(vision).set({
    heading,
    solutionTitle,
    solutionDescription,
    visionTitle,
    visionDescription,
    impactTitle,
    impactDescription,
  });

  revalidatePath("/dashboard/vision");

  return {
    success: true,
  };
}

export async function updateService(
  state: ServiceFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = serviceFormSchema.safeParse({
    title: formData.get("title"),
    subTitle: formData.get("subTitle"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, subTitle } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.update(services).set({
    title,
    subTitle,
  });

  revalidatePath("/dashboard/services");

  return {
    success: true,
  };
}

export async function updateServiceItem(
  state: ServiceItemFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = serviceItemFormSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description, id } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(serviceItems)
    .set({
      title,
      description,
    })
    .where(eq(serviceItems.id, id));

  revalidatePath("/dashboard/services");

  return {
    success: true,
  };
}

export async function addService(
  state: AddServiceFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = AddServiceFormSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.insert(serviceItems).values({
    title,
    description,
    serviceId: 1,
  });

  revalidatePath("/dashboard/services");

  return {
    success: true,
  };
}

export async function deleteService(
  state: DeleteServiceFormState,
  formData: FormData
) {
  const validatedFields = DeleteServiceFormSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id } = validatedFields.data;

  await db.delete(serviceItems).where(eq(serviceItems.id, id));

  revalidatePath("/dashboard/services");

  return { success: true };
}

export async function updateCareer(state: CareerFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = careerFormSchema.safeParse({
    heroTitle: formData.get("heroTitle"),
    title: formData.get("title"),
    subTitle: formData.get("subTitle"),
    email: formData.get("email"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { heroTitle, title, subTitle, email } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.update(career).set({
    heroTitle,
    title,
    subTitle,
    email,
  });

  revalidatePath("/dashboard/career");

  return {
    success: true,
  };
}

function getStringArray(formData: FormData, name: string) {
  // Inputs are named like keyResponsibilities[] / qualifications[]
  const raw = formData.getAll(`${name}[]`).map(String);
  // Trim & drop blanks (so a single empty input won't fail validation)
  return raw.map((s) => s.trim()).filter((s) => s.length > 0);
}

export async function addJob(state: AddJobFormState, formData: FormData) {
  // Build candidate payload
  const payload = {
    position: formData.get("position"),
    type: formData.get("type"),
    salaryRange: formData.get("salaryRange"),
    location: formData.get("location"),
    summary: formData.get("summary"),
    keyResponsibilities: getStringArray(formData, "keyResponsibilities"),
    qualifications: getStringArray(formData, "qualifications"),
    benefits: getStringArray(formData, "benefits"),
  };

  // Validate form fields
  const validated = AddJobFormSchema.safeParse(payload);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const {
    position,
    type,
    salaryRange,
    location,
    summary,
    keyResponsibilities,
    qualifications,
    benefits,
  } = validated.data;

  await db.insert(jobs).values({
    position,
    type,
    salaryRange,
    location,
    summary,
    keyResponsibilities, // varchar[]
    qualifications, // varchar[]
    benefits,
  });

  revalidatePath("/dashboard/career"); // ⬅️ adjust to your route
  return { success: true };
}

// JOB

export async function updatePosition(
  state: PositionFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = positionFormSchema.safeParse({
    id: formData.get("id"),
    position: formData.get("position"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, position } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      position,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");

  return {
    success: true,
  };
}

export async function updateJobType(
  state: JobTypeFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = jobTypeFormSchema.safeParse({
    id: formData.get("id"),
    jobType: formData.get("jobType"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, jobType } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      type: jobType,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");

  return {
    success: true,
  };
}

export async function updateSalary(state: SalaryFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = salaryFormSchema.safeParse({
    id: formData.get("id"),
    salaryRange: formData.get("salaryRange"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, salaryRange } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      salaryRange,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");

  return {
    success: true,
  };
}

export async function updateLocation(
  state: LocationFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = locationFormSchema.safeParse({
    id: formData.get("id"),
    location: formData.get("location"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, location } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      location,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");

  return {
    success: true,
  };
}

export async function updateSummary(
  state: SummaryFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = summaryFormSchema.safeParse({
    id: formData.get("id"),
    summary: formData.get("summary"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, summary } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(jobs)
    .set({
      summary,
    })
    .where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");

  return {
    success: true,
  };
}

export async function updateKeyResponsibilities(
  state: KeyResponsibilitiesFormState,
  formData: FormData
): Promise<KeyResponsibilitiesFormState> {
  // Pull repeated fields from FormData
  const rawList = formData.getAll("keyResponsibilities[]");

  // Normalize: cast to string, trim, drop empties, de-dupe while preserving order
  const seen = new Set<string>();
  const normalized = rawList
    .map((v) => (typeof v === "string" ? v : ""))
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter((s) => {
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });

  // Validate
  const validated = keyResponsibilitiesFormSchema.safeParse({
    id: formData.get("id"),
    keyResponsibilities: normalized,
  });

  if (!validated.success) {
    console.log(validated.error);
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { id, keyResponsibilities } = validated.data;

  // Persist (works if column is Postgres text[] or jsonb<string[]>)
  await db.update(jobs).set({ keyResponsibilities }).where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");

  return { success: true };
}

export async function updateQualifications(
  state: QualificationsFormState,
  formData: FormData
): Promise<QualificationsFormState> {
  // Pull repeated fields from FormData
  const rawList = formData.getAll("qualifications[]");

  // Normalize: cast to string, trim, drop empties, de-dupe while preserving order
  const seen = new Set<string>();
  const normalized = rawList
    .map((v) => (typeof v === "string" ? v : ""))
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter((s) => {
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });

  // Validate
  const validated = qualificationsFormSchema.safeParse({
    id: formData.get("id"),
    qualifications: normalized,
  });

  if (!validated.success) {
    console.log(validated.error);
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { id, qualifications } = validated.data;

  // Persist (works if column is Postgres text[] or jsonb<string[]>)
  await db.update(jobs).set({ qualifications }).where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");

  return { success: true };
}

export async function updateBenefits(
  state: BenefitsFormState,
  formData: FormData
): Promise<BenefitsFormState> {
  // Pull repeated fields from FormData
  const rawList = formData.getAll("benefits[]");

  // Normalize: cast to string, trim, drop empties, de-dupe while preserving order
  const seen = new Set<string>();
  const normalized = rawList
    .map((v) => (typeof v === "string" ? v : ""))
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter((s) => {
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });

  // Validate
  const validated = benefitsFormSchema.safeParse({
    id: formData.get("id"),
    qualifications: normalized,
  });

  if (!validated.success) {
    console.log(validated.error);
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { id, benefits } = validated.data;

  // Persist (works if column is Postgres text[] or jsonb<string[]>)
  await db.update(jobs).set({ benefits }).where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");

  return { success: true };
}

export async function deleteJob(state: DeleteJobFormState, formData: FormData) {
  const validatedFields = DeleteJobFormSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id } = validatedFields.data;

  await db.delete(jobs).where(eq(jobs.id, id));

  revalidatePath("/dashboard/career");

  return { success: true };
}

export async function addBenefits(
  state: AddPartnerBenefitFormState,
  formData: FormData
) {
  // Build candidate payload
  const payload = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  // Validate form fields
  const validated = AddPartnerBenefitFormSchema.safeParse(payload);

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { title, description } = validated.data;

  await db.insert(partnerBenefits).values({
    title,
    description,
  });

  revalidatePath("/dashboard/partner"); // ⬅️ adjust to your route
  return { success: true };
}

export async function updatePartner(
  state: PartnerFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = partnerFormSchema.safeParse({
    heroTitle: formData.get("heroTitle"),
    heroDescription: formData.get("heroDescription"),
    title: formData.get("title"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { heroTitle, title, heroDescription } = validatedFields.data;

  // Call the provider or db to create a user...
  await db.update(partner).set({
    heroTitle,
    title,
    heroDescription,
  });

  revalidatePath("/dashboard/partner");

  return {
    success: true,
  };
}

export async function updateBenefitItem(
  state: BenefitItemFormState,
  formData: FormData
) {
  // Validate form fields
  const validatedFields = benefitItemFormSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description, id } = validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(partnerBenefits)
    .set({
      title,
      description,
    })
    .where(eq(partnerBenefits.id, id));

  revalidatePath("/dashboard/partner");

  return {
    success: true,
  };
}

export async function deleteBenefit(
  state: DeleteBenefitFormState,
  formData: FormData
) {
  const validatedFields = DeleteBenefitFormSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id } = validatedFields.data;

  await db.delete(partnerBenefits).where(eq(partnerBenefits.id, id));

  revalidatePath("/dashboard/partner");

  return { success: true };
}

export async function updateFooter(state: FooterFormState, formData: FormData) {
  // Validate form fields
  const validatedFields = footerFormSchema.safeParse({
    title: formData.get("title"),
    address: formData.get("address"),
    email: formData.get("email"),
    copyright: formData.get("copyright"),
    facebook: formData.get("facebook"),
    linkedIn: formData.get("linkedIn"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, address, email, copyright, facebook, linkedIn } =
    validatedFields.data;

  // Call the provider or db to create a user...
  await db
    .update(footer)
    .set({ title, address, email, copyright, facebook, linkedIn });

  revalidatePath("/dashboard/footer");

  return {
    success: true,
  };
}

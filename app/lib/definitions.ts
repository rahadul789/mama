import { Copyright } from "lucide-react";
import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(2, { message: "Be at least 8 characters long" })
    // .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    // .regex(/[0-9]/, { message: "Contain at least one number." })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: "Contain at least one special character.",
    // })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export interface SessionPayload {
  userId: number; // unique identifier for user
  email?: string; // user’s email
  role?: string; // optional role (admin, user, etc.)
  name?: string; // optional display name
  iat?: number; // issued at (set automatically by jose)
  exp?: number; // expiration time (set automatically by jose)
  expiresAt: Date;
  sessionId?: Date;
  [key: string]: unknown; // allow extension if needed
}

export const homeFormSchema = z.object({
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  subTitle: z
    .string()
    .min(1, { message: "Sub Title can not be empty." })
    .trim(),
  buttonText: z
    .string()
    .min(1, { message: "Button Text can not be empty." })
    .trim(),
  features: z
    .array(z.string().trim().min(1, "Feature cannot be empty"))
    .min(1, "Features cannot be empty"),
});

export type HomeFormState =
  | {
      errors?: {
        title?: string[];
        subTitle?: string[];
        buttonText?: string[];
        features?: string[];
      };
      message?: string;
    }
  | undefined;

export const visionFormSchema = z.object({
  heading: z.string().min(1, { message: "Heading can not be empty." }).trim(),
  solutionTitle: z
    .string()
    .min(1, { message: "Title can not be empty." })
    .trim(),
  solutionDescription: z
    .string()
    .min(1, { message: "Description can not be empty." })
    .trim(),

  visionTitle: z
    .string()
    .min(1, { message: "Description can not be empty." })
    .trim(),
  visionDescription: z
    .string()
    .min(1, { message: "Description can not be empty." })
    .trim(),

  impactTitle: z.string().min(1, { message: "Title can not be empty." }).trim(),
  impactDescription: z
    .string()
    .min(1, { message: "Description can not be empty." })
    .trim(),
});

export type VisionFormState =
  | {
      errors?: {
        heading?: string[];
        solutionTitle?: string[];
        solutionDescription?: string[];
        visionTitle?: string[];
        visionDescription?: string[];
        impactTitle?: string[];
        impactDescription?: string[];
      };
      message?: string;
    }
  | undefined;

export const serviceFormSchema = z.object({
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  subTitle: z
    .string()
    .min(1, { message: "Sub title can not be empty." })
    .trim(),
});

export type ServiceFormState =
  | {
      errors?: {
        title?: string[];
        subTitle?: string[];
      };
      message?: string;
    }
  | undefined;

export const serviceItemFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  description: z
    .string()
    .min(1, { message: "Description can not be empty." })
    .trim(),
});

export type ServiceItemFormState =
  | {
      errors?: {
        id?: string[];
        title?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;

export const AddServiceFormSchema = z.object({
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  description: z
    .string()
    .min(1, { message: "Description can not be empty." })
    .trim(),
});

export type AddServiceFormState =
  | {
      errors?: {
        title?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;

export const DeleteServiceFormSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type DeleteServiceFormState =
  | {
      errors?: { id?: string[] };
      message?: string;
      success?: boolean;
    }
  | undefined;

export const careerFormSchema = z.object({
  heroTitle: z
    .string()
    .min(1, { message: "Hero Title can not be empty." })
    .trim(),
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  email: z.string().min(1, { message: "Email can not be empty." }).trim(),
  subTitle: z
    .string()
    .min(1, { message: "Sub title can not be empty." })
    .trim(),
});

export type CareerFormState =
  | {
      errors?: {
        heroTitle?: string[];
        title?: string[];
        subTitle?: string[];
        email?: string[];
      };
      message?: string;
    }
  | undefined;

export const AddJobFormSchema = z.object({
  position: z.string().min(1, { message: "Position cannot be empty." }).trim(),
  type: z.string().min(1, { message: "Type cannot be empty." }).trim(),
  salaryRange: z
    .string()
    .min(1, { message: "Salary range cannot be empty." })
    .trim(),
  location: z.string().min(1, { message: "Location cannot be empty." }).trim(),
  summary: z.string().min(1, { message: "Summary cannot be empty." }).trim(),
  // Arrays are validated after we normalize from FormData.getAll(...)
  keyResponsibilities: z.array(z.string().min(1).trim()).default([]),
  qualifications: z.array(z.string().min(1).trim()).default([]),
  benefits: z.array(z.string().min(1).trim()).default([]),
});

export type AddJobFormState =
  | {
      errors?: {
        position?: string[];
        type?: string[];
        salaryRange?: string[];
        location?: string[];
        summary?: string[];
        keyResponsibilities?: string[];
        qualifications?: string[];
        benefits?: string[];
      };
      messages?: boolean;
    }
  | undefined;

// JOB
export const positionFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  position: z.string().min(1, { message: "Position can not be empty." }).trim(),
});

export type PositionFormState =
  | {
      errors?: {
        id?: string[];
        position?: string[];
      };
      message?: string;
    }
  | undefined;

export const jobTypeFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  jobType: z.string().min(1, { message: "Job type can not be empty." }).trim(),
});

export type JobTypeFormState =
  | {
      errors?: {
        id?: string[];
        jobType?: string[];
      };
      message?: string;
    }
  | undefined;

export const salaryFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  salaryRange: z
    .string()
    .min(1, { message: "Salary can not be empty." })
    .trim(),
});

export type SalaryFormState =
  | {
      errors?: {
        id?: string[];
        salaryRange?: string[];
      };
      message?: string;
    }
  | undefined;

export const locationFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  location: z.string().min(1, { message: "Location can not be empty." }).trim(),
});

export type LocationFormState =
  | {
      errors?: {
        id?: string[];
        location?: string[];
      };
      message?: string;
    }
  | undefined;

export const summaryFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  summary: z.string().min(1, { message: "Summary can not be empty." }).trim(),
});

export type SummaryFormState =
  | {
      errors?: {
        id?: string[];
        summary?: string[];
      };
      message?: string;
    }
  | undefined;

export type KeyResponsibilitiesFormState = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export const keyResponsibilitiesFormSchema = z.object({
  id: z.coerce.number(),
  keyResponsibilities: z
    .array(z.string().trim().min(1, "Item cannot be empty"))
    .max(100, "Too many items"),
});

export type QualificationsFormState = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export const qualificationsFormSchema = z.object({
  id: z.coerce.number(),
  qualifications: z
    .array(z.string().trim().min(1, "Item cannot be empty"))
    .max(100, "Too many items"),
});

export type BenefitsFormState = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export const benefitsFormSchema = z.object({
  id: z.coerce.number(),
  benefits: z
    .array(z.string().trim().min(1, "Item cannot be empty"))
    .max(100, "Too many items"),
});

export const DeleteJobFormSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type DeleteJobFormState =
  | {
      errors?: { id?: string[] };
      message?: string;
      success?: boolean;
    }
  | undefined;

// PARTNER

export const AddPartnerBenefitFormSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }).trim(),
  description: z
    .string()
    .min(1, { message: "Description cannot be empty." })
    .trim(),
});

export type AddPartnerBenefitFormState =
  | {
      errors?: {
        title?: string[];
        description?: string[];
      };
      messages?: boolean;
    }
  | undefined;

export const partnerFormSchema = z.object({
  heroTitle: z
    .string()
    .min(1, { message: "Hero Title can not be empty." })
    .trim(),
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  heroDescription: z
    .string()
    .min(1, { message: "Description can not be empty." })
    .trim(),
});

export type PartnerFormState =
  | {
      errors?: {
        heroTitle?: string[];
        title?: string[];
        heroDescription?: string[];
      };
      message?: string;
    }
  | undefined;

export const benefitItemFormSchema = z.object({
  id: z.coerce.number().int().positive(),
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  description: z
    .string()
    .min(1, { message: "Description can not be empty." })
    .trim(),
});

export type BenefitItemFormState =
  | {
      errors?: {
        id?: string[];
        title?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;

export const DeleteBenefitFormSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type DeleteBenefitFormState =
  | {
      errors?: { id?: string[] };
      message?: string;
      success?: boolean;
    }
  | undefined;

export const footerFormSchema = z.object({
  title: z.string().min(1, { message: "Title can not be empty." }).trim(),
  address: z.string().min(1, { message: "Address can not be empty." }).trim(),
  email: z.string().min(1, { message: "Email can not be empty." }).trim(),
  facebook: z.string().min(1, { message: "Url can not be empty." }).trim(),
  linkedIn: z.string().min(1, { message: "Url can not be empty." }).trim(),
  copyright: z
    .string()
    .min(1, { message: "Copyright can not be empty." })
    .trim(),
});

export type FooterFormState =
  | {
      errors?: {
        title?: string[];
        address?: string[];
        email?: string[];
        copyright?: string[];
        facebook?: string[];
        linkkedIn?: string[];
      };
      message?: string;
    }
  | undefined;

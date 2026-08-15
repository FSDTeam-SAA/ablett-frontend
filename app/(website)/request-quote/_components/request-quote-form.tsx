"use client";

import { type FormEvent, type ReactNode, useRef, useState } from "react";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { FiUpload } from "react-icons/fi";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inputClass =
  "h-11 w-full rounded-md border border-[#595959] bg-[#333333] px-3 text-sm font-light text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[50px] sm:px-4";

const queryClient = new QueryClient();

type QuotePayload = {
  name: string;
  phoneNumber: string;
  email: string;
  location: string;
  projectName: string;
  projectBudget: string;
  projectStatus: string;
  message: string;
  photo?: File;
};

type QuoteResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  error?: string;
};

function buildApiUrl(path: string) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const baseUrl = apiBaseUrl.replace(/\/+$/, "");

  if (baseUrl.endsWith("/api/v1")) {
    return `${baseUrl}${path.replace(/^\/api\/v1/, "")}`;
  }

  return `${baseUrl}${path}`;
}

function getFormString(formData: FormData, name: keyof QuotePayload) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

async function submitQuote({
  payload,
  accessToken,
}: {
  payload: QuotePayload;
  accessToken?: string;
}) {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("phoneNumber", payload.phoneNumber);
  formData.append("email", payload.email);
  formData.append("location", payload.location);
  formData.append("projectName", payload.projectName);
  formData.append("projectBudget", payload.projectBudget);
  formData.append("projectStatus", payload.projectStatus);
  formData.append("message", payload.message);

  if (payload.photo && payload.photo.size > 0) {
    formData.append("photo", payload.photo);
  }

  const headers = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : undefined;

  const response = await fetch(buildApiUrl("/api/v1/quote"), {
    method: "POST",
    headers,
    body: formData,
  });
  const data: QuoteResponse | null = await response.json().catch(() => null);
  const hasExplicitFailure = data?.success === false || data?.status === false;

  if (!response.ok || hasExplicitFailure) {
    throw new Error(
      data?.message || data?.error || "Failed to send quote request."
    );
  }

  return data;
}

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  className?: string;
  disabled?: boolean;
};

function Field({
  label,
  name,
  placeholder,
  type = "text",
  className,
  disabled = false,
}: FieldProps) {
  return (
    <label
      className={cn(
        "block space-y-2 text-sm font-normal text-white sm:text-base",
        className
      )}
    >
      <span>{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={inputClass}
        disabled={disabled}
        required
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  placeholder,
  disabled = false,
  children,
}: {
  label: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2 text-sm font-normal text-white sm:text-base">
      <span>{label}</span>
      <select
        name={name}
        defaultValue=""
        className={cn(inputClass, "appearance-none text-[#9C9C9C]")}
        disabled={disabled}
        required
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {children}
      </select>
    </label>
  );
}

function RequestQuoteFormContent() {
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const quoteMutation = useMutation({
    mutationFn: submitQuote,
    onSuccess: (data) => {
      toast.success(data?.message || "Quote request submitted successfully.");
      formRef.current?.reset();
      setFileName("");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send quote request. Please try again."
      );
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const photo = formData.get("photo");
    const payload: QuotePayload = {
      name: getFormString(formData, "name"),
      phoneNumber: getFormString(formData, "phoneNumber"),
      email: getFormString(formData, "email"),
      location: getFormString(formData, "location"),
      projectName: getFormString(formData, "projectName"),
      projectBudget: getFormString(formData, "projectBudget"),
      projectStatus: getFormString(formData, "projectStatus"),
      message: getFormString(formData, "message"),
      photo: photo instanceof File ? photo : undefined,
    };

    if (
      !payload.name ||
      !payload.phoneNumber ||
      !payload.email ||
      !payload.location ||
      !payload.projectName ||
      !payload.projectBudget ||
      !payload.projectStatus ||
      !payload.message
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    quoteMutation.mutate({
      payload,
      accessToken: session?.accessToken,
    });
  }

  const isSubmitting = quoteMutation.isPending;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-lg bg-[#333333] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-6 lg:p-5 xl:p-6"
    >
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <Field
          label="Name"
          name="name"
          placeholder="Enter your full name"
          disabled={isSubmitting}
        />
        <Field
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          placeholder="Enter your phone number"
          disabled={isSubmitting}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          disabled={isSubmitting}
        />
        <SelectField
          label="Service"
          name="service"
          placeholder="Select service"
          disabled={isSubmitting}
          
        >
          <option value="residential">Residential Construction</option>
          <option value="commercial">Commercial Construction</option>
          <option value="site-preparation">Site Preparation</option>
          <option value="foundations">Foundations</option>
        </SelectField>
        <Field
          label="Project Name"
          name="projectName"
          placeholder="Enter your project name"
          disabled={isSubmitting}
        />
        <Field
          label="Location"
          name="location"
          placeholder="Enter project location"
          disabled={isSubmitting}
        />
        <Field
          label="Project Budget"
          name="projectBudget"
          placeholder="Enter your project budget"
          disabled={isSubmitting}
        />
        <SelectField
          label="Project Status"
          name="projectStatus"
          placeholder="Select Status"
          disabled={isSubmitting}
        >
          <option value="normal">Normal</option>
          <option value="emergency">Emergency</option>
        </SelectField>
      </div>

      <label className="mt-4 block space-y-2 text-sm font-normal text-white sm:text-base">
        <span>Message</span>
        <textarea
          name="message"
          placeholder="Write your message here..."
          className="min-h-[110px] w-full resize-none rounded-md border border-[#595959] bg-[#333333] px-3 py-3 text-sm font-light leading-6 text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[128px] sm:px-4 sm:py-4"
          disabled={isSubmitting}
          required
        />
      </label>

      <div className="mt-4 space-y-2 text-sm font-normal text-white sm:text-base">
        <span>Photo</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isSubmitting}
          className="flex min-h-[84px] w-full flex-col items-center justify-center rounded-md border border-dashed border-[#595959] bg-[#333333] px-3 py-4 text-center transition hover:border-[#C88719] focus:outline-none focus:ring-2 focus:ring-[#C88719]/25 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[92px] sm:px-4 sm:py-5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8B5A0E] text-[#C88719] sm:h-10 sm:w-10">
            <FiUpload className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <span className="mt-2 text-xs font-light text-[#9C9C9C] sm:mt-3 sm:text-sm">
            {fileName || "Drag and drop image here, or click add image"}
          </span>
        </button>
        <input
          ref={inputRef}
          name="photo"
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isSubmitting}
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? "");
          }}
        />
      </div>

      <div className="mt-5 flex justify-center">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 min-w-[144px] rounded-full bg-[#C88719] px-7 text-sm font-medium text-white transition hover:bg-[#B47714] sm:h-12 sm:min-w-[154px] sm:px-8 sm:text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </div>
    </form>
  );
}

export default function RequestQuoteForm() {
  return (
    <QueryClientProvider client={queryClient}>
      <RequestQuoteFormContent />
    </QueryClientProvider>
  );
}

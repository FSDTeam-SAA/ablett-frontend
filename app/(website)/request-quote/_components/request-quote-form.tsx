"use client";

import { type FormEvent, type ReactNode, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

const inputClass =
  "h-11 w-full rounded-md border border-[#595959] bg-[#333333] px-3 text-sm font-light text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25 sm:h-[50px] sm:px-4";

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  className?: string;
};

function Field({
  label,
  name,
  placeholder,
  type = "text",
  className,
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
        required
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  placeholder,
  children,
}: {
  label: string;
  name: string;
  placeholder: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2 text-sm font-normal text-white sm:text-base">
      <span>{label}</span>
      <select
        name={name}
        defaultValue=""
        className={cn(inputClass, "appearance-none text-[#9C9C9C]")}
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

export default function RequestQuoteForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setFileName("");

    toast.add({
      title: "Message sent",
      description: "Our team will contact you shortly.",
      type: "success",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-[#333333] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-6 lg:p-5 xl:p-6"
    >
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Enter your full name" />
        <Field
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email address"
        />
        <SelectField label="Service" name="service" placeholder="Select service">
          <option value="residential">Residential Construction</option>
          <option value="commercial">Commercial Construction</option>
          <option value="site-preparation">Site Preparation</option>
          <option value="foundations">Foundations</option>
        </SelectField>
        <Field
          label="Project Name"
          name="projectName"
          placeholder="Enter your project name"
          className="md:col-span-2"
        />
        <Field
          label="Project Budget"
          name="budget"
          placeholder="Enter your project budget"
        />
        <SelectField
          label="Project Status"
          name="projectStatus"
          placeholder="Select Status"
        >
          <option value="planning">Planning</option>
          <option value="ready-to-start">Ready to Start</option>
          <option value="in-progress">In Progress</option>
        </SelectField>
      </div>

      <label className="mt-4 block space-y-2 text-sm font-normal text-white sm:text-base">
        <span>Message</span>
        <textarea
          name="message"
          placeholder="Write your message here..."
          className="min-h-[110px] w-full resize-none rounded-md border border-[#595959] bg-[#333333] px-3 py-3 text-sm font-light leading-6 text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25 sm:min-h-[128px] sm:px-4 sm:py-4"
          required
        />
      </label>

      <div className="mt-4 space-y-2 text-sm font-normal text-white sm:text-base">
        <span>Photo</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-[84px] w-full flex-col items-center justify-center rounded-md border border-dashed border-[#595959] bg-[#333333] px-3 py-4 text-center transition hover:border-[#C88719] focus:outline-none focus:ring-2 focus:ring-[#C88719]/25 sm:min-h-[92px] sm:px-4 sm:py-5"
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
          onChange={(event) => {
            setFileName(event.target.files?.[0]?.name ?? "");
          }}
        />
      </div>

      <div className="mt-5 flex justify-center">
        <Button
          type="submit"
          className="h-11 min-w-[144px] rounded-full bg-[#C88719] px-7 text-sm font-medium text-white transition hover:bg-[#B47714] sm:h-12 sm:min-w-[154px] sm:px-8 sm:text-base"
        >
          Send Message
        </Button>
      </div>
    </form>
  );
}

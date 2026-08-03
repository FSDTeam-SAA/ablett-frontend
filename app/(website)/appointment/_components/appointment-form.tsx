"use client";

import {
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import AppointmentDatePicker from "./appointment-date-picker";
import AppointmentTimePicker from "./appointment-time-picker";

type AppointmentFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
};

const inputClass =
  "h-[50px] w-full rounded-md border border-[#595959] bg-[#303030] px-4 text-sm font-light text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25";

function AppointmentField({
  label,
  icon,
  className,
  ...props
}: AppointmentFieldProps) {
  return (
    <label className="block space-y-2 text-sm font-normal text-white sm:text-base">
      <span>{label}</span>
      <span className="relative block">
        <input
          className={cn(inputClass, icon && "pr-11", className)}
          {...props}
        />
        {icon ? (
          <span className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 text-[#B8B8B8]">
            {icon}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export default function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDateError(!selectedDate);
    setTimeError(!selectedTime);

    if (!selectedDate) {
      toast.add({
        title: "Preferred date required",
        description: "Please choose a date before scheduling the appointment.",
        type: "warning",
      });
      return;
    }

    if (!selectedTime) {
      toast.add({
        title: "Preferred time required",
        description: "Please choose a time before scheduling the appointment.",
        type: "warning",
      });
      return;
    }

    event.currentTarget.reset();
    setSelectedDate(null);
    setSelectedTime("");
    setDateError(false);
    setTimeError(false);

    toast.add({
      title: "Appointment request received",
      description: "Our team will contact you shortly to confirm the details.",
      type: "success",
    });
  }

  return (
    <section className="bg-black px-4 pb-14 pt-28 text-white sm:px-6 sm:pb-20 sm:pt-36 lg:px-10 lg:pb-24 lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="mx-auto max-w-[820px] text-center">
          <h1 className="text-[36px] font-normal leading-tight tracking-normal sm:text-5xl md:text-[56px] lg:text-[64px]">
            Schedule Your Consultation
          </h1>
          <p className="mx-auto mt-4 max-w-[760px] text-sm font-light leading-7 text-[#E6E6E6] sm:text-base md:text-[20px] md:leading-8">
            Schedule a consultation with our team to discuss your project and
            discover the right construction solution for your needs.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 max-w-[1176px] rounded-lg bg-[#333333] px-5 py-6 shadow-[0_22px_80px_rgba(0,0,0,0.28)] sm:mt-16 sm:px-7 sm:py-7 lg:mt-20 lg:px-[28px] lg:py-[28px]"
        >
          <div className="grid gap-4 md:grid-cols-2 md:gap-x-5 md:gap-y-5">
            <AppointmentField
              label="Name"
              name="name"
              placeholder="Enter your full name"
              required
            />
            <AppointmentField
              label="Phone Number"
              name="phone"
              placeholder="Enter your phone number"
              type="tel"
              required
            />
            <AppointmentField
              label="Email"
              name="email"
              placeholder="Enter your email address"
              type="email"
              required
            />
            <AppointmentField
              label="Project Location"
              name="location"
              placeholder="Enter your project location"
              required
            />
            <AppointmentDatePicker
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setDateError(false);
              }}
              error={dateError}
            />
            <AppointmentTimePicker
              value={selectedTime}
              onChange={(time) => {
                setSelectedTime(time);
                setTimeError(false);
              }}
              error={timeError}
            />
          </div>

          <label className="mt-5 block space-y-2 text-sm font-normal text-white sm:text-base">
            <span>Brief Project Description</span>
            <textarea
              name="description"
              placeholder="Write a brief description of the project here..."
              className="min-h-[132px] w-full resize-none rounded-md border border-[#595959] bg-[#303030] px-4 py-4 text-sm font-light leading-6 text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25 sm:min-h-[118px]"
              required
            />
          </label>

          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              className="h-11 rounded-full bg-[#C88719] px-8 text-sm font-medium text-white transition hover:bg-[#B47714] sm:h-12 sm:min-w-[205px] sm:text-base"
            >
              Schedule Appointment
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

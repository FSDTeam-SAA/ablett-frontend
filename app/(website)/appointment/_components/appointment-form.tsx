"use client";

import {
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AppointmentDatePicker from "./appointment-date-picker";
import AppointmentTimePicker, {
  type AppointmentSlot,
} from "./appointment-time-picker";

type AppointmentFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
};

const inputClass =
  "h-[50px] w-full rounded-md border border-[#595959] bg-[#303030] px-4 text-sm font-light text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25";

type SlotsResponse = {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: AppointmentSlot[];
};

type BookingPayload = {
  name: string;
  phoneNumber: string;
  email: string;
  projectLocation: string;
  message: string;
  scheduleId: string;
  slotId: string;
};

type BookingResponse = {
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

function getFormString(formData: FormData, name: keyof BookingPayload) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

async function fetchAvailableSlots(signal?: AbortSignal) {
  const response = await fetch(buildApiUrl("/api/v1/booking/slots"), {
    signal,
  });
  const data: SlotsResponse | null = await response.json().catch(() => null);
  const hasExplicitFailure = data?.success === false || data?.status === false;

  if (!response.ok || hasExplicitFailure) {
    throw new Error(data?.message || "Failed to fetch available slots.");
  }

  return data?.data ?? [];
}

async function submitBooking({
  payload,
  accessToken,
}: {
  payload: BookingPayload;
  accessToken?: string;
}) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(buildApiUrl("/api/v1/booking"), {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const data: BookingResponse | null = await response.json().catch(() => null);
  const hasExplicitFailure = data?.success === false || data?.status === false;

  if (!response.ok || hasExplicitFailure) {
    throw new Error(data?.message || data?.error || "Failed to book appointment.");
  }

  return data;
}

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
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null);
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const availableDates = useMemo(
    () => Array.from(new Set(slots.map((slot) => slot.date))).sort(),
    [slots]
  );
  const selectedDateValue = selectedDate ? formatDateValue(selectedDate) : "";
  const slotsForSelectedDate = useMemo(
    () => slots.filter((slot) => slot.date === selectedDateValue),
    [selectedDateValue, slots]
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadSlots() {
      try {
        setSlotsLoading(true);
        setSlots(await fetchAvailableSlots(controller.signal));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to fetch available slots."
        );
      } finally {
        setSlotsLoading(false);
      }
    }

    loadSlots();

    return () => controller.abort();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    setDateError(!selectedDate);
    setTimeError(!selectedSlot);

    if (!selectedDate) {
      toast.warning("Please choose a preferred date.");
      return;
    }

    if (!selectedSlot) {
      toast.warning("Please choose a preferred time.");
      return;
    }

    const formData = new FormData(form);
    const payload: BookingPayload = {
      name: getFormString(formData, "name"),
      phoneNumber: getFormString(formData, "phoneNumber"),
      email: getFormString(formData, "email"),
      projectLocation: getFormString(formData, "projectLocation"),
      message: getFormString(formData, "message"),
      scheduleId: selectedSlot.scheduleId,
      slotId: selectedSlot.slotId,
    };

    if (
      !payload.name ||
      !payload.phoneNumber ||
      !payload.email ||
      !payload.projectLocation ||
      !payload.message
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await submitBooking({
        payload,
        accessToken: session?.accessToken,
      });

      form.reset();
      setSelectedDate(null);
      setSelectedSlot(null);
      setDateError(false);
      setTimeError(false);

      toast.success(data?.message || "Appointment booked successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to book appointment. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting}
              required
            />
            <AppointmentField
              label="Phone Number"
              name="phoneNumber"
              placeholder="Enter your phone number"
              type="tel"
              disabled={isSubmitting}
              required
            />
            <AppointmentField
              label="Email"
              name="email"
              placeholder="Enter your email address"
              type="email"
              disabled={isSubmitting}
              required
            />
            <AppointmentField
              label="Project Location"
              name="projectLocation"
              placeholder="Enter your project location"
              disabled={isSubmitting}
              required
            />
            <AppointmentDatePicker
              value={selectedDate}
              availableDates={availableDates}
              onChange={(date) => {
                setSelectedDate(date);
                setSelectedSlot(null);
                setDateError(false);
              }}
              error={dateError}
              disabled={slotsLoading || isSubmitting}
            />
            <AppointmentTimePicker
              value={selectedSlot}
              slots={slotsForSelectedDate}
              onChange={(slot) => {
                setSelectedSlot(slot);
                setTimeError(false);
              }}
              error={timeError}
              disabled={!selectedDate || slotsLoading || isSubmitting}
            />
          </div>

          <label className="mt-5 block space-y-2 text-sm font-normal text-white sm:text-base">
            <span>Brief Project Description</span>
            <textarea
              name="message"
              placeholder="Write a brief description of the project here..."
              className="min-h-[132px] w-full resize-none rounded-md border border-[#595959] bg-[#303030] px-4 py-4 text-sm font-light leading-6 text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25 sm:min-h-[118px]"
              disabled={isSubmitting}
              required
            />
          </label>

          <div className="mt-6 flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting || slotsLoading}
              className="h-11 rounded-full bg-[#C88719] px-8 text-sm font-medium text-white transition hover:bg-[#B47714] sm:h-12 sm:min-w-[205px] sm:text-base"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                "Schedule Appointment"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

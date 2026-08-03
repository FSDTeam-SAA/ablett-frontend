"use client";

import { useMemo, useState } from "react";
import { Popover } from "@base-ui/react/popover";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const triggerClass =
  "h-[50px] w-full rounded-md border border-[#595959] bg-[#303030] px-4 text-sm font-light text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25";

type AppointmentDatePickerProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  error?: boolean;
};

type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
};

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(dateA: Date | null, dateB: Date) {
  return (
    dateA?.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function formatDate(date: Date) {
  return `${
    shortMonthNames[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}

function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getMonthDays(displayMonth: Date): CalendarDay[] {
  const year = displayMonth.getFullYear();
  const month = displayMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const mondayStartOffset = (firstDay.getDay() + 6) % 7;
  const cellCount = mondayStartOffset + daysInMonth > 35 ? 42 : 35;

  return Array.from({ length: cellCount }, (_, index) => {
    const date = new Date(year, month, index - mondayStartOffset + 1);

    return {
      date,
      isCurrentMonth: date.getMonth() === month,
    };
  });
}

export default function AppointmentDatePicker({
  value,
  onChange,
  error,
}: AppointmentDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [displayMonth, setDisplayMonth] = useState(
    () => value ?? startOfDay(new Date())
  );

  const today = useMemo(() => startOfDay(new Date()), []);
  const calendarDays = getMonthDays(displayMonth);

  function goToPreviousMonth() {
    setDisplayMonth(
      (currentMonth) =>
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  }

  function goToNextMonth() {
    setDisplayMonth(
      (currentMonth) =>
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  }

  function selectDate(date: Date) {
    onChange(startOfDay(date));
    setOpen(false);
  }

  return (
    <div className="block space-y-2 text-base font-normal text-white">
      <span>Preferred Date</span>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          type="button"
          className={cn(
            triggerClass,
            "flex items-center justify-between gap-3 text-left",
            !value && "text-[#9C9C9C]",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/25"
          )}
        >
          <span>{value ? formatDate(value) : "Select Date"}</span>
          <CalendarDays className="h-4 w-4 shrink-0 text-[#B8B8B8] md:h-3.5 md:w-3.5" />
        </Popover.Trigger>

        <input
          aria-hidden="true"
          name="date"
          type="hidden"
          value={value ? formatDateValue(value) : ""}
          readOnly
        />

        <Popover.Portal>
          <Popover.Positioner
            side="bottom"
            align="start"
            sideOffset={12}
            className="z-[90]"
          >
            <Popover.Popup
              initialFocus={false}
              className="h-[300px] w-[calc(100vw-2rem)] max-w-[374px] overflow-hidden rounded-2xl bg-black text-white shadow-[0_24px_70px_rgba(0,0,0,0.5)] outline-none data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 sm:w-[374px]"
            >
              <div className="flex h-[56px] items-center justify-between bg-[#C88719] px-5 text-white sm:px-6">
                <div className="flex min-w-0 items-center gap-2 text-[24px] font-semibold">
                  <span>
                    {monthNames[displayMonth.getMonth()]}{" "}
                    {displayMonth.getFullYear()}
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0" />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous month"
                    onClick={goToPreviousMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <ChevronLeft className="h-7 w-7" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={goToNextMonth}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    <ChevronRight className="h-7 w-7" />
                  </button>
                </div>
              </div>

              <div className="px-5 pb-4 pt-5">
                <div className="grid grid-cols-7 gap-x-2 gap-y-2">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-normal text-[#C88719]"
                    >
                      {day}
                    </div>
                  ))}

                  {calendarDays.map(({ date, isCurrentMonth }) => {
                    const disabled =
                      !isCurrentMonth || startOfDay(date).getTime() < today.getTime();
                    const selected = isSameDay(value, date);

                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        disabled={disabled}
                        onClick={() => selectDate(date)}
                        className={cn(
                          "mx-auto flex h-7 w-7 items-center justify-center rounded-full border text-sm font-light transition",
                          !isCurrentMonth &&
                            "border-transparent text-[#6E6E6E] opacity-80",
                          isCurrentMonth &&
                            !disabled &&
                            !selected &&
                            "border-[#C88719] text-[#C88719] hover:bg-[#C88719] hover:text-black",
                          disabled &&
                            isCurrentMonth &&
                            "border-transparent bg-[#3A3A3A] text-[#8B8B8B]",
                          selected &&
                            "border-[#C88719] bg-[#C88719] text-black"
                        )}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>

      {error ? (
        <p className="text-sm text-red-400">Please select a preferred date.</p>
      ) : null}
    </div>
  );
}

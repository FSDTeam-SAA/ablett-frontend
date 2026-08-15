"use client";

import { useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { Clock3 } from "lucide-react";

import { cn } from "@/lib/utils";

const triggerClass =
  "h-[50px] w-full rounded-md border border-[#595959] bg-[#303030] px-4 text-sm font-light text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25";

export type AppointmentSlot = {
  scheduleId: string;
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
};

type AppointmentTimePickerProps = {
  value: AppointmentSlot | null;
  onChange: (slot: AppointmentSlot) => void;
  slots: AppointmentSlot[];
  error?: boolean;
  disabled?: boolean;
};

export function formatSlotTime(slot: AppointmentSlot) {
  return `${slot.startTime} - ${slot.endTime}`;
}

export default function AppointmentTimePicker({
  value,
  onChange,
  slots,
  error,
  disabled = false,
}: AppointmentTimePickerProps) {
  const [open, setOpen] = useState(false);

  function selectTime(slot: AppointmentSlot) {
    onChange(slot);
    setOpen(false);
  }

  return (
    <div className="block space-y-2 text-base font-normal text-white">
      <span>Preferred Time</span>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          type="button"
          disabled={disabled}
          className={cn(
            triggerClass,
            "flex items-center justify-between gap-3 text-left",
            !value && "text-[#9C9C9C]",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/25",
            disabled && "cursor-not-allowed opacity-60"
          )}
        >
          <span>
            {value
              ? formatSlotTime(value)
              : disabled
                ? "Select date first"
                : "Select time"}
          </span>
          <Clock3 className="h-4 w-4 shrink-0 text-[#B8B8B8] md:h-3.5 md:w-3.5" />
        </Popover.Trigger>

        <input
          aria-hidden="true"
          name="time"
          type="hidden"
          value={value ? formatSlotTime(value) : ""}
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
              className="max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-[331px] overflow-hidden rounded-xl bg-black text-white shadow-[0_24px_70px_rgba(0,0,0,0.5)] outline-none data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 sm:w-[331px]"
            >
              <div className="flex h-11 items-center bg-[#C88719] px-4 text-xl font-semibold text-white">
                Select a time
              </div>

              <div className="max-h-[calc(100vh-5rem)] overflow-y-auto px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {slots.length ? (
                  slots.map((slot) => {
                    const label = formatSlotTime(slot);
                    const selected = value?.slotId === slot.slotId;

                    return (
                      <button
                        key={slot.slotId}
                        type="button"
                        onClick={() => selectTime(slot)}
                        className={cn(
                          "block h-11 w-full rounded-md text-left text-xl font-normal text-white transition hover:bg-[#C88719]/15",
                          selected && "text-[#C88719]"
                        )}
                      >
                        {label}
                      </button>
                    );
                  })
                ) : (
                  <p className="py-4 text-sm font-light text-[#9C9C9C]">
                    No slots available for this date.
                  </p>
                )}
              </div>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>

      {error ? (
        <p className="text-sm text-red-400">Please select a preferred time.</p>
      ) : null}
    </div>
  );
}

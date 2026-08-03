"use client";

import { useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { Clock3 } from "lucide-react";

import { cn } from "@/lib/utils";

const triggerClass =
  "h-[50px] w-full rounded-md border border-[#595959] bg-[#303030] px-4 text-sm font-light text-white outline-none transition placeholder:text-[#9C9C9C] focus:border-[#C88719] focus:ring-2 focus:ring-[#C88719]/25";

const timeOptions = [
  { label: "9:01Am - 9:30Am" },
  { label: "9:31Am - 10:00Am" },
  { label: "10:00Am - 10:30Am", disabled: true },
  { label: "10:30Am - 11:00Am", disabled: true },
  { label: "11:00Am" },
  { label: "11:30Am", disabled: true },
  { label: "12:00pm" },
  { label: "12:30pm", disabled: true },
  { label: "1:00pm" },
  { label: "1:30pm", disabled: true },
  { label: "2:00pm" },
  { label: "2:30pm", disabled: true },
  { label: "3:00pm" },
  { label: "3:30pm", disabled: true },
];

type AppointmentTimePickerProps = {
  value: string;
  onChange: (time: string) => void;
  error?: boolean;
};

export default function AppointmentTimePicker({
  value,
  onChange,
  error,
}: AppointmentTimePickerProps) {
  const [open, setOpen] = useState(false);

  function selectTime(time: string) {
    onChange(time);
    setOpen(false);
  }

  return (
    <div className="block space-y-2 text-base font-normal text-white">
      <span>Preferred Time</span>
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
          <span>{value || "Select time"}</span>
          <Clock3 className="h-4 w-4 shrink-0 text-[#B8B8B8] md:h-3.5 md:w-3.5" />
        </Popover.Trigger>

        <input
          aria-hidden="true"
          name="time"
          type="hidden"
          value={value}
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
                {timeOptions.map((option) => {
                  const selected = value === option.label;

                  return (
                    <button
                      key={option.label}
                      type="button"
                      disabled={option.disabled}
                      onClick={() => selectTime(option.label)}
                      className={cn(
                        "block h-11 w-full rounded-md text-left text-xl font-normal transition",
                        option.disabled
                          ? "cursor-not-allowed text-[#676767]"
                          : "text-white hover:bg-[#C88719]/15",
                        selected && "text-[#C88719]"
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
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

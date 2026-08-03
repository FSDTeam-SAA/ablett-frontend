import { FiCheckCircle, FiEye, FiTrash2, FiXCircle } from "react-icons/fi";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const quoteRows = [
  {
    projectName: "Park Ave Penthouse",
    location: "2972 Westheimer Rd. Santa Ana",
    message: "Have you tried that new restaurant in t...",
    budget: "$740 - $924",
    status: "Normal",
  },
  {
    projectName: "Kenneth Summer Home",
    location: "3891 Ranchview Dr. Richardson",
    message: "What kind of music are you into",
    budget: "$190 - $450",
    status: "Urgent",
  },
  {
    projectName: "6230 Plaza Drive",
    location: "2118 Thornridge Cir. Syracuse",
    message: "It's okay no problem at all",
    budget: "$477 - $826",
    status: "Urgent",
  },
  {
    projectName: "45 East Blvd",
    location: "6391 Elgin St. Celina, Delaware 1...",
    message: "I'm working as a [profession] how a...",
    budget: "$437 - $745",
    status: "Normal",
  },
  {
    projectName: "Goffrey Build",
    location: "2464 Royal Ln. Mesa, New Jersey...",
    message: "Nice to meet you I've heard a lot abo...",
    budget: "$311 - $390",
    status: "Urgent",
  },
  {
    projectName: "Goffrey Build",
    location: "6391 Elgin St. Celina, Delaware 1...",
    message: "It's okay no problem at all",
    budget: "$190 - $450",
    status: "Normal",
  },
];

const appointmentRows = [
  {
    location: "8080 Railroad St.",
    phone: "(480) 555-0103",
    email: "xterri@gmail.com",
    dateTime: "15 May 2020 8:00 am",
    status: "Scheduled",
  },
  {
    location: "8558 Green Rd.",
    phone: "(671) 555-0110",
    email: "icadahli@gmail.com",
    dateTime: "15 May 2020 8:30 am",
    status: "Scheduled",
  },
  {
    location: "3890 Poplar Dr.",
    phone: "(225) 555-0118",
    email: "fzaaaaa@gmail.com",
    dateTime: "15 May 2020 9:30 am",
    status: "Completed",
  },
  {
    location: "3880 Poplar Dr.",
    phone: "(207) 555-0119",
    email: "xeno@yandex.ru",
    dateTime: "15 May 2020 8:00 am",
    status: "Scheduled",
  },
  {
    location: "775 Rolling Green Rd.",
    phone: "(303) 555-0105",
    email: "codence@gmail.com",
    dateTime: "15 May 2020 8:00 am",
    status: "Completed",
  },
  {
    location: "3605 Parker Rd.",
    phone: "(319) 555-0115",
    email: "igerrin@gmail.com",
    dateTime: "15 May 2020 8:30 am",
    status: "Canceled",
  },
  {
    location: "3605 Parker Rd.",
    phone: "(270) 555-0117",
    email: "ulfaha@mail.ru",
    dateTime: "15 May 2020 9:00 am",
    status: "Completed",
  },
];

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[86px] items-center justify-center rounded-full border px-3 py-1 text-xs font-normal",
        status === "Completed" && "border-[#00A84F] text-[#00C260]",
        status === "Canceled" && "border-[#DA1F33] text-[#DA1F33]",
        status === "Scheduled" && "border-[#C88719] text-[#C88719]",
        (status === "Normal" || status === "Urgent") &&
          "border-transparent px-0 text-white"
      )}
    >
      {status}
    </span>
  );
}

function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#6A6A6A] bg-[#141414]">
      {children}
    </div>
  );
}

export function QuoteRequestsPanel() {
  return (
    <TableShell>
      <Table className="min-w-[900px] text-white">
        <TableHeader>
          <TableRow className="border-[#6A6A6A] hover:bg-transparent">
            <TableHead className="text-center text-sm text-white">Project Name</TableHead>
            <TableHead className="text-center text-sm text-white">Location</TableHead>
            <TableHead className="text-center text-sm text-white">Massage</TableHead>
            <TableHead className="text-center text-sm text-white">Project Budget</TableHead>
            <TableHead className="text-center text-sm text-white">Status</TableHead>
            <TableHead className="text-center text-sm text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quoteRows.map((row, index) => (
            <TableRow
              key={`${row.projectName}-${index}`}
              className="border-[#6A6A6A] hover:bg-[#1D1D1D]"
            >
              <TableCell className="max-w-[150px] whitespace-normal text-center text-sm text-[#D8D8D8]">
                {row.projectName}
              </TableCell>
              <TableCell className="max-w-[170px] whitespace-normal text-center text-sm text-[#D8D8D8]">
                {row.location}
              </TableCell>
              <TableCell className="max-w-[170px] whitespace-normal text-center text-sm text-[#D8D8D8]">
                {row.message}
              </TableCell>
              <TableCell className="text-center text-sm text-[#D8D8D8]">
                {row.budget}
              </TableCell>
              <TableCell className="text-center text-sm">
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-4 text-white">
                  <button type="button" aria-label="View quote">
                    <FiEye className="h-5 w-5" />
                  </button>
                  <button type="button" aria-label="Delete quote">
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableShell>
  );
}

export function BookingAppointmentsPanel() {
  return (
    <TableShell>
      <Table className="min-w-[900px] text-white">
        <TableHeader>
          <TableRow className="border-[#6A6A6A] hover:bg-transparent">
            <TableHead className="text-center text-sm text-white">
              Project Location
            </TableHead>
            <TableHead className="text-center text-sm text-white">Phone Number</TableHead>
            <TableHead className="text-center text-sm text-white">Email</TableHead>
            <TableHead className="text-center text-sm text-white">Date & Time</TableHead>
            <TableHead className="text-center text-sm text-white">Status</TableHead>
            <TableHead className="text-center text-sm text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointmentRows.map((row, index) => (
            <TableRow
              key={`${row.location}-${row.phone}-${index}`}
              className="border-[#6A6A6A] hover:bg-[#1D1D1D]"
            >
              <TableCell className="text-center text-sm text-[#D8D8D8]">
                {row.location}
              </TableCell>
              <TableCell className="text-center text-sm text-[#D8D8D8]">
                {row.phone}
              </TableCell>
              <TableCell className="text-center text-sm text-[#D8D8D8]">
                {row.email}
              </TableCell>
              <TableCell className="max-w-[130px] whitespace-normal text-center text-sm text-[#D8D8D8]">
                {row.dateTime}
              </TableCell>
              <TableCell className="text-center text-sm">
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-4">
                  {row.status === "Completed" || row.status === "Canceled" ? (
                    <button type="button" aria-label="Delete appointment">
                      <FiTrash2 className="h-5 w-5 text-white" />
                    </button>
                  ) : (
                    <>
                      <button type="button" aria-label="Cancel appointment">
                        <FiXCircle className="h-5 w-5 text-[#DA1F33]" />
                      </button>
                      <button type="button" aria-label="Confirm appointment">
                        <FiCheckCircle className="h-5 w-5 text-[#00C260]" />
                      </button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableShell>
  );
}

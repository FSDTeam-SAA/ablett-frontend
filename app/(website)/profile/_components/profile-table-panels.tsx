"use client";

import { useId, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { FiEye, FiTrash2 } from "react-icons/fi";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import QuoteRequestsTableSkeleton from "./quote-requests-table-skeleton";

type QuoteRequest = {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  location: string;
  projectName: string;
  projectBudget: string;
  projectStatus: string;
  message: string | null;
  photo: string | null;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type QuoteRequestsResponse = {
  statusCode?: number;
  success?: boolean;
  status?: boolean;
  message?: string;
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: QuoteRequest[];
};

type BookingAppointment = {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  projectLocation: string;
  message: string;
  scheduleId: string;
  slotId: string;
  status: string;
  userId:
    | string
    | {
        _id?: string;
        fullName?: string;
        email?: string;
        role?: string;
        profilePicture?: string | null;
        phoneNumber?: string;
      }
    | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
};

type BookingAppointmentsResponse = {
  statusCode?: number;
  success?: boolean;
  status?: boolean;
  message?: string;
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: BookingAppointment[];
};

const quoteRequestsQueryKey = ["profile", "quote-requests"];
const bookingAppointmentsQueryKey = ["profile", "booking-appointments"];
const queryClient = new QueryClient();

function getApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  return apiBaseUrl.replace(/\/+$/, "");
}

function buildApiUrl(path: string) {
  const baseUrl = getApiBaseUrl();

  if (baseUrl.endsWith("/api/v1")) {
    return `${baseUrl}${path.replace(/^\/api\/v1/, "")}`;
  }

  return `${baseUrl}${path}`;
}

async function fetchQuoteRequests(accessToken: string) {
  const response = await fetch(buildApiUrl("/api/v1/quote"), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data: QuoteRequestsResponse | null = await response
    .json()
    .catch(() => null);
  const hasExplicitFailure = data?.success === false || data?.status === false;

  if (!response.ok || hasExplicitFailure) {
    throw new Error(
      data?.message || data?.error || "Failed to fetch quote requests."
    );
  }

  return data?.data ?? [];
}

async function deleteQuoteRequest({
  accessToken,
  quoteId,
}: {
  accessToken: string;
  quoteId: string;
}) {
  const response = await fetch(
    buildApiUrl(`/api/v1/quote/${encodeURIComponent(quoteId)}`),
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data: QuoteRequestsResponse | null = await response
    .json()
    .catch(() => null);
  const hasExplicitFailure = data?.success === false || data?.status === false;

  if (!response.ok || hasExplicitFailure) {
    throw new Error(
      data?.message || data?.error || "Failed to delete quote request."
    );
  }

  return data;
}

async function fetchBookingAppointments(accessToken: string) {
  const response = await fetch(buildApiUrl("/api/v1/booking"), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data: BookingAppointmentsResponse | null = await response
    .json()
    .catch(() => null);
  const hasExplicitFailure = data?.success === false || data?.status === false;

  if (!response.ok || hasExplicitFailure) {
    throw new Error(
      data?.message || data?.error || "Failed to fetch booking appointments."
    );
  }

  return data?.data ?? [];
}

function formatProjectStatus(status: string) {
  if (!status) return "N/A";

  return status
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatAppointmentDateTime(row: BookingAppointment) {
  if (!row.date && !row.startTime && !row.endTime) {
    return "N/A";
  }

  const date = new Date(`${row.date}T00:00:00`);
  const formattedDate = Number.isNaN(date.getTime())
    ? row.date || "N/A"
    : date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

  const timeRange = [row.startTime, row.endTime].filter(Boolean).join(" - ");

  return [formattedDate, timeRange].filter(Boolean).join(" ");
}

function formatDateTimeValue(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatBookingUser(user: BookingAppointment["userId"]) {
  if (!user) return "Guest booking";
  if (typeof user === "string") return user;

  return [user.fullName, user.email, user.phoneNumber]
    .filter(Boolean)
    .join(" | ");
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[86px] items-center justify-center rounded-full border px-3 py-1 text-xs font-normal",
        status === "Completed" && "border-[#00A84F] text-[#00C260]",
        (status === "Canceled" || status === "Cancelled") &&
          "border-[#DA1F33] text-[#DA1F33]",
        (status === "Scheduled" || status === "Pending") &&
          "border-[#C88719] text-[#C88719]",
        status === "Emergency" && "border-[#DA1F33] text-[#DA1F33]",
        (status === "Normal" || status === "Urgent") &&
          "border-transparent px-0 text-white"
      )}
    >
      {status}
    </span>
  );
}

const appointmentSkeletonRows = Array.from({ length: 6 });
const appointmentSkeletonColumns = [
  "Project Location",
  "Phone Number",
  "Email",
  "Date & Time",
  "Status",
  "Action",
];

function SkeletonBar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "mx-auto block h-4 animate-pulse rounded-full bg-white/10",
        className
      )}
    />
  );
}

function TableShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#6A6A6A] bg-[#141414]">
      {children}
    </div>
  );
}

function BookingAppointmentsTableSkeleton() {
  return (
    <TableShell>
      <Table className="min-w-[900px] text-white">
        <TableHeader>
          <TableRow className="border-[#6A6A6A] hover:bg-transparent">
            {appointmentSkeletonColumns.map((column) => (
              <TableHead key={column} className="text-center text-sm text-white">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointmentSkeletonRows.map((_, index) => (
            <TableRow
              key={index}
              className="border-[#6A6A6A] hover:bg-transparent"
            >
              <TableCell>
                <SkeletonBar className="w-36" />
              </TableCell>
              <TableCell>
                <SkeletonBar className="w-32" />
              </TableCell>
              <TableCell>
                <SkeletonBar className="w-40" />
              </TableCell>
              <TableCell>
                <SkeletonBar className="w-36" />
              </TableCell>
              <TableCell>
                <SkeletonBar className="w-20" />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-4">
                  <SkeletonBar className="h-5 w-5" />
                  <SkeletonBar className="h-5 w-5" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableShell>
  );
}

function DeleteQuoteConfirmationModal({
  open,
  quote,
  isDeleting,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  quote: QuoteRequest | null;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const titleId = useId();
  const descriptionId = useId();

  if (!open || !quote) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="w-full max-w-sm rounded-lg border border-white/10 bg-[#151515] p-5 text-white shadow-2xl"
      >
        <h2 id={titleId} className="text-lg font-semibold">
          Delete quote request?
        </h2>
        <p id={descriptionId} className="mt-2 text-sm leading-6 text-white/70">
          Are you sure you want to delete the quote request for{" "}
          <span className="font-medium text-white">{quote.projectName}</span>?
          This action cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="h-10 cursor-pointer rounded-full border border-white/15 px-5 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="h-10 cursor-pointer rounded-full bg-[#DA1F33] px-5 text-sm font-semibold text-white transition hover:bg-[#C51B2E] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingAppointmentDetailsModal({
  appointment,
  onClose,
}: {
  appointment: BookingAppointment | null;
  onClose: () => void;
}) {
  const titleId = useId();

  if (!appointment) return null;

  const status = formatProjectStatus(appointment.status);
  const details = [
    { label: "Name", value: appointment.name },
    { label: "Phone Number", value: appointment.phoneNumber },
    { label: "Email", value: appointment.email },
    { label: "Project Location", value: appointment.projectLocation },
    { label: "Date & Time", value: formatAppointmentDateTime(appointment) },
    { label: "Status", value: status },
    { label: "Message", value: appointment.message },
    { label: "Schedule ID", value: appointment.scheduleId },
    { label: "Slot ID", value: appointment.slotId },
    { label: "User", value: formatBookingUser(appointment.userId) },
    { label: "Created At", value: formatDateTimeValue(appointment.createdAt) },
    { label: "Updated At", value: formatDateTimeValue(appointment.updatedAt) },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-white/10 bg-[#151515] p-5 text-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-lg font-semibold">
              Booking Appointment Details
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Full information for this appointment request.
            </p>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {details.map((item) => (
            <div
              key={item.label}
              className={cn(
                "rounded-md border border-white/10 bg-white/[0.03] p-3",
                item.label === "Message" && "sm:col-span-2"
              )}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-white/45">
                {item.label}
              </p>
              <p className="mt-1 break-words text-sm leading-6 text-[#D8D8D8]">
                {item.value || "N/A"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-full border border-white/15 px-5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function QuoteRequestsPanelContent() {
  const queryClient = useQueryClient();
  const { data: session, status: sessionStatus } = useSession();
  const accessToken = session?.accessToken;
  const [quoteToDelete, setQuoteToDelete] = useState<QuoteRequest | null>(null);

  const {
    data: quoteRows = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: quoteRequestsQueryKey,
    queryFn: () => fetchQuoteRequests(accessToken as string),
    enabled: Boolean(accessToken),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteQuoteRequest,
    onSuccess: (data) => {
      toast.success(data?.message || "Quote request deleted successfully.");
      setQuoteToDelete(null);
      void queryClient.invalidateQueries({ queryKey: quoteRequestsQueryKey });
    },
    onError: (mutationError) => {
      toast.error(
        mutationError instanceof Error
          ? mutationError.message
          : "Failed to delete quote request."
      );
    },
  });

  const isSessionLoading = sessionStatus === "loading";
  const isDeleting = deleteMutation.isPending;
  const isLoadingQuotes = isSessionLoading || isLoading;

  const handleConfirmDelete = () => {
    if (!quoteToDelete || !accessToken || isDeleting) return;

    deleteMutation.mutate({
      accessToken,
      quoteId: quoteToDelete._id,
    });
  };

  if (isLoadingQuotes) {
    return <QuoteRequestsTableSkeleton />;
  }

  return (
    <>
      <TableShell>
        <Table className="min-w-[900px] text-white">
          <TableHeader>
            <TableRow className="border-[#6A6A6A] hover:bg-transparent">
              <TableHead className="text-center text-sm text-white">Project Name</TableHead>
              <TableHead className="text-center text-sm text-white">Location</TableHead>
              <TableHead className="text-center text-sm text-white">Message</TableHead>
              <TableHead className="text-center text-sm text-white">Project Budget</TableHead>
              <TableHead className="text-center text-sm text-white">Status</TableHead>
              <TableHead className="text-center text-sm text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessionStatus === "unauthenticated" ? (
              <TableRow className="border-[#6A6A6A] hover:bg-transparent">
                <TableCell colSpan={6} className="py-10 text-center text-sm text-[#D8D8D8]">
                  Please login to view quote requests.
                </TableCell>
              </TableRow>
            ) : null}

            {isError ? (
              <TableRow className="border-[#6A6A6A] hover:bg-transparent">
                <TableCell colSpan={6} className="py-10 text-center text-sm text-red-200">
                  {error instanceof Error
                    ? error.message
                    : "Failed to fetch quote requests."}
                </TableCell>
              </TableRow>
            ) : null}

            {!isError && sessionStatus !== "unauthenticated" && quoteRows.length === 0 ? (
              <TableRow className="border-[#6A6A6A] hover:bg-transparent">
                <TableCell colSpan={6} className="py-10 text-center text-sm text-[#D8D8D8]">
                  No quote requests found.
                </TableCell>
              </TableRow>
            ) : null}

            {!isError &&
              quoteRows.map((row) => (
                <TableRow
                  key={row._id}
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
                    {row.projectBudget}
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    <StatusBadge status={formatProjectStatus(row.projectStatus)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-4 text-white">
                      <a
                        href={row.photo ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View quote attachment"
                        className={cn(
                          "transition hover:text-[#C88719]",
                          !row.photo && "pointer-events-none opacity-40"
                        )}
                      >
                        <FiEye className="h-5 w-5" />
                      </a>
                      <button
                        type="button"
                        aria-label="Delete quote"
                        onClick={() => setQuoteToDelete(row)}
                        disabled={isDeleting}
                        className="transition hover:text-[#DA1F33] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableShell>

      <DeleteQuoteConfirmationModal
        open={Boolean(quoteToDelete)}
        quote={quoteToDelete}
        isDeleting={isDeleting}
        onCancel={() => {
          if (!isDeleting) setQuoteToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export function QuoteRequestsPanel() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuoteRequestsPanelContent />
    </QueryClientProvider>
  );
}

function BookingAppointmentsPanelContent() {
  const { data: session, status: sessionStatus } = useSession();
  const accessToken = session?.accessToken;
  const [selectedAppointment, setSelectedAppointment] =
    useState<BookingAppointment | null>(null);
  const {
    data: appointmentRows = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: bookingAppointmentsQueryKey,
    queryFn: () => fetchBookingAppointments(accessToken as string),
    enabled: Boolean(accessToken),
  });

  const isLoadingAppointments = sessionStatus === "loading" || isLoading;

  if (isLoadingAppointments) {
    return <BookingAppointmentsTableSkeleton />;
  }

  return (
    <>
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
            {sessionStatus === "unauthenticated" ? (
              <TableRow className="border-[#6A6A6A] hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-[#D8D8D8]"
                >
                  Please login to view booking appointments.
                </TableCell>
              </TableRow>
            ) : null}

            {isError ? (
              <TableRow className="border-[#6A6A6A] hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-red-200"
                >
                  {error instanceof Error
                    ? error.message
                    : "Failed to fetch booking appointments."}
                </TableCell>
              </TableRow>
            ) : null}

            {!isError &&
            sessionStatus !== "unauthenticated" &&
            appointmentRows.length === 0 ? (
              <TableRow className="border-[#6A6A6A] hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-[#D8D8D8]"
                >
                  No booking appointments found.
                </TableCell>
              </TableRow>
            ) : null}

            {!isError &&
              appointmentRows.map((row) => {
                const status = formatProjectStatus(row.status);

                return (
                  <TableRow
                    key={row._id}
                    className="border-[#6A6A6A] hover:bg-[#1D1D1D]"
                  >
                    <TableCell className="text-center text-sm text-[#D8D8D8]">
                      {row.projectLocation}
                    </TableCell>
                    <TableCell className="text-center text-sm text-[#D8D8D8]">
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell className="text-center text-sm text-[#D8D8D8]">
                      {row.email}
                    </TableCell>
                    <TableCell className="max-w-[160px] whitespace-normal text-center text-sm text-[#D8D8D8]">
                      {formatAppointmentDateTime(row)}
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      <StatusBadge status={status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <button
                          type="button"
                          aria-label="View appointment details"
                          onClick={() => setSelectedAppointment(row)}
                          className="text-white transition hover:text-[#C88719]"
                        >
                          <FiEye className="h-5 w-5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableShell>

      <BookingAppointmentDetailsModal
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
      />
    </>
  );
}

export function BookingAppointmentsPanel() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookingAppointmentsPanelContent />
    </QueryClientProvider>
  );
}

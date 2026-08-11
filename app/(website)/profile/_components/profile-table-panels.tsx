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
  message: string;
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

const quoteRequestsQueryKey = ["profile", "quote-requests"];
const queryClient = new QueryClient();

function getApiBaseUrl() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  return apiBaseUrl.replace(/\/+$/, "");
}

async function fetchQuoteRequests(accessToken: string) {
  const response = await fetch(`${getApiBaseUrl()}/quote`, {
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
    `${getApiBaseUrl()}/quote/${encodeURIComponent(quoteId)}`,
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

function formatProjectStatus(status: string) {
  return status
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

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
        status === "Emergency" && "border-[#DA1F33] text-[#DA1F33]",
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

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const skeletonRows = Array.from({ length: 6 });
const skeletonColumns = [
  "Project Name",
  "Location",
  "Message",
  "Project Budget",
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

export default function QuoteRequestsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-[#6A6A6A] bg-[#141414]">
      <Table className="min-w-[900px] text-white">
        <TableHeader>
          <TableRow className="border-[#6A6A6A] hover:bg-transparent">
            {skeletonColumns.map((column) => (
              <TableHead key={column} className="text-center text-sm text-white">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {skeletonRows.map((_, index) => (
            <TableRow
              key={index}
              className="border-[#6A6A6A] hover:bg-transparent"
            >
              <TableCell>
                <SkeletonBar className="w-28" />
              </TableCell>
              <TableCell>
                <SkeletonBar className="w-36" />
              </TableCell>
              <TableCell>
                <SkeletonBar className="w-40" />
              </TableCell>
              <TableCell>
                <SkeletonBar className="w-24" />
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
    </div>
  );
}

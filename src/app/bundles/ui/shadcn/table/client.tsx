"use client"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export function TablePage() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Header</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Cell</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
} 

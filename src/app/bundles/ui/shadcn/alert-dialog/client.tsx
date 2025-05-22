"use client"

import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from "@/components/ui/alert-dialog";

export default function AlertDialogPage() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Open Alert</AlertDialogTrigger>
      <AlertDialogContent>Alert dialog content</AlertDialogContent>
    </AlertDialog>
  );
} 

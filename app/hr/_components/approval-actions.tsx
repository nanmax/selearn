"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ApprovalActionsProps {
  courseId: string;
  hrEmail: string;
}

export function ApprovalActions({ courseId, hrEmail }: ApprovalActionsProps) {
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAction = async (action: "approve" | "reject") => {
    if (action === "reject" && !note.trim()) {
      toast.error("Catatan wajib diisi untuk reject");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/course/approval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          action,
          note: note.trim() || undefined,
          reviewedBy: hrEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process approval");
      }

      toast.success(
        action === "approve"
          ? "Course berhasil disetujui!"
          : "Course berhasil ditolak!"
      );

      router.refresh();
      router.push("/hr/courses");
    } catch (error) {
      console.error("Approval error:", error);
      toast.error(
        error instanceof Error ? error.message : "Terjadi kesalahan"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <h3 className="text-lg font-semibold">Approval Decision</h3>

      <div className="space-y-2">
        <Label htmlFor="note">Note (optional for approve, required for reject)</Label>
        <Textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Tambahkan catatan untuk instruktur..."
          rows={4}
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          onClick={() => handleAction("approve")}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
          <span className="ml-2">Approve Course</span>
        </Button>

        <Button
          onClick={() => handleAction("reject")}
          disabled={isLoading}
          variant="destructive"
          className="w-full">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          <span className="ml-2">Reject Course</span>
        </Button>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { replyDiscussion } from "../actions/reply-discussion";

interface ReplyDiscussionDialogProps {
  discussionId: string;
}

export default function ReplyDiscussionDialog({
  discussionId,
}: ReplyDiscussionDialogProps) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length < 3) {
      toast.error("Balasan terlalu pendek");
      return;
    }

    const formData = new FormData();
    formData.append("discussionId", discussionId);
    formData.append("content", content);

    startTransition(async () => {
      try {
        await replyDiscussion(formData);
        toast.success("Balasan berhasil dikirim!");
        setContent("");
        setOpen(false);
      } catch (err: any) {
        toast.error(err.message || "Gagal mengirim balasan");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <MessageSquare className="h-4 w-4" />
          Balas Diskusi
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Balas Diskusi</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleReply} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tulis balasan untuk diskusi ini..."
            className="min-h-[120px]"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Mengirim..." : "Kirim"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { replyDiscussion } from "../actions/reply-discussion";

interface ReplyToReplyDialogProps {
  discussionId: string;
  parentId: string;
  quotedUser: string;
  quotedContent: string;
  children?: ReactNode;
}

export default function ReplyToReplyDialog({
  discussionId,
  parentId,
  quotedUser,
  quotedContent,
  children,
}: ReplyToReplyDialogProps) {
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
    formData.append("parentId", parentId);

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
      {/* ✅ Custom trigger */}
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
            Reply
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Balas {quotedUser}</DialogTitle>
        </DialogHeader>

        {/* ✅ Quoted message preview */}
        <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 border-l-4 border-blue-400 mb-3">
          <p className="font-semibold">{quotedUser} menulis:</p>
          <p className="italic text-gray-600 mt-1">“{quotedContent}”</p>
        </div>

        <form onSubmit={handleReply} className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Balas ${quotedUser}...`}
            className="min-h-[100px]"
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

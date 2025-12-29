"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import SendingEmail from "./_components/sending-email";

export default function SendEmailSuperAdminPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        size="lg"
        aria-label="Submit"
        variant="outline"
        className="rounded-2xl text-base font-medium flex justify-center items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <Mail />
        Send Email
      </Button>
      <SendingEmail open={open} onOpenChange={setOpen} />
    </div>
  );
}

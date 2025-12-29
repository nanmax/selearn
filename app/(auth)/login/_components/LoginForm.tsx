"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon, Loader, Loader2, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, easeOut } from "framer-motion";
import { IconBrandGoogle } from "@tabler/icons-react";

export function LoginForm() {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Masuk dengan Github, Anda akan diarahkan...");
          },
          onError: () => {
            toast.error("Kesalahan server internal!");
          },
        },
      });
    });
  }

  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Masuk dengan Google, Anda akan diarahkan...");
          },
          onError: () => {
            toast.error("Kesalahan server internal!");
          },
        },
      });
    });
  }

  function signWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email terkirim!");
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error("Terjadi kesalahan saat mengirim email, silakan coba lagi.");
          },
        },
      });
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Selamat Datang!</CardTitle>
          <CardDescription>
            Masuk dengan akun github atau Email Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            disabled={githubPending}
            onClick={signInWithGithub}
            className="w-full"
            variant="outline">
            {githubPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <GithubIcon className="size-4" /> Masuk dengan Github
              </>
            )}
          </Button>
          <Button
            disabled={googlePending}
            onClick={signInWithGoogle}
            className="w-full"
            variant="outline">
            {googlePending ? (
              <>
                <Loader className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <IconBrandGoogle className="size-4" /> Masuk dengan Google
              </>
            )}
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              Atau lanjut dengan
            </span>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>

            <Button onClick={signWithEmail} disabled={emailPending}>
              {emailPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>Lanjut dengan email...</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

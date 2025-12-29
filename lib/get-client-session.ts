"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export function useClientSession() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const { data: session } = await authClient.getSession();
        if (session?.user) {
          setUser(session.user as SessionUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  return { user, loading };
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseConfig } from "@/lib/supabase-config-inject";
import { getSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { config, isLoading } = useSupabaseConfig();

  useEffect(() => {
    if (isLoading || !config) return;

    const supabase = getSupabaseBrowserClient();
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      if (!session) {
        router.push("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [config, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-sm text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
"use client";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner'

export function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        toast.success('Signed out successfully')
        router.push('/') 
      },
    }
  })
  
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };
return (
    <Button variant='outline' onClick={handleLogout}>
        Logout <LogOut className='size-4' />
    </Button>
);
}
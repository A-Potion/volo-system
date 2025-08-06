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
  <div>
    <Button variant='outline'  className = "outline-solid outline-violet-700 flex-row bg-white text-violet-700 hover:outline-none hover:bg-violet-700 hover:text-white" onClick={handleLogout}>
        Logout <LogOut className='size-4' />
    </Button>
    </div>
);
}
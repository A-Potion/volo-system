"use client";

import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/lib/auth/auth-client"

import { useForm } from "react-hook-form"
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect } from "react";
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signIn } from "@/lib/auth/auth-client";

import { z } from "zod"
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { Loader2 } from 'lucide-react'
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { LoginForm } from "./magic-login";
 
const formSchema = z.object({
  email: z.email(),
  name: z.string().min(3).max(58),
  dob: z.string().min(1, "Date of birth is required."),
})


  type VolunteerFormProps = React.ComponentProps<"div"> & {
  id?: string;
};

export function VolunteerForm({
  className,
  id,
  ...props
}: VolunteerFormProps) {
    // 1. Define your form.
  const router = useRouter()
  const [session, setSession] = useState<any>(null)
  const [sessionIsLoading, setSessionIsLoading] = useState(true)
  const [eventInfo, setEventInfo] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true)
 
  const pathRn = usePathname()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      dob: "",
    },
  })

  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData } = await authClient.getSession()
      setSession(sessionData)
      setSessionIsLoading(false)
      if (sessionData?.user?.email) {
        form.setValue("email", sessionData.user.email)
      }
    }
    fetchSession()
  }, [])

  
   

  const fetchEventInfo = async () => {
    const res = await fetch(`/api/events/${id}/view`);
    if (res.status === 404) {
      redirect('/404')
    } 
    const data = await res.json();

    setEventInfo(data.data);
    
    setIsLoading(false)
  };

  useEffect(() => {
    fetchEventInfo();
  }, [id]);

  // 2. Define a submit handler.
const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      
      console.log(values)
      const result = await fetch(`/api/events/${id}/volunteer/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await result.json()
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

if (sessionIsLoading) {
  return (
    <div className="flex justify-center items-center h-32">
      <Loader2 className="animate-spin size-6" />
    </div>
  );
}

// Only render LoginForm after session is loaded
if (!session && !sessionIsLoading) {
  return (
    <LoginForm callback={pathRn} desc="To sign up for volunteering, you must log in first."/>
  );
}


  return (
    <div>
          <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="outline-none border-none text-center">
          <CardTitle className="outline-none border-none text-xl">Sign up to volunteer at {eventInfo.name}</CardTitle>
        </CardHeader>
        <CardContent className="outline-none border-none text-center">
              <Form {...form}>
      <form className="border-none outline-none space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6 outline-none border-none">

              <div className=" relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center border-none">
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input disabled placeholder="loading..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Should you like to use another email, please login to a different account.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <div className="grid gap-3">
                  <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Zachary Robert" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <div className="grid gap-3">
                  <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of birth</FormLabel>
                      <FormControl>
                        <Input type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className='animate-spin size-4' />  : "Volunteer!" }
                </Button>
              </div>
            </div>
          </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
    </div>
  )
}

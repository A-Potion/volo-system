"use client";

import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
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
 
const formSchema = z.object({
  email: z.string().email(),
})


type LoginFormProps = React.ComponentProps<"div"> & {
  callback?: string;
  desc?: string;
};

export function LoginForm({
  className,
  callback,
  desc,
  ...props
}: LoginFormProps ) {
    // 1. Define your form.
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
 
  // 2. Define a submit handler.
async function onSubmit(values: z.infer<typeof formSchema>) {
    await signIn.magicLink(
        {email: values.email,
            name: values.email,
            callbackURL: callback || '/dashboard',
        },
        {
            onRequest: () => setIsLoading(true),
            onResponse: () => setIsLoading(false),
            onSuccess: () => {
                toast.success("We've sent you a link!")
            },
            onError: (ctx) => {
                toast.error(ctx.error.message)
            },
        }
    )

  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="outline-solid outline-violet-700">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent>
              <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6">

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
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
                        <Input placeholder="john@doe.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <Button className="bg-violet-700 w-full hover:bg-violet-900" type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className='animate-spin size-4' />  : "Send me a link" }
                </Button>
              </div>
            </div>
          </form>
          </Form>
        </CardContent>
      </Card>
      {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  )
}

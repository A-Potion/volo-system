"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { authClient } from "@/lib/auth/auth-client"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, 'The name must be 2 characters or longer.').max(120, 'Maximum length is 120 characters.'),
  start: z.string().min(1, "Start date is required"),
  end: z.string().min(1, "End date is required"),
})



export function NewEventDialog() {
const [events, setEvents] = useState([])
const [isLoading, setIsLoading] = useState(false)

  


  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: '',
        start: '',
        end: '',
      },
        }
      )

      let event_id : string
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const event = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      toast.success("An event was created.")
      const data = await event.json()
      event_id = data.data._id
      console.log(event_id)


    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
    console.log(event_id)
    if (event_id != null) {
      redirect(`event/${event_id}`)
    }
    
  };
  
    
  

  return (
    <Dialog>
      <DialogTrigger asChild>
          <Button className="bg-violet-700 w-fit px-4 hover:bg-violet-900">
  Create a new event
</Button>
        </DialogTrigger>
      <div >
      <DialogContent className="sm:max-w-[25%]">
        <DialogHeader className="items-center">
        <DialogTitle>Create a new event</DialogTitle>
      </DialogHeader>
        
    <Form {...form}>
      
      <form className='flex items-center justify-center' onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
        <div className="grid gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event name</FormLabel>
              <FormControl>
                <Input placeholder="Daydream Vienna" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="grid gap-3">
        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="grid gap-3">
        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input type='date' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <DialogFooter>
        <div className="items-center justify-center flex-row">
          <DialogClose asChild>
              <Button className="min-w-1/3" variant="outline">Cancel</Button>
            </DialogClose>
          <Button className="min-w-1/3" type="submit">{ isLoading ? ( <Loader2 className='animate-spin size-4' /> ) : ( "Create" ) }</Button>
        </div>
        </DialogFooter>
        </div>
      </form>
    </Form>
    </DialogContent>
    </div>
    </Dialog>
  )
}
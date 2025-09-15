import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"
import { toast } from "sonner"


interface DeleteDialogProps {
  name: string;
  id: string | string[];
}


export function DeleteDialog({ name, id }: DeleteDialogProps) { {

    async function deleteEvent() {
        const res = await fetch(`/api/events/${id}/delete`, {
        method: 'DELETE',
        })
        if (res.status === 201 || res.status === 404) {
        redirect('/404')
        } else if (res.status != 403) {
        location.reload()
        } else if (res.status === 403) {
        const data = await res.json();
        toast.error(data.message)
        }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>Delete</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete {name}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => deleteEvent()} >Yes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}}

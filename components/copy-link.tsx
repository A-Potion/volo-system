import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { toast } from "sonner"

export function CopyLinkDialog({whatto, lnk}: string) {
  function CopyLinkButton() {
    navigator.clipboard.writeText(lnk)
    toast.success("Copied to clipboard!")
  }
  
    return(
        <div>
          <Dialog>
  <DialogTrigger asChild>
    <Button>Get volunteer sign-up link</Button>
    </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Link to {whatto}.</DialogTitle>
      <DialogDescription>
        It's: {lnk}. 
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={() => CopyLinkButton()} variant="outline" >Click to copy!</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
        </div>
    )
}
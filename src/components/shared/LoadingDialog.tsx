import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const LoadingDialog = ({ isOpen }: { isOpen: boolean }) => {
     return (
  <Dialog open={isOpen} >
    <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent>
          <div className="flex-center">
            <Loader2 className="loader-black" />
          </div>
        <DialogHeader className="flex-center">
          <DialogTitle>Authenticating...</DialogTitle>
          <DialogDescription>
            Please wait for a while.
          </DialogDescription>
        </DialogHeader>
        
      </DialogContent>
    </Dialog>
)};

export default LoadingDialog;
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserContext } from "@/context/AuthContext";
import { useEmailVerificationConfirm } from '@/lib/react-query/queriesAndMutations';
import { Loader2 } from "lucide-react";
import { useEffect, useState } from 'react';
type EmailVerificationConfirmProps = {
    isOpen: boolean,
    onOpenChange: (isOpen: boolean) => void,
    userId: string,
    secret: string
}
const EmailVerificationConfirm = ({ isOpen, onOpenChange, userId, secret }: EmailVerificationConfirmProps) => {
    const { mutateAsync: emailVerificationConfirm, isPending } = useEmailVerificationConfirm();
    const { user } = useUserContext();
    const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
       const emailConfirm = async () => {
        
       const session = await emailVerificationConfirm({
          userId: userId,
          secret: secret
        })
        console.log(session)
      }
      
      emailConfirm()
      
    }, []);
     return (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent>
        {
          isPending ? 
          <div className="flex-center">
            <Loader2 className="border border-black rounded-md mr-2 h-5 w-5 animate-spin" />
          </div>
          
          :
          (
        <DialogHeader>
          <DialogTitle>{userId}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
)};

export default EmailVerificationConfirm;
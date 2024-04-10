import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
interface LoadingButtonProps {
  children?: React.ReactNode; 
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ children }) => {
  return (
   <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {children ? children : "Please wait"}
    </Button>
  )
}

export default LoadingButton
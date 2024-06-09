import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
interface LoadingButtonProps {
  children?: React.ReactNode; 
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ children }) => {
  return (
   <Button disabled className="bg-light-1 hover:bg-light-2 border border-black rounded-md">
      <Loader2 className="loader-black" />
      {children ? children : "Please wait"}
    </Button>
  )
}


export default LoadingButton
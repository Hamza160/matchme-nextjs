import { HeroUIProvider } from "@heroui/react"
import { PropsWithChildren } from "react"
import { ToastContainer, toast } from 'react-toastify';

const Providers = ({children}:PropsWithChildren) => {
  return (
    <HeroUIProvider>
        {children}
        <ToastContainer 
          position="bottom-right"
          hideProgressBar
        />
    </HeroUIProvider>
  );
}

export default Providers;
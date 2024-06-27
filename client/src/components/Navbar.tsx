import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TextAlignJustifyIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GoogleButton from "./SignInButton";
import { Upload } from "./upload";
import { onAuthStateChangedHelper } from "@/firebase/firebase";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { User } from "firebase/auth";
import { userAtom } from "@/store";

export const Navbar: React.FC = () => {
  const scrolled = useScrollTop();
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user: User | null) => {
      setUser(user);
    });

    return () => unsubscribe();
  });

  return (
    <>
      <div
        className={cn(
          "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full",
          scrolled && "border-b shadow-sm"
        )}
      >
        <div className="flex items-center p-2">
          <div className="ml-4">
            <Link to="/" className="flex items-center no-underline">
              <img src="/breadSmall.png" alt="Toasty" className="w-10 h-10" />
              <div className="ml-2">Toasty</div>
            </Link>
          </div>
        </div>
        <div className="ml-auto flex items-center mr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mr-2" variant="ghost" size="sm">
                <TextAlignJustifyIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Coming Soon</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {user && <Upload />}
          <GoogleButton />
        </div>
      </div>
    </>
  );
};
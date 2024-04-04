import React from "react";
import { Button } from "@/components/ui/button";
import { signInWithGoogle, signOut } from "@/firebase/firebase";
import { useAtom } from "jotai";
import { userAtom } from "@/store";

const GoogleButton: React.FC = () => {
  const [user] = useAtom(userAtom);

  return (
    <>
      {user ? (
        <Button className="mr-2" variant="ghost" size="sm" onClick={signOut}>
          Sign Out
        </Button>
      ) : (
        <Button
          className="flex items-center justify-center bg-white text-gray-600 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 focus:outline-none mr-2"
          size="sm"
          variant="ghost"
          onClick={signInWithGoogle}
        >
          <span className="font-medium">Sign In</span>
        </Button>
      )}
    </>
  );
};

export default GoogleButton;

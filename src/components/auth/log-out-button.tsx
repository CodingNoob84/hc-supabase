import { logOut } from "@/app/(auth)/_actions";
import { Button } from "../ui/button";

export const LogOutButton = () => {
  return (
    <form action={logOut} className="w-full">
      <Button className="w-full">LogOut</Button>
    </form>
  );
};

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./toggle-button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, UserCircleIcon } from "lucide-react";

export default function AppNavbar() {
  return (
    <div className=" mt-2">
      <div className=" flex gap-3 justify-between backdrop-blur-2xl p-1 ">
        <SidebarTrigger />
        <div className=" flex gap-2 ">
          <ModeToggle />
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className=" rounded-full">
                  <User className=" text-brand-red" />{" "}
                  <span className=" text-xs text-brand-teal">Rahadul Haq</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-36" align="start">
                <DropdownMenuItem disabled className=" text-xs text-wrap">
                  haqrahadul@gmail.com
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircleIcon /> <span className=" pb-[2px]">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <LogOut size={2} />
                  <span className=" pb-1">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

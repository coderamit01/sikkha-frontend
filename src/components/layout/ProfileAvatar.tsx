"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { logOut } from "@/services/auth.service";
import { IUser, Role } from "@/types/user.types";
import {
  BadgeCheckIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DropdownMenuAvatar({ profile }: { profile: IUser }) {
  const router = useRouter();

  const profileLink = () => {
    if (profile.role === Role.STUDENT) {
      return "/dashboard/profile";
    }
    if (profile.role === Role.TUTOR) {
      return "/tutor/profile";
    }
    return "/admin/profile";

  };

  const handleLogOut = async () => {
    try {
      const result = await logOut();
      if (result?.success) {
        toast.success("Logged out successfully!", { position: "top-right" });
      } else {
        toast.error(result?.message || "Failed to log out", { position: "top-right" });
      }
      router.push("/login");

    } catch (error) {
      toast.error("Failed to log out. Please try again.", { position: "top-right" });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile.image} className="rounded-full" />
            <AvatarFallback className="bg-[#25a5a21c] text-brand font-bold">{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheckIcon />
            <Link href={profileLink()}> Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar";
import {API_ENDPOINTS} from "@/constants/api.endpoint.ts";
import {REQUEST_METHODS} from "@/constants/api.enum.ts";
import {useApiMutation} from "@/hooks/useApiService.ts";
import {useAuthContext} from "@/hooks/useAuthContext.ts";
import {useNavigate} from "react-router-dom";

export function SidebarProfile({
                                   profile
                               }: {
    profile: {
        fullname: string;
        username: string;
    };
}) {
    const { isMobile } = useSidebar();
    const auth = useAuthContext();
    const {mutate} = useApiMutation(API_ENDPOINTS.SIGNOUT_ENDPOINT,REQUEST_METHODS.POST,undefined,{"user_id":auth.user?.username});
    const navigate = useNavigate();

    const handleSignOut = () => {
        mutate({"sample_string":"This is a sample String"},{
            onSuccess: () => {
                console.log("Sign Out");
                navigate("/");
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground py-7"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                                <AvatarFallback className="rounded-lg">{profile.fullname.slice(0,2)}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {profile.fullname}
                </span>
                                <span className="truncate text-xs">
                  {profile.username}
                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                                    <AvatarFallback className="rounded-lg">{profile.fullname.slice(0,2)}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {profile.fullname}
                  </span>
                                    <span className="truncate text-xs">
                    {profile.username}
                  </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

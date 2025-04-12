import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader} from '@/components/ui/sidebar'
import {Button} from "@/components/ui/button";
import {sidebar_data} from '@/data/sidebar.data'
import {SidebarUtilities} from "@/components/sidebar/SidebarUtilities";
import {SidebarProfile} from '@/components/sidebar/SidebarProfile';
import {useAuthContext} from '@/hooks/useAuthContext';
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {appname} from "@/constants/company.const.ts";
import {useApiQuery} from "@/hooks/useApiService.ts";
import {API_ENDPOINTS} from "@/constants/api.endpoint.ts";
import {useEffect} from "react";


const AppSidebar = () => {
    document.body.classList.add('dark');
    const auth = useAuthContext();
    console.log(auth);


    const today = useApiQuery<string[][]>(API_ENDPOINTS.TODAY_ENDPOINT,{"user_id":auth.user ? auth.user.username : ""},undefined,true);
    const yesterday = useApiQuery<string[][]>(API_ENDPOINTS.YESTERDAY_ENDPOINT,{"user_id":auth.user ? auth.user.username : ""},undefined,true);
    const all_history = useApiQuery<string[][]>(API_ENDPOINTS.ALL_ENDPOINT,{"user_id":auth.user ? auth.user.username : ""},undefined,true);


    useEffect(() => {
        console.log(today.data);
    }, [today.data]);

    useEffect(() => {
        console.log(yesterday.data);
    }, [yesterday.data]);

    useEffect(() => {
        console.log(all_history.data);
    }, [all_history.data]);


    return <Sidebar className=" border-none ">
        <SidebarHeader className="">
            <Button variant={"ghost"} className="py-8 text-left justify-start px-10 cursor-pointer text-xl">
                {appname}
            </Button>
        </SidebarHeader>

        <SidebarContent className="py-2">
            <ScrollArea className={'overflow-y-auto '}>
                <SidebarUtilities utilities={today.data ? today.data : [[]]} title={'Today'}/>
                <SidebarUtilities utilities={yesterday.data ? yesterday.data : [[]]} title={'Yesterday'}/>
                <SidebarUtilities utilities={all_history.data ? all_history.data : [[]]} title={'History'}/>
            </ScrollArea>
        </SidebarContent>

        <SidebarFooter className='py-5'>
            <SidebarProfile profile={sidebar_data.sidebar_profile}/>
        </SidebarFooter>
    </Sidebar>;
}

export default AppSidebar
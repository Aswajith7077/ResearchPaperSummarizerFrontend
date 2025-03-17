import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader} from '@/components/ui/sidebar'
import {Button} from "@/components/ui/button";
import {sidebar_data} from '@/data/sidebar.data'
import {SidebarUtilities} from "@/components/sidebar/SidebarUtilities";
import {SidebarProfile} from '@/components/sidebar/SidebarProfile';
import {useAuthContext} from '@/hooks/useAuthContext';
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {appname} from "@/constants/company.const.ts";


const AppSidebar = () => {
    document.body.classList.add('dark');
    const auth = useAuthContext();
    console.log(auth);

    return <Sidebar className=" border-none ">
        <SidebarHeader className="">
            <Button variant={"ghost"} className="py-8 text-left justify-start px-10 cursor-pointer text-xl">
                {appname}
            </Button>
        </SidebarHeader>

        <SidebarContent className="py-2">
            <ScrollArea className={'overflow-y-auto '}>
                <SidebarUtilities utilities={sidebar_data.sidebar_utilities.slice(0,2)} title={'Today'}/>
                <SidebarUtilities utilities={sidebar_data.sidebar_utilities.slice(0,7)} title={'Yesterday'}/>
                <SidebarUtilities utilities={sidebar_data.sidebar_utilities} title={'History'}/>
            </ScrollArea>
        </SidebarContent>

        <SidebarFooter className='py-5'>
            <SidebarProfile profile={sidebar_data.sidebar_profile}/>
        </SidebarFooter>
    </Sidebar>;
}

export default AppSidebar
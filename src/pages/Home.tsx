import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/AppSidebar.tsx";
import {Outlet} from "react-router-dom";

const Home = () => {
    document.body.classList.add("dark")
    return <SidebarProvider>


        <div className={'flex flex-row h-screen w-screen'}>
            <AppSidebar />
            <div className={'flex flex-row w-full h-screen'}>
                <Outlet />
            </div>
        </div>


    </SidebarProvider>
};


export default Home;
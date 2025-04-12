import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import AppSidebar from "@/components/AppSidebar.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useAuthContext} from "@/hooks/useAuthContext.ts";
import {Button} from "@/components/ui/button.tsx";

const Home = () => {
    document.body.classList.add("dark")
    const navigate = useNavigate();
    const auth = useAuthContext();
    return <>
        {!auth.accessToken && <div className={'flex flex-col items-center justify-center w-screen h-screen'}>
            <h1 className="text-4xl font-semibold text-center mb-5">
                Unauthorized
            </h1>
            <p>
                Trying to use the product? Authenticate to access the materials!
            </p>
            <Button variant={'outline'} className={'cursor-pointer py-6 px-7 rounded-full my-10 text-md '} onClick={() => navigate('/')}>
                Back to Home
            </Button>
        </div>}
        {auth.accessToken && <SidebarProvider>


        <div className={'flex flex-row h-screen w-screen'}>
            <AppSidebar />
            <div className={'flex flex-row w-full h-screen'}>
                <Outlet />
            </div>
        </div>


        </SidebarProvider>}
    </>
};


export default Home;
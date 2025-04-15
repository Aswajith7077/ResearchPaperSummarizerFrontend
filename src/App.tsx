import {Button} from "@/components/ui/button.tsx";
import {motion} from "framer-motion";

import {useNavigate} from "react-router-dom";
import {appname} from "@/constants/company.const.ts";


const App = () => {

    const navigate = useNavigate();

    document.body.classList.add("dark");
    return <main className={'flex flex-col items-center justify-between p-10 w-screen h-screen'}>
        <div className={'flex flex-row w-full px-20 justify-between'}>
            <h1 className={'font-semibold text-4xl'}>{appname}</h1>
            <section className={'flex flex-row gap-5'}>
                <Button variant={'default'} className={'border py-5 px-6 cursor-pointer'} onClick={() => navigate('/login')}>
                    Login
                </Button>
                <Button variant={'outline'} className={'py-5 px-6 cursor-pointer'} onClick={() => navigate('/signin')}>
                    Signup
                </Button>
            </section>
        </div>
        <section className={'flex flex-col w-fit  items-center justify-between gap-10'}>
            <h1 className={'font-semibold text-transparent bg-clip-text text-4xl text-center w-2/3 leading-loose bg-gradient-to-br from-white via-cyan-500 to-blue-400'}>
                Instantly unlock key insights from complex research papers.
                Save time, stay sharp, and never miss the big idea.
            </h1>
            <motion.button
                initial={{background: 'transparent'}}
                whileHover={{
                    background: 'linear-gradient(to bottom right, #06b6d4, #3b82f6)',
                    transition: {duration: 1},
                }}
                whileTap={{scale:0.9,transition: {duration: 1,}}}
                className="px-10 text-lg py-3 rounded-full cursor-pointer text-white border-2 transition-all duration-300"
                onClick={() => navigate('/login')}
            >
                Get Started
            </motion.button>
        </section>
        <p className={'text-gray-400'}>© Copyrights. All Rights Reserved</p>
    </main>
};


export default App;
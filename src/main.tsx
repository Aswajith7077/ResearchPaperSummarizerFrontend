import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import router from "./routes/routes.tsx";
import AuthContextProvider from "@/context/auth.context.tsx";

const client = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthContextProvider>
          <QueryClientProvider client={client}>
              <RouterProvider router={router}/>
          </QueryClientProvider>
      </AuthContextProvider>
  </StrictMode>
)

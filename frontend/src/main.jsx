import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./Contexts/ContextProvider.jsx";
import { ThemeProvider } from "@/components/theme-provider"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ContextProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RouterProvider router={router} />
            </ThemeProvider>
        </ContextProvider>
    </StrictMode>
);

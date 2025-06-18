import { useState, useEffect } from "react";

import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { Contact2 } from "./NousContacter.jsx";
import { ResponsiveNavigationMenu } from "./Acceuil/NavBar.jsx";
import Footer2 from "./ui/footer.jsx";

function Contact (props) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const controlsLeft = useAnimation();
    const controlsRight = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controlsLeft.start({ x: 0, opacity: 1 });
            controlsRight.start({ x: 0, opacity: 1 });
        }
    }, [inView, controlsLeft, controlsRight]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/25 backdrop-blur-sm shadow-sm"
                        : "bg-transparent"
                }`}
            >
                <div className="container mx-auto h-18 flex justify-center">
                    <ResponsiveNavigationMenu className="m-0 p-0" />
                </div>
            </header>

            <main className="pt-18">

                <section className="container mx-auto">
                    <Contact2 />
                </section>
                
                <section className="border-t">
                    <Footer2 />
                </section>
            </main>
        </>
    );
}

export default Contact ;

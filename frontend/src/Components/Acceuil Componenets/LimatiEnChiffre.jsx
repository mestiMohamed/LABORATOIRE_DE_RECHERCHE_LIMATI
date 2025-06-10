import { useState, useEffect } from "react";
import { ResponsiveNavigationMenu } from "../Acceuil/NavBar.jsx";

import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Footer2 from "../../Components/ui/footer.jsx";
import { Community1 } from "../Intro.jsx";
import { Feature73 } from "../PresentationHeader.jsx";
import { Team1 } from "../Team.jsx";
import { Stats6 } from "../LimatiEnChiffre.jsx";
import { LimatiEnChiffreNav } from "../limatiEnChiffreNav.jsx";

function LimatiEnChiffre (props) {
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
                    <LimatiEnChiffreNav />
                </section>
                
                <section className="bg-black">
                    <Footer2 />
                </section>
            </main>
        </>
    );
}

export default LimatiEnChiffre ;

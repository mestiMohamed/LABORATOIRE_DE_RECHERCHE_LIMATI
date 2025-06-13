import logofp from "../assets/logos/logo-fp.png"
import logousms from "../assets/logos/logo_usms1.png"
import logoinwi from "../assets/logos/Logo_inwi.png"
import logokarama from "../assets/logos/logo-KaramaBus.png"
import logolenovo from "../assets/logos/lenovo_logo.png"
import logoalbarid from "../assets/logos/Al_Barik_Bank_logo.png"

const Logos8 = ({
    title = "Nos partenaires",
    subtitle = "Institutions, universités et entreprises partenaires engagées dans la recherche, l’innovation et la transformation numérique.",
    logos = [
        {
            name: "Vercel",
            logo: logofp,
            className: "h-16 w-24"
        },
        {
            name: "Astro",
            logo: logousms,
            className: "h-16 w-20"
        },
        {
            name: "Supabase",
            logo: logoinwi,
            className: "h-16 w-36"
        },
        {
            name: "Figma",
            logo: logokarama,
            className: "h-16 w-44"
        },
        {
            name: "lenovo",
            logo: logolenovo,
            className: "h-36 w-44"
        },
        {
            name: "albarid",
            logo: logoalbarid,
            className: "h-24 w-44"
        },
    ],
}) => {
    return (
        <section className="">
            <div className="container">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="mt-1 text-muted-foreground">{subtitle}</p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:gap-12">
                        {logos.map((logo, index) => (
                            <img
                                key={index}
                                src={logo.logo}
                                alt={`${logo.name} logo`}
                                width={309}
                                height={100}
                                className={logo.className}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Logos8 };

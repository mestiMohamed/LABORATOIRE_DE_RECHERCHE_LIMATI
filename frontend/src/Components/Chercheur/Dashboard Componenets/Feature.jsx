import axiosClient from "../../../axiosClient";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { useEffect } from "react";
import PubsChart from "./charts/PubsChart";
import { ProjetsChart } from "./charts/ProjetsChart";
import { DonneesPerso } from "../../DonneesPerso";
import {ScrollArea} from "../../../Components/ui/scroll-area"

const Feature166 = ({
    heading = "Tableau de bord du chercheur",
    description = `suivez votre activité scientifique, vos projets, publications et équipes.`,

    feature1 = {
        title: "Publications récentes",
        description: "Visualisez vos publications sur les 6 derniers mois.",
        graph: <PubsChart />,
    },
    feature2 = {
        title: "Mes coordonnées",
        description:
            "Vos données personnelles",
        content: <DonneesPerso />
    },
    feature3 = {
        title: "Brand Integration",
        description:
            "Seamlessly incorporating your brand identity into every aspect of your website's design.",
        graph: <ProjetsChart />,
    },
    feature4 = {
        title: "Performance Optimization",
        description:
            "Ensuring fast loading times and smooth performance through optimized code and assets.",
        image: "https://shadcnblocks.com/images/block/placeholder-2.svg",
    },
}) => {
    const { user, setUser } = useStateContext();
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, [setUser]);
    return (
        <section className=" container mx-auto">
            <div className=" ">
                <div className="mb-24 flex flex-col items-center gap-6">
                    <h1 className="text-center text-3xl font-semibold lg:max-w-3xl lg:text-5xl">
                        {heading}
                    </h1>
                    <p className="text-center text-lg font-medium text-muted-foreground md:max-w-4xl lg:text-xl">
                        Bienvenue{" "}
                        <span className="font-semibold">
                            {user?.name || "Chercheur"}
                        </span>
                        , {description}
                    </p>
                </div>
                <div className="relative flex justify-center">
                    <div className="border-muted2 relative flex w-full flex-col border md:w-1/2 lg:w-full">
                        <div className="relative flex flex-col lg:flex-row">
                            <div className="border-muted2 flex flex-col  border-b border-solid p-10 lg:w-3/5 lg:border-r lg:border-b-0">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {feature1.title}
                                    </h2>
                                    <p className="text-muted-foreground">
                                        {feature1.description}
                                    </p>
                                </div>
                                <div className="mt-5 w-[33rem]">
                                    {feature1.graph}
                                </div>
                            </div>
                            <div className="flex flex-col gap-10 p-10 lg:w-2/5">
                                <div>
                                    <h2 className="text-xl font-semibold pb-0 mb-0">
                                        {feature2.title}
                                    </h2>
                                    <p className="text-muted-foreground">
                                        {feature2.description}
                                    </p>
                                </div>
                                <div >{feature2.content}</div>
                            </div>
                        </div>
                        <div className="border-muted2 relative flex flex-col border-t border-solid lg:flex-row">
                            <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-2/5 lg:border-r lg:border-b-0">
                                <h2 className="text-xl font-semibold">
                                    {feature3.title}
                                </h2>
                                <p className="text-muted-foreground">
                                    {feature3.description}
                                </p>
                                <div>
                                    {feature3.graph}
                                </div>
                            </div>
                            <div className="flex flex-col justify-between p-10 lg:w-3/5">
                                <h2 className="text-xl font-semibold">
                                    {feature4.title}
                                </h2>
                                <p className="text-muted-foreground">
                                    {feature4.description}
                                </p>
                                <img
                                    src={feature4.image}
                                    alt={feature4.title}
                                    className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Feature166 };

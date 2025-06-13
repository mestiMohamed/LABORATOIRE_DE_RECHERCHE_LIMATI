import { Chart5 } from "./ChartsEssai/Chart5";
import { Chart4 } from "./ChartsEssai/Chert4";
import { StatsSection } from "./CherCardStats";

const Feature13 = ({ heading = "Tableau de bord" }) => {
    return (
        <section className="container ">
            <div className="container max-w-7xl mx-auto ">
                <h2 className="text-3xl lg:text-4xl font-semibold">
                    {heading}
                </h2>
                <div className="flex flex-col gap-9 ">
                    <div className="mt-10">
                        <StatsSection />
                    </div>
                    <div className="flex flex-row gap-8">
                        <div className="w-1/2">
                            <Chart4 />
                        </div>
                        <div className="w-1/2">
                            <Chart5 />
                        </div>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </section>
    );
};

export { Feature13 };

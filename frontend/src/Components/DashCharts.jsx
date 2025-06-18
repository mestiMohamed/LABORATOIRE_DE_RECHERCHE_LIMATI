import { Button } from "@/components/ui/button";
import { Chart3 } from "./ChartsEssai/Chart3";
import { Chart2 } from "./ChartsEssai/Chart2";
import { Chart1 } from "./ChartsEssai/Chart1";

const defaultCompanies = [
    {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
        alt: "Arc",
    },
    {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
        alt: "Descript",
    },
    {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
        alt: "Mercury",
    },
    {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
        alt: "Ramp",
    },
    {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
        alt: "Retool",
    },
    {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
        alt: "Watershed",
    },
];

const defaultAchievements = [
    { label: "Companies Supported", value: "300+" },
    { label: "Projects Finalized", value: "800+" },
    { label: "Happy Customers", value: "99%" },
    { label: "Recognized Awards", value: "10+" },
];

const DashCharts = ({
}) => {
    return (
        <section className="py-10 flex flex-col gap-10">
            <div className="max-w-full">
                <Chart3 />
            </div>
            <div className="flex flex-col lg:flex-row gap-16">
                <div className="max-w-full lg:w-1/2">
                    <Chart1 />
                </div>
                <div className="max-w-full lg:w-1/2">
                    <Chart2 />
                </div>
            </div>
        </section>
    );
};

export { DashCharts };

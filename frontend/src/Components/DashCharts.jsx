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
    title = "About Us",
    description = "Shadcnblocks is a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age.",
    mainImage = {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
        alt: "placeholder",
    },
    secondaryImage = {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
        alt: "placeholder",
    },
    breakout = {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
        alt: "logo",
        title: "Hundreds of blocks at Shadcnblocks.com",
        description:
            "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
        buttonText: "Discover more",
        buttonUrl: "https://shadcnblocks.com",
    },
    companiesTitle = "Valued by clients worldwide",
    companies = defaultCompanies,
    achievementsTitle = "Our Achievements in Numbers",
    achievementsDescription = "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
    achievements = defaultAchievements,
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

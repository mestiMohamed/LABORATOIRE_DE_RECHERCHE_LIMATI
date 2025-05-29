import { useEffect, useState } from "react";
import axiosClient from "@/axiosClient";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";

function getChartConfig() {
    return {
        chercheur: {
            label: "Chercheur",
            color: getComputedStyle(document.documentElement)
                .getPropertyValue("--color-chart-1")
                .trim(),
        },
        equipe: {
            label: "Équipe",
            color: getComputedStyle(document.documentElement)
                .getPropertyValue("--color-chart-2")
                .trim(),
        },
    };
}

export function ProjetDeRechercheChart() {
    const [chartData, setChartData] = useState([]);
    const [chartConfig, setChartConfig] = useState(getChartConfig());

    useEffect(() => {
        axiosClient.get("/admin/par-type").then((res) => {
            setChartData(res.data);
        });

        const observer = new MutationObserver(() => {
            setChartConfig(getChartConfig());
        });

        // Observe changement de classe `.dark` sur <html> ou <body>
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Projets de Recherche</CardTitle>
                <CardDescription>
                    Répartition par type sur les 6 derniers mois
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar
                            dataKey="chercheur"
                            fill={chartConfig.chercheur.color}
                            radius={4}
                        />
                        <Bar
                            dataKey="equipe"
                            fill={chartConfig.equipe.color}
                            radius={4}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Données des 6 derniers mois{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Comparaison des projets réalisés par des chercheurs seuls ou
                    en équipe
                </div>
            </CardFooter>
        </Card>
    );
}

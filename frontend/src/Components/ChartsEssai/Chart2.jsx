"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import axiosClient from "../../axiosClient";
import { useState, useEffect } from "react";

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

export const description = "Un graphique en aires avec un dégradé";

const chartConfig = {
    lastYear: {
        label: "Année dernière",
        color: "var(--chart-1)",
    },
    thisYear: {
        label: "Cette année",
        color: "var(--chart-2)",
    },
};

export function Chart2() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosClient.get(
                    "/projects/last5months"
                );
                const moisFrancais = [
                    "Janvier",
                    "Février",
                    "Mars",
                    "Avril",
                    "Mai",
                    "Juin",
                    "Juillet",
                    "Août",
                    "Septembre",
                    "Octobre",
                    "Novembre",
                    "Décembre",
                ];

                const formattedData = response.data.map((item) => {
                    const [year, monthNum] = item.month.split("-");
                    const monthIndex = parseInt(monthNum, 10) - 1;
                    return {
                        month: moisFrancais[monthIndex] ?? item.month,
                        thisYear: item.thisYear,
                        lastYear: item.lastYear,
                    };
                });

                setChartData(formattedData);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données :",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Projets de recherche - Année vs Année dernière</CardTitle>
                <CardDescription>
                    Nombre de projets mensuels (5 derniers mois, mois courant exclu)
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillLastYear" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-lastYear)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-lastYear)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillThisYear" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-thisYear)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-thisYear)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="lastYear"
                            type="natural"
                            fill="url(#fillLastYear)"
                            fillOpacity={0.4}
                            stroke="var(--color-lastYear)"
                            stackId="a"
                        />
                        <Area
                            dataKey="thisYear"
                            type="natural"
                            fill="url(#fillThisYear)"
                            fillOpacity={0.4}
                            stroke="var(--color-thisYear)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Croissance de 5.2% ce mois-ci <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            {/* Tu peux dynamiser cette plage aussi si besoin */}
                            Derniers 5 mois (hors mois courant)
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

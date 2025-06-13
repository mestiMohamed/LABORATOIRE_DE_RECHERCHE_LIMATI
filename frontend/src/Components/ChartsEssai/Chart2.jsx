"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

const chartData = [
    { month: "Janvier", lastYear: 4, thisYear: 7 },
    { month: "Février", lastYear: 3, thisYear: 6 },
    { month: "Mars", lastYear: 5, thisYear: 8 },
    { month: "Avril", lastYear: 2, thisYear: 5 },
    { month: "Mai", lastYear: 4, thisYear: 6 },
    { month: "Juin", lastYear: 3, thisYear: 7 },
];

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
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Projets de recherche - Année vs Année dernière
                </CardTitle>
                <CardDescription>
                    Nombre de projets mensuels entre Janvier et Juin
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
                            // affichage complet des mois en français (court)
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <defs>
                            <linearGradient
                                id="fillLastYear"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
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
                            <linearGradient
                                id="fillThisYear"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
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
                            Croissance de 5.2% ce mois-ci{" "}
                            <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            Janvier - Juin 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

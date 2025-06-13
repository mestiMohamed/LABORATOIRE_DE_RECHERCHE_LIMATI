"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Un graphique interactif des publications";

const chartData = [
    { date: "2025-05-12", articles: 2 },
    { date: "2025-05-13", articles: 1 },
    { date: "2025-05-14", articles: 1 },
    { date: "2025-05-15", articles: 3 },
    { date: "2025-05-16", articles: 2 },
    { date: "2025-05-17", articles: 0 },
    { date: "2025-05-18", articles: 3 },
    { date: "2025-05-19", articles: 2 },
    { date: "2025-05-20", articles: 2 },
    { date: "2025-05-21", articles: 2 },
    { date: "2025-05-22", articles: 0 },
    { date: "2025-05-23", articles: 3 },
    { date: "2025-05-24", articles: 1 },
    { date: "2025-05-25", articles: 2 },
    { date: "2025-05-26", articles: 0 },
    { date: "2025-05-27", articles: 3 },
    { date: "2025-05-28", articles: 0 },
    { date: "2025-05-29", articles: 3 },
    { date: "2025-05-30", articles: 1 },
    { date: "2025-05-31", articles: 1 },
    { date: "2025-06-01", articles: 3 },
    { date: "2025-06-02", articles: 2 },
    { date: "2025-06-03", articles: 1 },
    { date: "2025-06-04", articles: 3 },
    { date: "2025-06-05", articles: 0 },
    { date: "2025-06-06", articles: 1 },
    { date: "2025-06-07", articles: 3 },
    { date: "2025-06-08", articles: 2 },
    { date: "2025-06-09", articles: 3 },
    { date: "2025-06-10", articles: 0 },
    { date: "2025-06-11", articles: 2 },
    { date: "2025-06-12", articles: 1 },
];

const chartConfig = {
    articles: {
        label: "Articles scientifiques",
        color: "var(--chart-2)",
    },
};

export function Chart3() {
    const [activeChart, setActiveChart] = React.useState("articles");

    const total = React.useMemo(
        () => ({
            articles: chartData.reduce((acc, curr) => acc + curr.articles, 0),
        }),
        []
    );

    return (
        <Card className="py-0">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                    <CardTitle>Statistiques des publications</CardTitle>
                    <CardDescription>
                        Nombre total de publications des 30 derniers jours
                    </CardDescription>
                </div>
                <div className="flex">
                    {["articles"].map((key) => {
                        const chart = key;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-muted-foreground text-xs">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg leading-none font-bold sm:text-3xl">
                                    {total[key].toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("fr-FR", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[180px]"
                                    nameKey="publications"
                                    labelFormatter={(value) =>
                                        new Date(value).toLocaleDateString(
                                            "fr-FR",
                                            {
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )
                                    }
                                />
                            }
                        />
                        <Bar
                            dataKey={activeChart}
                            fill={`var(--color-${activeChart})`}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

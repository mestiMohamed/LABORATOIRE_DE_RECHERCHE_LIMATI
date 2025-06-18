"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import axiosClient from "../../axiosClient";

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
import { useState } from "react";
import { useEffect } from "react";

export const description = "Un graphique interactif des publications";

const chartConfig = {
    articles: {
        label: "Articles scientifiques",
        color: "var(--chart-2)",
    },
};

export function Chart3() {
    const [chartData, setChartData] = React.useState([]);
    const [activeChart, setActiveChart] = React.useState("articles");

    // Fetch dynamique
    React.useEffect(() => {
        axiosClient
            .get("/publications/recent")
            .then((response) => {
                const formattedData = response.data.map((item) => ({
                    date: item.date,
                    articles: item.articles,
                }));
                setChartData(formattedData);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des publications :",
                    error
                );
            });
    }, []);

    const total = React.useMemo(
        () => ({
            articles: chartData.reduce((acc, curr) => acc + curr.articles, 0),
        }),
        [chartData]
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

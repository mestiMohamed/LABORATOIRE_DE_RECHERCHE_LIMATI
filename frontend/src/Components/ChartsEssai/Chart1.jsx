"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
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
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useEffect } from "react";

export const description = "Un graphique circulaire interactif";

const chartConfig = {
    "2025-01": { label: "Janvier", color: "var(--chart-1)" },
    "2025-02": { label: "Février", color: "var(--chart-2)" },
    "2025-03": { label: "Mars", color: "var(--chart-3)" },
    "2025-04": { label: "Avril", color: "var(--chart-4)" },
    "2025-05": { label: "Mai", color: "var(--chart-5)" },
};

export function Chart1() {
    const id = "pie-interactive";

    const [eventData, setEventData] = useState([]);

    const [activeMonth, setActiveMonth] = useState("");

    useEffect(() => {
        axiosClient
            .get("/events/permonth")
            .then((response) => {
                setEventData(response.data);
            })
            .catch((error) => {
                console.error("Erreur chargement données événements", error);
            });
    }, []);

    const months = eventData.map((item) => item.month);

    const activeIndex = React.useMemo(
        () => eventData.findIndex((item) => item.month === activeMonth),
        [activeMonth, eventData]
    );

    // Couleurs dynamiques pour chaque part du pie
    const dataWithColors = eventData.map((item) => ({
        ...item,
        fill: chartConfig[item.month]?.color || "#8884d8",
    }));

    return (
        <Card data-chart={id} className="flex flex-col">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Nombre d&apos;événements par mois</CardTitle>
                    <CardDescription>Derniers 6 mois</CardDescription>
                </div>
                <Select
                    value={activeMonth}
                    onValueChange={setActiveMonth}
                    disabled={months.length === 0}
                >
                    <SelectTrigger
                        className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                        aria-label="Sélectionner un mois"
                    >
                        <SelectValue placeholder="Sélectionner un mois" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {months.map((month) => {
                            const config = chartConfig[month];
                            if (!config) return null;

                            return (
                                <SelectItem
                                    key={month}
                                    value={month}
                                    className="rounded-lg [&_span]:flex"
                                >
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className="flex h-3 w-3 shrink-0 rounded-xs"
                                            style={{
                                                backgroundColor: config.color,
                                            }}
                                        />
                                        {config.label}
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={dataWithColors}
                            dataKey="count"
                            nameKey="month"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={({ outerRadius = 0, ...props }) => (
                                <g>
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 10}
                                    />
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 25}
                                        innerRadius={outerRadius + 12}
                                    />
                                </g>
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {eventData[
                                                        activeIndex
                                                    ]?.count?.toLocaleString() ??
                                                        0}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Événements
                                                </tspan>
                                            </text>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

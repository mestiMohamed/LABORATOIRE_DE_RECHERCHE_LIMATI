"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

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

export const description = "Un graphique circulaire interactif";

const eventData = [
    { month: "january", events: 4, fill: "var(--color-january)" },
    { month: "february", events: 3, fill: "var(--color-february)" },
    { month: "march", events: 5, fill: "var(--color-march)" },
    { month: "april", events: 3, fill: "var(--color-april)" },
    { month: "may", events: 4, fill: "var(--color-may)" },
];

const chartConfig = {
    january: {
        label: "Janvier",
        color: "var(--chart-1)",
    },
    february: {
        label: "Février",
        color: "var(--chart-2)",
    },
    march: {
        label: "Mars",
        color: "var(--chart-3)",
    },
    april: {
        label: "Avril",
        color: "var(--chart-4)",
    },
    may: {
        label: "Mai",
        color: "var(--chart-5)",
    },
};

export function Chart1() {
    const id = "pie-interactive";
    const [activeMonth, setActiveMonth] = React.useState(eventData[0].month);

    const activeIndex = React.useMemo(
        () => eventData.findIndex((item) => item.month === activeMonth),
        [activeMonth]
    );
    const months = React.useMemo(() => eventData.map((item) => item.month), []);

    return (
        <Card data-chart={id} className="flex flex-col">
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Nombre d&apos;événements par mois</CardTitle>
                    <CardDescription>Janvier - Mai 2025</CardDescription>
                </div>
                <Select value={activeMonth} onValueChange={setActiveMonth}>
                    <SelectTrigger
                        className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                        aria-label="Sélectionner un mois"
                    >
                        <SelectValue placeholder="Sélectionner un mois" />
                    </SelectTrigger>
                    <SelectContent align="end" className="rounded-xl">
                        {months.map((key) => {
                            const config = chartConfig[key];

                            if (!config) {
                                return null;
                            }

                            return (
                                <SelectItem
                                    key={key}
                                    value={key}
                                    className="rounded-lg [&_span]:flex"
                                >
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className="flex h-3 w-3 shrink-0 rounded-xs"
                                            style={{
                                                backgroundColor: `var(--color-${key})`,
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
                            data={eventData}
                            dataKey="events"
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
                                                    ].events.toLocaleString()}
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

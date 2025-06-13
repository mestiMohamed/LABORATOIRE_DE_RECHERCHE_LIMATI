"use client";

import { GitCommitVertical, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

export const description = "Ligne représentant les publications scientifiques";

const chartData = [
    { month: "January", publications: 12 },
    { month: "February", publications: 18 },
    { month: "March", publications: 15 },
    { month: "April", publications: 9 },
    { month: "May", publications: 22 },
    { month: "June", publications: 17 },
];

const chartConfig = {
    publications: {
        label: "Publications",
        color: "var(--chart-1)",
    },
};

export function Chart4() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Évolution des publications scientifiques</CardTitle>
                <CardDescription>Janvier - Juin 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="publications"
                            type="natural"
                            stroke="var(--color-publications)"
                            strokeWidth={2}
                            dot={({ cx, cy, payload }) => {
                                const r = 24;
                                return (
                                    <GitCommitVertical
                                        key={payload.month}
                                        x={cx - r / 2}
                                        y={cy - r / 2}
                                        width={r}
                                        height={r}
                                        fill="hsl(var(--background))"
                                        stroke="var(--color-publications)"
                                    />
                                );
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Hausse de 5,2% ce mois-ci <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Nombre total de publications scientifiques — 6 derniers mois
                </div>
            </CardFooter>
        </Card>
    );
}

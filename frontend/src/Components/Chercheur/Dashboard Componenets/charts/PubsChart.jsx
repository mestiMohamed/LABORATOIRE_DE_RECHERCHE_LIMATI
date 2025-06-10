import { TrendingUp } from "lucide-react";
import axiosClient from "../../../../axiosClient";

import { useState, useEffect } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
} from "recharts";

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

export const description = "A bar chart with a custom label";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-2)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
    label: {
        color: "var(--background)",
    },
};

export default function PubsChart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        axiosClient
            .get("/chercheur/publications-par-mois")
            .then(({ data }) => {
                const formatted = data.map((item) => ({
                    month: new Date(item.month + "-01").toLocaleString(
                        "default",
                        {
                            month: "short",
                        }
                    ),
                    desktop: item.count, // ⚠️ tu utilises "desktop" dans le BarChart
                }));
                setChartData(formatted);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des données :",
                    error
                );
            });
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Custom Label</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="month"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="desktop" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="desktop"
                            layout="vertical"
                            fill="var(--color-desktop)"
                            radius={4}
                        >
                            <LabelList
                                dataKey="month"
                                position="insideLeft"
                                offset={8}
                                className="fill-(--color-label)"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="desktop"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

const chartConfig = {
    events: {
        label: "Événements",
        color: "hsl(var(--chart-1))",
    },
};

export function EventsChart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/admin/events-by-month")
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.map((item) => ({
                    month: new Date(item.month + "-01").toLocaleString(
                        "default",
                        {
                            month: "short",
                        }
                    ),
                    events: item.count,
                }));
                setChartData(formatted);
            });
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Événements par mois</CardTitle>
                <CardDescription>6 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart width={500} height={250} data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis allowDecimals={false} />
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="events" fill="#3B82F6" radius={8} />{" "}
                        {/* 👈 couleur bleue ici */}
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Tendance en hausse <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Nombre total d'événements enregistrés chaque mois
                </div>
            </CardFooter>
        </Card>
    );
}

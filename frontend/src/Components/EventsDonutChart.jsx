
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Données de démonstration - à remplacer par vos données réelles
const eventData = [
    { type: "Conférence", total: 275, fill: "#6366F1" },
    { type: "Atelier", total: 200, fill: "#EC4899" },
    { type: "Séminaire", total: 287, fill: "#10B981" },
    { type: "Réunion", total: 173, fill: "#F59E0B" },
    { type: "Autre", total: 190, fill: "#EF4444" },
];
function EventsDonutChart() {
    const totalEvents = React.useMemo(() => {
        return eventData.reduce((acc, curr) => acc + curr.total, 0);
    }, []);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Événements par type</CardTitle>
                <CardDescription>Répartition des événements</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <div className="mx-auto aspect-square max-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={eventData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                innerRadius={60}
                                paddingAngle={5}
                                dataKey="total"
                                nameKey="type"
                            >
                                {eventData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.fill}
                                    />
                                ))}
                            </Pie>
                            <text
                                x="50%"
                                y="45%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-2xl font-bold fill-foreground"
                            >
                                {totalEvents}
                            </text>
                            <text
                                x="50%"
                                y="55%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-sm fill-muted-foreground"
                            >
                                Événements
                            </text>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    borderRadius: "6px",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                }}
                                formatter={(value, name, props) => [
                                    value,
                                    props.payload.type,
                                ]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Dernières statistiques <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Répartition des événements par type
                </div>
            </CardFooter>
        </Card>
    );
}


export default EventsDonutChart;
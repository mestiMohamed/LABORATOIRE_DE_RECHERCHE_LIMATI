import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../Components/ui/card";
import { useState, useEffect } from "react";

import axiosClient from "../../axiosClient";

import { Button } from "../../Components/ui/button";
import { CalendarRange, Layers, SquareMenu, User } from "lucide-react";
import { EventsChart } from "../../Components/charts/EventsChart";
import { ProjetDeRechercheChart } from "../../Components/charts/ProjetDeRechercheChart";

function AdminDashboard() {
    const [stats, setStats] = useState({
        chercheurs: { total: 0, growth: 0 },
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const endpoints = [
                    "admin/chercheurs/count",
                    "admin/events/count",
                    "admin/projets/count",
                    "admin/publications/count",
                ];

                const responses = await Promise.all(
                    endpoints.map((endpoint) => axiosClient.get(endpoint))
                );

                setStats({
                    chercheurs: responses[0].data,
                    events: responses[1].data,
                    projets: responses[2].data,
                    publications: responses[3].data,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button>Télécharger</Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Chercheurs */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                        <CardTitle className="text-sm font-medium">
                            Chercheurs
                        </CardTitle>
                        <User />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.chercheurs.total}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +{stats.chercheurs.growth}% depuis le mois dernier
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                        <CardTitle className="text-sm font-medium">
                            Évènements
                        </CardTitle>
                        <CalendarRange />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.events.total}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +{stats.events.growth}% depuis le mois dernier
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                        <CardTitle className="text-sm font-medium">
                            Projets de recherche scientifique
                        </CardTitle>
                        <Layers />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.projets.total}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +{stats.projets.growth}% depuis le mois dernier
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                        <CardTitle className="text-sm font-medium">
                            Publications scientifique
                        </CardTitle>
                        <SquareMenu />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.publications.total}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +{stats.publications.growth}% depuis le mois dernier
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="flex gap-4">
                <div className="w-1/2">
                    <EventsChart />
                </div>
                <div className="w-1/2">
                    <ProjetDeRechercheChart />
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;

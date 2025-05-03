import React from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/Tabs";
import { Separator } from "@/components/ui/Separator";
import { ScrollArea, ScrollBar } from "../../Components/ui/scroll-area";
import EventUpsertForm from "../../Components/Forms/EventUpsertForm";
import EventApi from "../../Components/services/Api/EventApi";
import { Button } from "../../Components/ui/button";
import { Plus } from "lucide-react";
import AdminEventsList from "../../Components/data-table/AdminEventsList";

function ManageEvents() {
    const { user, setUser } = useStateContext();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Gestion des événements
                    </h1>
                    <p className="text-muted-foreground">
                        Créez et gérez vos événements
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Exporter les événements
                </Button>
            </div>

            <Tabs defaultValue="events_list" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="events_list">
                        Liste des événements
                    </TabsTrigger>
                    <TabsTrigger value="create_event">
                        Créer un événement
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="events_list" className="mt-6">
                    <AdminEventsList />
                </TabsContent>

                <TabsContent value="create_event" className="mt-6">
                    <div className="rounded-lg border p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Créer un nouvel événement
                        </h2>
                        <Separator className="my-4" />
                        <EventUpsertForm
                            handleSubmit={(values) => EventApi.create(values)}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default ManageEvents;

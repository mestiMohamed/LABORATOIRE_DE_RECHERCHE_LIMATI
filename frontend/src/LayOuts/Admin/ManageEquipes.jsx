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
import AdminChercheurList from "../../Components/data-table/AdminChercheurList";
import ChercheurApi from "../../Components/services/Api/ChercheurApi";
import ChercheurUpsertForm from "../../Components/Forms/ChercheurUpsertForm";
import AdminEquipeList from "../../Components/data-table/AdminEquipeList";
import EquipeApi from "../../Components/services/Api/EquipeApi";
import EquipeUpsertForm from "../../Components/Forms/EquipeUpSertForm";

function ManageEquipes() {
    const { user, setUser } = useStateContext();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Gestion des équipes
                    </h1>
                    <p className="text-muted-foreground">
                        Ajouter et gérez vos équipes
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Exporter les équipes
                </Button>
            </div>

            <Tabs defaultValue="items_list" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="items_list">
                        Liste des équipes
                    </TabsTrigger>
                    <TabsTrigger value="add_item">
                        Ajouter une équipe
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="items_list" className="mt-6">
                    <AdminEquipeList />
                </TabsContent>

                <TabsContent value="add_item" className="mt-6">
                    <div className="rounded-lg border p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Ajouter une nouvelle équipe
                        </h2>
                        <Separator className="my-4" />
                        <EquipeUpsertForm
                            handleSubmit={(values) => EquipeApi.create(values)}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default ManageEquipes;

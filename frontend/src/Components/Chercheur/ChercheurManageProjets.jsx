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
import AdminProjetsList from "../../Components/data-table/AdminProjetsList";
import ProjetDeRechercheUpSertForm from "../../Components/Forms/ProjetDeRecharcheUpSertForm";
import { useState } from "react";
import { useEffect } from "react";
import axiosClient from "../../axiosClient";
import ProjetDeRechercheApi from "../../Components/services/Api/ProjetDeRechercheApi";
import ChercheurProjetsList from "../data-table/ChercheurProjetsList";

function ChercheurManageProjets() {

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Gestion des projets de recherche
                    </h1>
                    <p className="text-muted-foreground">
                        Ajouter et gérez vos projets de recherche
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Exporter les projets de recherche
                </Button>
            </div>

            <Tabs defaultValue="items_list" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="items_list">
                        Liste des projets de recherche
                    </TabsTrigger>
                    <TabsTrigger value="add_item">
                        Ajouter un projet de recherche
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="items_list" className="mt-6">
                    <ChercheurProjetsList />
                </TabsContent>

                <TabsContent value="add_item" className="mt-6">
                    <div className="rounded-lg border p-6 mb-15">
                        <h2 className="text-lg font-semibold mb-4">
                            Ajouter une nouvelle équipe
                        </h2>
                        <Separator className="my-4" />
                        <ProjetDeRechercheUpSertForm
                            handleSubmit={(values) =>
                                ProjetDeRechercheApi.create(values)
                            }
                         
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default ChercheurManageProjets;

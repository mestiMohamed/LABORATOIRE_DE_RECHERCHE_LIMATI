import React from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/Tabs";
import { Separator } from "@/components/ui/Separator";

import { Button } from "../../../Components/ui/button";
import { Plus } from "lucide-react";
import ChercheurUpsertForm from "../../../Components/Forms/ChercheurUpsertForm";
import ChefEquipeChercheurList from "../../data-table/ChefEquipeChercheurList";
import EquipeApi from "../../services/Api/EquipeApi";
import MembreAdd from "../../Forms/MembreAdd";

function ChercheurChefManageMembers() {
    const { user, setUser } = useStateContext();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Gestion des chercheurs
                    </h1>
                    <p className="text-muted-foreground">
                        Ajouter et gérez vos chercheurs
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Exporter les chercheurs
                </Button>
            </div>

            <Tabs defaultValue="items_list" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="items_list">
                        Liste des membres
                    </TabsTrigger>
                    <TabsTrigger value="add_item">
                        Ajouter un membre
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="items_list" className="mt-6">
                    <ChefEquipeChercheurList />
                </TabsContent>

                <TabsContent value="add_item" className="mt-6">
                    <div className="rounded-lg border p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Ajouter un nouveau membre 
                        </h2>
                        <Separator className="my-4" />
                        <MembreAdd />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default ChercheurChefManageMembers;


import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/Tabs";
import { Separator } from "@/components/ui/Separator";

import { Button } from "../../../Components/ui/button";
import { Plus } from "lucide-react";

import AdminProjetsList from "../../../Components/data-table/AdminProjetsList";
import ProjetDeRechercheUpSertForm from "../../../Components/Forms/ProjetDeRecharcheUpSertForm";

import ProjetDeRechercheApi from "../../../Components/services/Api/ProjetDeRechercheApi";
import ChefEquipeProjetsList from "../../data-table/ChefEquipeProjetList";
import EquipeProjetDeRechercheUpSetForm from "../../Forms/EquipeProjetDeRechercheUpSertForm";

function ChercheurChefManageProjects() {

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
                    <ChefEquipeProjetsList />
                </TabsContent>

                <TabsContent value="add_item" className="mt-6">
                    <div className="rounded-lg border p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Ajouter une nouvelle équipe
                        </h2>
                        <Separator className="my-4" />
                        <EquipeProjetDeRechercheUpSetForm
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

export default ChercheurChefManageProjects;

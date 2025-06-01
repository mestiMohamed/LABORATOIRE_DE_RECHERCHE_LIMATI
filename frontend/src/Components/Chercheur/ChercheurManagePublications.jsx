
import { useStateContext } from "../../Contexts/ContextProvider";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/Tabs";
import { Separator } from "@/components/ui/Separator";

import { Button } from "../../Components/ui/button";
import { Plus } from "lucide-react";


import PublicationApi from "../../Components/services/Api/PublicationApi";
import PublicationsUpSertForm from "../../Components/Forms/PublicationsUpSertForm";
import AdminPublicationList from "../../Components/data-table/AdminPublicationList";
import ChercheurPublicationList from "../data-table/ChercheurPublicationList";

function ChercheurManagePublications() {
    const { user, setUser } = useStateContext();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Gestion des publications
                    </h1>
                    <p className="text-muted-foreground">
                        Ajouter et gérez vos publications
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Exporter les publications
                </Button>
            </div>

            <Tabs defaultValue="items_list" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="items_list">
                        Liste des publications
                    </TabsTrigger>
                    <TabsTrigger value="add_item">
                        Ajouter une publication
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="items_list" className="mt-6">
                    <ChercheurPublicationList />
                </TabsContent>

                <TabsContent value="add_item" className="mt-6">
                    <div className="rounded-lg border p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Ajouter une nouvelle publication
                        </h2>
                        <Separator className="my-4" />
                        <PublicationsUpSertForm
                            handleSubmit={(values) => PublicationApi.create(values)}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default ChercheurManagePublications;

import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";

import { DataTableColumnHeader } from "./DataTableHeader";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import ProjetDeRechercheApi from "../services/Api/ProjetDeRechercheApi";
import ProjetDeRechercheUpSertForm from "../Forms/ProjetDeRecharcheUpSertForm";
import EquipeApi from "../services/Api/EquipeApi";

function ChefEquipeProjetsList(props) {
    const AdminEquipesColumns = [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="ID" />;
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Titre" />;
            },
        },
        {
            accessorKey: "description",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Description" />
            ),
            cell: ({ row }) => {
                const description = row.getValue("description");

                return (
                    <ScrollArea className="h-24 w-full rounded-md p-2 text-sm">
                        <div className="whitespace-pre-wrap">{description}</div>
                    </ScrollArea>
                );
            },
        },

        {
            accessorKey: "date_debut",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Date de début"
                    />
                );
            },
        },
        {
            accessorKey: "date_fin",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Date de fin"
                    />
                );
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Status" />;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const { id, titre } = row.original;
                const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
                return (
                    <div className="flex gap-4">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size={"sm"}>Supprimer</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Êtes-vous absolument sûr de supprimer{" "}
                                        <span className="font-bold">
                                            {titre}
                                        </span>
                                        ?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Cette action est irréversible. Cela
                                        supprimera définitivement cet élément et
                                        toutes ses données associées de nos
                                        serveurs.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Annuler
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={async () => {
                                            const deletingLoader =
                                                toast.loading(
                                                    "Deleting in progress..."
                                                );
                                            const {
                                                data: deletedEvent,
                                                status,
                                            } =
                                                await ProjetDeRechercheApi.delete(
                                                    id
                                                );
                                            toast.dismiss(deletingLoader);
                                            if (status === 200) {
                                                setData(
                                                    data.filter(
                                                        (event) =>
                                                            event.id !== id
                                                    )
                                                );
                                                toast.success(
                                                    "Evénement supprimé",
                                                    {
                                                        description:
                                                            "Evénement supprimer avec succées!",
                                                        icon: <Trash2Icon />,
                                                    }
                                                );
                                            }
                                        }}
                                    >
                                        Confirmer
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <Sheet
                            open={openUpdateDialog}
                            onOpenChange={setOpenUpdateDialog}
                        >
                            <SheetTrigger asChild>
                                <Button size="sm" variant="outline">
                                    Modifier
                                </Button>
                            </SheetTrigger>

                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>
                                        Modifier événement{" "}
                                        <strong>{titre}</strong>
                                    </SheetTitle>

                                    <SheetDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                    </SheetDescription>
                                    <ScrollArea className="h-2/6 p-10 text-sm">
                                        <ProjetDeRechercheUpSertForm
                                            values={row.original}
                                            handleSubmit={(values) => {
                                                return ProjetDeRechercheApi.update(
                                                    id,
                                                    values
                                                ).then((res) => {
                                                    setOpenUpdateDialog(false);
                                                    return res; // ← tu dois retourner la réponse ici
                                                });
                                            }}
                                        />
                                    </ScrollArea>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                );
            },
        },
    ];
    const [data, setData] = useState([]);
    useEffect(() => {
        EquipeApi.getProjets().then(({ data }) => setData(data));
    }, []);
    return (
        <div>
            <DataTable columns={AdminEquipesColumns} data={data} />
        </div>
    );
}

export default ChefEquipeProjetsList;

import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import EventApi from "../services/Api/EventApi";

import { DataTableColumnHeader } from "./DataTableHeader";
import { Button } from "@/components/ui/button";

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
import { DeleteIcon, Trash, Trash2Icon } from "lucide-react";

function AdminEventsList(props) {
    const AdminEventsColumns = [
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
            accessorKey: "code",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Code" />;
            },
        },
        {
            accessorKey: "event_type_name",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Type d'événement"
                    />
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
            id: "actions",
            cell: ({ row }) => {
                const { id, name } = row.original;
                return (
                    <>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size={"sm"}>Supprimer</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Êtes-vous absolument sûr de supprimer{" "}
                                        <span className="font-bold">
                                            {name}
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
                                    <AlertDialogAction onClick={async () => {
                                        const deletingLoader = toast.loading("Deleting in progress...")
                                        const {data: deletedEvent, status} = await EventApi.delete(id)
                                        toast.dismiss(deletingLoader)
                                        if(status === 200) {
                                            setData(data.filter((event) => event.id !== id))
                                            toast.success("Evénement supprimé", {
                                                description: "Evénement supprimer avec succées!",
                                                icon: <Trash2Icon />
                                            });
                                        }
                                    }}>
                                        Confirmer
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                );
            },
        },
    ];
    const [data, setData] = useState([]);
    useEffect(() => {
        EventApi.all().then(({ data }) => setData(data.data));
    }, []);
    return (
        <div>
            <DataTable columns={AdminEventsColumns} data={data} />
        </div>
    );
}

export default AdminEventsList;

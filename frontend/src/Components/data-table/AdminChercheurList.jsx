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

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import EventUpsertForm from "../Forms/EventUpsertForm";
import ChercheurApi from "../services/Api/ChercheurApi";

function AdminChercheurList(props) {
    const AdminChercheurColumns = [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="ID" />;
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Nom complet"
                    />
                );
            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Email" />;
            },
        },
        {
            accessorKey: "date_of_birth",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Date de naissance"
                    />
                );
            },
        },
        {
            accessorKey: "gender",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Sexe" />
            ),
            cell: ({ row }) => {
                const gender = row.original.gender;
                return gender === "m"
                    ? "Homme"
                    : gender === "f"
                    ? "Femme"
                    : "Autre";
            },
        },

        {
            accessorKey: "address",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Addresse" />
                );
            },
        },
        {
            accessorKey: "blood_type",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Sang" />;
            },
        },
        {
            accessorKey: "phone",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Tel" />
            ),
            cell: ({ row }) => {
                const phone = row.original.phone;
                // Si le numéro commence par 0, on le remplace par +212
                if (phone && phone.startsWith("0")) {
                    return "+212 " + phone.slice(1);
                }
                return phone;
            },
        },

        {
            id: "actions",
            cell: ({ row }) => {
                const { id, name } = row.original;
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
                                    <AlertDialogAction
                                        onClick={async () => {
                                            const deletingLoader =
                                                toast.loading(
                                                    "Deleting in progress..."
                                                );
                                            const {
                                                data: deletedEvent,
                                                status,
                                            } = await EventApi.delete(id);
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
                                        <strong>{name}</strong>
                                    </SheetTitle>

                                    <SheetDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                    </SheetDescription>

                                    <EventUpsertForm
                                        values={row.original}
                                        handleSubmit={(values) => {
                                            return ChercheurApi.update(
                                                id,
                                                values
                                            ).then((res) => {
                                                setOpenUpdateDialog(false);
                                                return res; // ← tu dois retourner la réponse ici
                                            });
                                        }}
                                    />
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
        ChercheurApi.all().then(({ data }) => setData(data.data));
    }, []);
    return (
        <div>
            <DataTable columns={AdminChercheurColumns} data={data} />
        </div>
    );
}

export default AdminChercheurList;

import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";

import { DataTableColumnHeader } from "./DataTableHeader";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
import PublicationApi from "../services/Api/PublicationApi";
import { ScrollArea } from "@/components/ui/scroll-area";

import PublicationsUpSertForm from "../Forms/PublicationsUpSertForm";

function ChercheurPublicationList(props) {
    const AdminPublicationsColumns = [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="ID" />;
            },
        },
        {
            accessorKey: "titre",
            header: ({ column }) => {
                return <DataTableColumnHeader column={column} title="Titre" />;
            },
        },
        {
            accessorKey: "contenu",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Contenu" />
            ),
            cell: ({ row }) => {
                const contenu = row.getValue("contenu");

                return (
                    <ScrollArea className="h-24 w-full  p-2 text-sm">
                        <div className="whitespace-pre-wrap">{contenu}</div>
                    </ScrollArea>
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
                                            } = await PublicationApi.delete(id);
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

                                    <PublicationsUpSertForm
                                        values={row.original}
                                        handleSubmit={(values) => {
                                            return PublicationApi.update(
                                                row.original.id,
                                                values
                                            ).then((res) => {
                                                setOpenUpdateDialog(false);
                                                return res;
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
        PublicationApi.mine().then(({ data }) => {
            setData(data.data);
        });
    }, []);

    return (
        <div>
            <DataTable columns={AdminPublicationsColumns} data={data} />
        </div>
    );
}

export default ChercheurPublicationList;

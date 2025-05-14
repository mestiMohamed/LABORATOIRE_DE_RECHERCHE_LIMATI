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
import EventUpsertForm from "../Forms/EventUpsertForm";
import EquipeApi from "../services/Api/EquipeApi";
import EquipeUpsertForm from "../Forms/EquipeUpSertForm";

function AdminEquipeList(props) {
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
                return <DataTableColumnHeader column={column} title="Nom" />;
            },
        },
        {
            accessorKey: "description",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Description"
                    />
                );
            },
        },
        {
            id: "members",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Membres" />
            ),
            cell: ({ row }) => {
                const users = row.original.users || [];
                return (
                    <div className="max-w-[200px]">
                        {users.length === 0 ? (
                            <span className="text-muted-foreground">
                                Aucun membre
                            </span>
                        ) : (
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Membres" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((user) => (
                                        <SelectItem
                                            key={user.id}
                                            value={String(user.id)}
                                        >
                                            {user.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                );
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
                                            } = await EquipeApi.delete(id);
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

                                    <EquipeUpsertForm
                                        values={row.original}
                                        handleSubmit={(values) => {
                                            return EquipeApi.update(
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
        EquipeApi.all().then(({ data }) => setData(data.data));
    }, []);
    return (
        <div>
            <DataTable columns={AdminEquipesColumns} data={data} />
        </div>
    );
}

export default AdminEquipeList;

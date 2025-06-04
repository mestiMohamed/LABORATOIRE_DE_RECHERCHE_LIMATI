import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";

import { DataTableColumnHeader } from "./DataTableHeader";
import { Button } from "@/components/ui/button";

import { Switch } from "@/components/ui/Switch";

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
import ChercheurApi from "../services/Api/ChercheurApi";
import ChercheurUpsertForm from "../Forms/ChercheurUpsertForm";
import EquipeApi from "../services/Api/EquipeApi";

function ChefEquipeChercheurList(props) {
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
                                <Button size={"sm"}>
                                    Retirer de l’équipe
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Êtes-vous sûr de vouloir retirer{" "}
                                        <span className="font-bold">
                                            {name}
                                        </span>{" "}
                                        de votre équipe ?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Ce chercheur ne fera plus partie de
                                        votre équipe, mais son compte sera
                                        conservé.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Annuler
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={async () => {
                                            const removingLoader =
                                                toast.loading(
                                                    "Retrait en cours..."
                                                );
                                            try {
                                                const {
                                                    data: response,
                                                    status,
                                                } =
                                                    await ChercheurApi.removeFromEquipe(
                                                        id
                                                    );
                                                toast.dismiss(removingLoader);

                                                if (status === 200) {
                                                    setData((prevData) =>
                                                        prevData.filter(
                                                            (chercheur) =>
                                                                chercheur.id !==
                                                                id
                                                        )
                                                    );
                                                    toast.success(
                                                        "Chercheur retiré de l’équipe",
                                                        {
                                                            description:
                                                                "Ce chercheur ne fait plus partie de votre équipe.",
                                                            icon: (
                                                                <Trash2Icon />
                                                            ),
                                                        }
                                                    );
                                                }
                                            } catch (error) {
                                                toast.dismiss(removingLoader);
                                                toast.error(
                                                    "Erreur lors du retrait du chercheur"
                                                );
                                                console.error(error);
                                            }
                                        }}
                                    >
                                        Confirmer
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                );
            },
        },
    ];
    const [data, setData] = useState([]);
    useEffect(() => {
        EquipeApi.getMembers().then(({ data }) => setData(data));
    }, []);

    return (
        <div>
            <DataTable columns={AdminChercheurColumns} data={data} />
        </div>
    );
}

export default ChefEquipeChercheurList;

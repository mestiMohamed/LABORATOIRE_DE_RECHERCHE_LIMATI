import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import EventApi from "../services/Api/EventApi";

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
import ChercheurUpsertForm from "../Forms/ChercheurUpsertForm";

function DashAdminChercheurList(props) {
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
            id: "is_active",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Actif" />
            ),
            cell: ({ row }) => {
                const user = row.original;
                const [active, setActive] = useState(user.is_active);

                const handleToggle = async () => {
                    setActive(!active);
                    try {
                        await ChercheurApi.toggleActive(user.id, !active);
                        toast.success(
                            `Compte ${
                                !active ? "activé" : "désactivé"
                            } avec succès`
                        );
                    } catch (error) {
                        setActive(active); // rollback
                        toast.error("Erreur lors du changement de statut");
                    }
                };

                return (
                    <Switch
                        checked={active}
                        onCheckedChange={handleToggle}
                        className="data-[state=checked]:bg-green-600"
                    />
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

export default DashAdminChercheurList;

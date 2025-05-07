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
                                                    "Suppression en cours ..."
                                                );
                                            const {
                                                data: deletedChercheur,
                                                status,
                                            } = await ChercheurApi.delete(id);
                                            toast.dismiss(deletingLoader);
                                            if (status === 200) {
                                                setData(
                                                    data.filter(
                                                        (chercheur) =>
                                                            chercheur.id !== id
                                                    )
                                                );
                                                toast.success(
                                                    "Chercheur supprimé",
                                                    {
                                                        description:
                                                            "Chercheur supprimer avec succées!",
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

                                    <ChercheurUpsertForm
                                        values={row.original}
                                        handleSubmit={async (
                                            formData,
                                            options = {}
                                        ) => {
                                            try {
                                                // Détermine si c'est un FormData (pour les fichiers)
                                                const isFormData =
                                                    formData instanceof
                                                    FormData;

                                                // Configure les headers automatiquement
                                                const requestOptions = {
                                                    ...options,
                                                    headers: {
                                                        ...options.headers,
                                                        "Content-Type":
                                                            isFormData
                                                                ? "multipart/form-data"
                                                                : "application/json",
                                                    },
                                                };

                                                const result =
                                                    await ChercheurApi.update(
                                                        row.original.id,
                                                        isFormData
                                                            ? formData
                                                            : convertToFormData(
                                                                  formData
                                                              ),
                                                        requestOptions
                                                    );

                                                setOpenUpdateDialog(false);

                                                // Optionnel : actualiser les données si nécessaire
                                                if (
                                                    typeof refetch ===
                                                    "function"
                                                ) {
                                                    await refetch();
                                                }

                                                return result;
                                            } catch (error) {
                                                console.error(
                                                    "Échec de la mise à jour:",
                                                    {
                                                        error:
                                                            error.response
                                                                ?.data ||
                                                            error.message,
                                                        payload: formData,
                                                    }
                                                );

                                                // Transforme les erreurs de l'API en format compatible avec react-hook-form
                                                if (
                                                    error.response?.data?.errors
                                                ) {
                                                    const formErrors = {};
                                                    Object.entries(
                                                        error.response.data
                                                            .errors
                                                    ).forEach(
                                                        ([field, messages]) => {
                                                            formErrors[field] =
                                                                {
                                                                    type: "server",
                                                                    message:
                                                                        Array.isArray(
                                                                            messages
                                                                        )
                                                                            ? messages.join(
                                                                                  ", "
                                                                              )
                                                                            : messages,
                                                                };
                                                        }
                                                    );
                                                    throw formErrors;
                                                }

                                                throw error;
                                            }
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

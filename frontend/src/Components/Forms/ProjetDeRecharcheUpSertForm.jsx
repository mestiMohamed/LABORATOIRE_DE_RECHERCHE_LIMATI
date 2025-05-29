import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../Components/ui/form";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Input } from "../../Components/ui/input";
import { Button } from "../../Components/ui/button";
import { Textarea } from "../../Components/ui/textarea";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../Components/ui/select.jsx";

import { useEffect, useState } from "react";
import ChercheurApi from "../services/Api/ChercheurApi.js";
import EquipeApi from "../services/Api/EquipeApi.js";

export default function ProjetDeRechercheUpSertForm({
    handleSubmit,
    values,
    //users = [],
}) {
    const isUpdate = values !== undefined;

    const formSchema = z
        .object({
            name: z.string().min(2, "Le titre est requis"),
            description: z.string().min(5, "La description est trop courte"),
            user_id: z
                .union([z.coerce.number().int().positive(), z.literal(null)])
                .nullable(),
            equipe_id: z
                .union([z.coerce.number().int().positive(), z.literal(null)])
                .nullable(),
            date_debut: z.string().min(1, "Date de début requise"),
            date_fin: z.string().min(1, "Date de fin requise"),
            status: z.string().min(1, "Le statut est requis"),
        })
        .refine(
            (data) =>
                (data.user_id && !data.equipe_id) ||
                (!data.user_id && data.equipe_id),
            {
                message:
                    "Un projet doit être attribué soit à un utilisateur, soit à une équipe, pas les deux.",
                path: ["user_id"], // ou "equipe_id" si tu préfères
            }
        );

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: values || {
            titre: "",
            description: "",
            user_id: null,
            equipe_id: null,
            date_debut: "",
            date_fin: "",
            status: "",
        },
    });

    const {
        setError,
        formState: { isSubmitting },
        reset,
    } = form;

    useEffect(() => {
        console.log("form errors:", form.formState.errors);
    }, [form.formState.errors]);

    const onSubmit = async (values) => {
        const loaderId = toast.loading(
            <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isUpdate ? "Mise à jour..." : "Création en cours..."}
            </div>,
            { duration: Infinity }
        );

        try {
            const response = await handleSubmit(values);
            if ([200, 201].includes(response?.status)) {
                reset();
                toast.success(
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {isUpdate
                            ? "Projet mis à jour avec succès !"
                            : "Projet créé avec succès !"}
                    </div>
                );
            } else {
                throw new Error(response?.data?.message || "Erreur inattendue");
            }
        } catch (error) {
            toast.error(
                <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    {error.response?.data?.errors
                        ? "Corrige les erreurs du formulaire"
                        : "Erreur serveur"}
                </div>
            );

            if (error.response?.data?.errors) {
                Object.entries(error.response.data.errors).forEach(
                    ([fieldName, errorMessages]) => {
                        setError(fieldName, {
                            message: Array.isArray(errorMessages)
                                ? errorMessages.join(", ")
                                : errorMessages,
                        });
                    }
                );
            }
        } finally {
            toast.dismiss(loaderId);
        }
    };
    const [users, setUsers] = useState([]);

    useEffect(() => {
        ChercheurApi.all().then((res) => {
            console.log("✅ Utilisateurs récupérés :", res.data);
            setUsers(res.data.data); // ✅ ici on met directement le tableau dans le state
        });
    }, []);
    const [equipes, setEquipes] = useState([]);

    useEffect(() => {
        EquipeApi.all().then((res) => {
            console.log("✅ Equipe récupérés :", res.data);
            setEquipes(res.data.data); // ✅ ici on met directement le tableau dans le state
        });
    }, []);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Titre du projet"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Description détaillée"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="user_id"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Utilisateur (optionnel)</FormLabel>
                            <Select
                                value={
                                    field.value !== null
                                        ? String(field.value)
                                        : "null"
                                }
                                onValueChange={(value) =>
                                    field.onChange(
                                        value === "null" ? null : Number(value)
                                    )
                                }
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionner un utilisateur (ou aucun)" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="null">
                                        Aucun utilisateur
                                    </SelectItem>
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
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="equipe_id"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Équipe (optionnelle)</FormLabel>
                            <Select
                                value={
                                    field.value !== null
                                        ? String(field.value)
                                        : "null"
                                }
                                onValueChange={(value) =>
                                    field.onChange(
                                        value === "null" ? null : Number(value)
                                    )
                                }
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sélectionner une équipe (ou aucune)" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="null">
                                        Aucune équipe
                                    </SelectItem>
                                    {equipes.map((equipe) => (
                                        <SelectItem
                                            key={equipe.id}
                                            value={String(equipe.id)}
                                        >
                                            {equipe.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="date_debut"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date de début</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date_fin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date de fin</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Statut</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="En cours, Terminé, etc."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="mt-4" disabled={isSubmitting}>
                    {isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isUpdate ? "Mettre à jour" : "Créer"}
                </Button>
            </form>
        </Form>
    );
}

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
} from "../../Components/ui/form.js";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Input } from "../../Components/ui/input.jsx";
import { Button } from "../../Components/ui/button.jsx";
import { Loader } from "lucide-react";

import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().max(100),
    code: z.string().max(50),
    event_type_id: z.string(), // tu peux transformer en number si nécessaire
    date_debut: z.string(),
    date_fin: z.string(),
});

export default function EventUpsertForm({ handleSubmit, values }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: values || {
            name: "",
            code: "",
            event_type_id: "",
            date_debut: "",
            date_fin: "",
        },
    });

    const {
        setError,
        formState: { isSubmitting },
        reset,
    } = form;
    const isUpdate = values !== undefined;

    const onSubmit = async (values) => {
        const loaderId = toast.loading(
            <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isUpdate ? "Mise à jour en cours..." : "Création en cours..."}
            </div>,
            { duration: Infinity }
        );

        try {
            const response = await handleSubmit(values);
            console.log("response =", response);

            if ([200, 201].includes(response?.status)) {
                reset();
                toast.success(
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {isUpdate
                            ? "Événement mis à jour avec succès !"
                            : "Événement créé avec succès !"}
                    </div>,
                    { duration: 3000 }
                );
            } else {
                throw new Error(
                    response?.data?.message || "Statut inattendu de la réponse"
                );
            }
        } catch (error) {
            toast.error(
                <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    {error.response?.data?.errors
                        ? "Veuillez corriger les erreurs dans le formulaire"
                        : "Une erreur est survenue. Veuillez réessayer."}
                </div>,
                { duration: 5000 }
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
            toast.dismiss(loaderId); // Ferme le toast de chargement dans tous les cas
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom de l’événement</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex: Conférence IA"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: 435464" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="event_type_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type d’événement</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: 1" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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

                <Button type="submit" className="mt-4">
                    {isSubmitting && <Loader className="mr-2 animate-spin" />}
                    {isUpdate ? "Mettre à jour" : "Créer"}
                </Button>
            </form>
        </Form>
    );
}

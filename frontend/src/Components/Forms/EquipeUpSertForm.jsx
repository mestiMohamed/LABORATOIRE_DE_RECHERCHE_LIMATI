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
import {Textarea} from "../../Components/ui/textarea.js"
import { Loader } from "lucide-react";
import { toast } from "sonner";

export default function EquipeUpsertForm({ handleSubmit, values }) {
    const isUpdate = values !== undefined;

    const formSchema = z.object({
        name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
        description: z
            .string()
            .min(5, "La description doit contenir au moins 5 caractères"), // optionnel
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: values || {
            name: "",
            description: "",
        },
    });

    const {
        setError,
        formState: { isSubmitting },
        reset,
    } = form;

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
                            ? "Equipe mis à jour avec succès !"
                            : "Equipe créé avec succès !"}
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
                            <FormLabel>Nom</FormLabel>
                            <FormControl>
                                <Input placeholder="Nom d'équipe" {...field} />
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
                                <Textarea placeholder="Type your message here." {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="mt-4" disabled={isSubmitting}>
                    {isSubmitting && <Loader className="mr-2 animate-spin" />}
                    {isUpdate ? "Mettre à jour" : "Créer"}
                </Button>
            </form>
        </Form>
    );
}

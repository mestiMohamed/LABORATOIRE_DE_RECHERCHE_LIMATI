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
import { Input } from "../../Components/ui/input.jsx";
import { Button } from "../../Components/ui/button.jsx";
import { Loader, Trash2Icon } from "lucide-react";
import {
    RadioGroup,
    RadioGroupItem,
} from "../../Components/ui/radio-group.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../Components/ui/select.jsx";
import { Textarea } from "../../Components/ui/textarea.jsx";
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
        // Show the loader and save its toast ID
        const loaderId = toast.loading(
            isUpdate ? "Mise à jour..." : "Création en cours...",
            {
                duration: Infinity, // Stays until manually dismissed
            }
        );

        try {
            const response = await handleSubmit(values);

            // Dismiss the loader once done
            toast.dismiss(loaderId);

            if (response.status === 200) {
                toast.success(
                    isUpdate
                        ? "Événement mis à jour avec succès!"
                        : "Événement créé avec succès!",
                    { duration: 5000 }
                );

                reset();

                toast.success("Le formulaire a été réinitialisé", {
                    duration: 3000,
                });
            }
        } catch (error) {
            toast.dismiss(loaderId); // Always clean up loader

            const response = error.response;

            if (response?.data?.errors) {
                Object.entries(response.data.errors).forEach(
                    ([fieldName, errorMessages]) => {
                        setError(fieldName, {
                            message: Array.isArray(errorMessages)
                                ? errorMessages.join(", ")
                                : errorMessages,
                        });
                    }
                );

                toast.error(
                    "Veuillez corriger les erreurs dans le formulaire",
                    {
                        duration: 5000,
                        important: true,
                    }
                );
            } else {
                toast.error("Une erreur est survenue. Veuillez réessayer.", {
                    duration: 5000,
                    important: true,
                });
            }
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

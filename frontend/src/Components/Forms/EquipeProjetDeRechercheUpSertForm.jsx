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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Input } from "../../Components/ui/input";
import { Button } from "../../Components/ui/button";
import { Textarea } from "../../Components/ui/textarea";
import { toast } from "sonner";

import { useStateContext } from "../../Contexts/ContextProvider.jsx";

import { useEffect } from "react";


export default function EquipeProjetDeRechercheUpSetForm({
    handleSubmit,
    values,
    //users = [],
}) {
    const { user } = useStateContext();
    const isUpdate = values !== undefined;

    const formSchema = z.object({
        name: z.string().min(2, "Le titre est requis"),
        description: z.string().min(5, "La description est trop courte"),
        equipe_id: z
            .union([z.coerce.number().int().positive(), z.literal(null)])
            .nullable(),
        date_debut: z.date(),
        date_fin: z.date(),
        status: z.string().min(1, "Le statut est requis"),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: values || {
            name: "",
            description: "",
            equipe_id: user.equipe_id,
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
            const formattedValues = {
                ...values,
                date_debut: values.date_debut.toISOString().split("T")[0],
                date_fin: values.date_fin.toISOString().split("T")[0],
            };

            const response = await handleSubmit(formattedValues); // ✅ ici

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
                console.log("API errors:", error.response?.data?.errors);

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
                                    className="shadow-none"
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

                <div className="flex w-full flex-col md:flex-row gap-6">
                    <FormField
                        control={form.control}
                        name="date_debut"
                        render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                                <FormLabel>Date de début</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start border border-muted bg-background pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>
                                                        Sélectionner une date
                                                    </span>
                                                )}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={
                                                field.value instanceof Date
                                                    ? field.value
                                                    : new Date()
                                            }
                                            onSelect={(date) => {
                                                if (date) field.onChange(date);
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="date_fin"
                        render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                                <FormLabel>Date de fin</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start border border-muted bg-background pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>
                                                        Sélectionner une date
                                                    </span>
                                                )}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={
                                                field.value instanceof Date
                                                    ? field.value
                                                    : new Date()
                                            }
                                            onSelect={(date) => {
                                                if (date) field.onChange(date);
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
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

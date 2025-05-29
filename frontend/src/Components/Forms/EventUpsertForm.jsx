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
import { Loader } from "lucide-react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useMemo } from "react";

const formSchema = z.object({
    name: z.string().max(100),
    code: z.string().max(50),
    event_type_id: z.string(), // tu peux transformer en number si nécessaire
    date_debut: z.date(),
    date_fin: z.date(),
});

const parseDate = (date) => {
    if (!date) return new Date();
    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
};

export default function EventUpsertForm({ handleSubmit, values }) {
    const initialValues = useMemo(() => {
        if (!values) return null;
        return {
            ...values,
            date_debut: parseDate(values.date_debut),
            date_fin: parseDate(values.date_fin),
        };
    }, [values]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            name: "",
            code: "",
            event_type_id: "",
            date_debut: new Date(),
            date_fin: new Date(),
        },
    });

    // Juste après useForm pour vérifier les valeurs
    console.log("Form values:", form.getValues());
    console.log("Date début type:", typeof form.getValues().date_debut);

    const {
        setError,
        formState: { isSubmitting },
        reset,
    } = form;
    const isUpdate = values !== undefined;

    const onSubmit = async (values) => {
        const payload = {
            ...values,
            date_debut: format(values.date_debut, "yyyy-MM-dd"),
            date_fin: format(values.date_fin, "yyyy-MM-dd"),
        };
        const loaderId = toast.loading(
            <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isUpdate ? "Mise à jour en cours..." : "Création en cours..."}
            </div>,
            { duration: Infinity }
        );

        try {
            const response = await handleSubmit(payload);
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

                {!isUpdate && (
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
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>
                                                            Sélectionner une
                                                            date
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
                                                    if (date)
                                                        field.onChange(date);
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
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>
                                                            Sélectionner une
                                                            date
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
                                                    if (date)
                                                        field.onChange(date);
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
                )}

                {isUpdate && (
                    <div className="flex w-full flex-col md:flex-row gap-6">
                        <div className="flex flex-1 flex-col">
                            <FormLabel>Nouvelle date de début</FormLabel>
                            <Calendar
                                mode="single"
                                selected={form.watch("date_debut")}
                                onSelect={(date) => {
                                    if (date) form.setValue("date_debut", date);
                                }}
                                initialFocus
                            />
                        </div>

                        <div className="flex flex-1 flex-col">
                            <FormLabel>Nouvelle date de fin</FormLabel>
                            <Calendar
                                mode="single"
                                selected={form.watch("date_fin")}
                                onSelect={(date) => {
                                    if (date) form.setValue("date_fin", date);
                                }}
                                initialFocus
                            />
                        </div>
                    </div>
                )}

                <Button type="submit" className="mt-4">
                    {isSubmitting && <Loader className="mr-2 animate-spin" />}
                    {isUpdate ? "Mettre à jour" : "Créer"}
                </Button>
            </form>
        </Form>
    );
}

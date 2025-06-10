import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../Components/ui/form.js";
import axiosClient from "../../axiosClient.js";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Input } from "../../Components/ui/input.jsx";
import { Button } from "../../Components/ui/button.jsx";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { DatePickerDemo } from "../date-picker.jsx";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";

export default function ChercheurModifierCompte({ handleSubmit, values }) {
    const { user, setUser } = useStateContext();
    const [previewImage, setPreviewImage] = useState(user?.image || null);
    const formSchema = z.object({
        name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
        email: z.string().email("Veuillez entrer une adresse e-mail valide"),
        image: z
            .any()
            .refine((file) => !file || file instanceof File, {
                message: "Veuillez sélectionner une image valide",
            })
            .refine(
                (file) =>
                    !file ||
                    (file.type?.startsWith("image/") &&
                        file.size < 5 * 1024 * 1024),
                {
                    message: "Le fichier doit être une image inférieure à 5 Mo",
                }
            )
            .optional(),
        date_of_birth: z
            .string()
            .min(1, "La date de naissance est obligatoire"),
        gender: z.enum(["m", "f"], {
            required_error: "Le sexe est obligatoire",
        }),
        address: z.string().min(2, "L'adresse est obligatoire"),
        blood_type: z
            .enum(["O-", "O+", "A+", "A-", "B+", "B-", "AB+", "AB-"])
            .optional(),
        phone: z.string().min(6, "Le numéro de téléphone est obligatoire"),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: values || {
            name: user?.name || "",
            email: user?.email || "",
            image: undefined,
            date_of_birth: user?.date_of_birth || "",
            gender: user?.gender || "",
            address: user?.address || "",
            blood_type: user?.blood_type || "",
            phone: user?.phone || "",
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name || "",
                email: user.email || "",
                image: undefined,
                date_of_birth: user.date_of_birth || "",
                gender: user.gender || "",
                address: user.address || "",
                blood_type: user.blood_type || "",
                phone: user.phone || "",
            });
        }
    }, [user, form]);

    const {
        setError,
        formState: { isSubmitting },
        reset,
    } = form;

    const onSubmit = async (values) => {
        const loaderId = toast.loading(
            <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Mise à jour en cours...
            </div>,
            { duration: Infinity }
        );

        try {
            const formData = new FormData();

            // Ajouter toutes les valeurs au FormData
            formData.append("name", values.name || "");
            formData.append("email", values.email || "");
            formData.append("date_of_birth", values.date_of_birth || "");
            formData.append("gender", values.gender || "");
            formData.append("address", values.address || "");
            formData.append("phone", values.phone || "");

            if (values.blood_type) {
                formData.append("blood_type", values.blood_type);
            }

            if (values.image instanceof File) {
                formData.append("image", values.image);
            }
            for (let pair of formData.entries()) {
                console.log(pair[0] + ": " + pair[1]);
            }

            const response = await axiosClient.put(
                "/profile/update",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "ACCESS_TOKEN"
                        )}`,
                        // Ne pas mettre 'Content-Type' ici !
                    },
                }
            );

            if ([200, 201].includes(response?.status)) {
                // 1. Mettre à jour le contexte global
                setUser(response.data.user);

                // 2. Réinitialiser le formulaire avec les nouvelles valeurs
                form.reset({
                    ...response.data.user,
                    image: undefined, // Réinitialiser le champ fichier
                });

                // 3. Mettre à jour la prévisualisation de l'image
                setPreviewImage(
                    response.data.user.image
                        ? `http://localhost:8000/storage/${response.data.user.image}`
                        : null
                );

                toast.success(
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Profil mis à jour avec succès !
                    </div>,
                    { duration: 3000 }
                );
                console.log(
                    "Data being sent:",
                    Object.fromEntries(formData.entries())
                );

                return response.data;
            } else {
                throw new Error(
                    response?.data?.message || "Statut inattendu de la réponse"
                );
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);

            toast.error(
                <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    {error.response?.data?.errors
                        ? "Veuillez corriger les erreurs dans le formulaire"
                        : error.response?.data?.message ||
                          "Une erreur est survenue. Veuillez réessayer."}
                </div>,
                { duration: 5000 }
            );

            if (error.response?.data?.errors) {
                Object.entries(error.response.data.errors).forEach(
                    ([fieldName, errorMessages]) => {
                        form.setError(fieldName, {
                            type: "manual",
                            message: Array.isArray(errorMessages)
                                ? errorMessages.join(", ")
                                : errorMessages,
                        });
                    }
                );
            }

            throw error;
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
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="m@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <div className="flex items-center gap-4">
                                {/* Affichage de l'image actuelle ou prévisualisation */}
                                {field.value &&
                                    typeof field.value !== "string" && (
                                        <img
                                            src={URL.createObjectURL(
                                                field.value
                                            )}
                                            alt="Prévisualisation"
                                            className="w-16 h-16 rounded-full object-cover border"
                                        />
                                    )}
                                {!field.value && user.image && (
                                    <img
                                        src={`http://localhost:8000/storage/${user.image}`}
                                        alt="Image actuelle"
                                        className="w-16 h-16 rounded-full object-cover border"
                                    />
                                )}

                                {/* Input fichier */}
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            field.onChange(e.target.files?.[0])
                                        }
                                    />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date de naissance</FormLabel>
                            <FormControl>
                                <DatePickerDemo
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sexe</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Sexe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="m">Homme</SelectItem>
                                        <SelectItem value="f">Femme</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="blood_type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Groupe sanguin</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Groupe sanguin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="O-">O-</SelectItem>
                                        <SelectItem value="O+">O+</SelectItem>
                                        <SelectItem value="A+">A+</SelectItem>
                                        <SelectItem value="A-">A-</SelectItem>
                                        <SelectItem value="B+">B+</SelectItem>
                                        <SelectItem value="B-">B-</SelectItem>
                                        <SelectItem value="AB+">AB+</SelectItem>
                                        <SelectItem value="AB-">AB-</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adresse</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                                <Input type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="mt-4" disabled={isSubmitting}>
                    {isSubmitting && <Loader className="mr-2 animate-spin" />}
                    Mettre à jour
                </Button>
            </form>
        </Form>
    );
}

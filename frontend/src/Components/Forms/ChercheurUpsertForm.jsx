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

export default function ChercheurUpsertForm({ handleSubmit, values }) {
    const isUpdate = values !== undefined;

    const formSchema = z
        .object({
            name: z
                .string()
                .min(2, "Le nom doit contenir au moins 2 caractères"),
            email: z
                .string()
                .email("Veuillez entrer une adresse e-mail valide"),
            password: isUpdate
                ? z
                      .string()
                      .min(
                          8,
                          "Le mot de passe doit contenir au moins 8 caractères"
                      )
                      .optional()
                : z
                      .string()
                      .min(
                          8,
                          "Le mot de passe doit contenir au moins 8 caractères"
                      ),
            confirmPassword: isUpdate ? z.string().optional() : z.string(),
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
                        message:
                            "Le fichier doit être une image inférieure à 5 Mo",
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
        })
        .refine(
            (data) => {
                if (!isUpdate || data.password) {
                    return data.password === data.confirmPassword;
                }
                return true;
            },
            {
                message: "Les mots de passe ne correspondent pas",
                path: ["confirmPassword"],
            }
        );

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: values || {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            image: undefined,
            date_of_birth: "",
            gender: "",
            address: "",
            blood_type: "",
            phone: "",
        },
    });

    const {
        setError,
        formState: { isSubmitting },
        reset,
    } = form;

    const onSubmit = async (values) => {
        console.log("Valeurs du formulaire:", JSON.parse(JSON.stringify(values)));
        const loaderId = toast.loading(
            <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isUpdate ? "Mise à jour en cours..." : "Ajout en cours..."}
            </div>,
            { duration: Infinity }
        );

        try {
            const formData = new FormData();

            // Ajouter les champs obligatoires
            formData.append("name", values.name || "");
            formData.append("email", values.email || "");
            formData.append("date_of_birth", values.date_of_birth || "");
            formData.append("gender", values.gender || "");
            formData.append("address", values.address || "");
            formData.append("phone", values.phone || "");

            // Gestion conditionnelle du mot de passe
            if (!isUpdate) {
                // Mode création - mot de passe obligatoire
                formData.append("password", values.password);
                formData.append(
                    "password_confirmation",
                    values.confirmPassword
                );
            } else if (values.password) {
                // Mode mise à jour - mot de passe seulement si fourni
                formData.append("password", values.password || "");
                formData.append(
                    "password_confirmation",
                    values.confirmPassword
                );
            }

            // Champs optionnels
            if (values.blood_type) {
                formData.append("blood_type", values.blood_type || "");
            }

            // Gestion de l'image
            if (values.image instanceof File) {
                formData.append("image", values.image);
            } else if (isUpdate && typeof values.image === "string") {
                // Si en mode update et que l'image est une string (URL existante), on peut l'ignorer
                // ou la gérer selon votre logique backend
            }

            // Soumission avec les headers appropriés
            const response = await handleSubmit(formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Réponse de l'API:", response); // Ajoutez ce log


            // Gestion de la réponse
            if ([200, 201].includes(response?.status)) {
                reset();
                toast.success(
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {isUpdate
                            ? "Chercheur mis à jour avec succès !"
                            : "Chercheur ajouté avec succès !"}
                    </div>,
                    { duration: 3000 }
                );
                return response; // Retourner la réponse pour un éventuel traitement supplémentaire
            } else {
                throw new Error(
                    response?.data?.message || "Statut inattendu de la réponse"
                );
            }
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);

            toast.error(
                <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    {error.response?.data?.errors
                        ? "Veuillez corriger les erreurs dans le formulaire"
                        : "Une erreur est survenue. Veuillez réessayer."}
                </div>,
                { duration: 5000 }
            );

            // Gestion des erreurs de validation du backend
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

            // Propager l'erreur pour une éventuelle gestion supplémentaire
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
                            <FormLabel>Full Name</FormLabel>
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

                {!isUpdate && (
                    <>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Confirmer le mot de passe
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                )}

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        field.onChange(e.target.files?.[0]);
                                    }}
                                />
                            </FormControl>
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
                                <Input type="date" {...field} />
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
                                <select
                                    {...field}
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    <option value="">
                                        Sélectionner le sexe
                                    </option>
                                    <option value="m">Homme</option>
                                    <option value="f">Femme</option>
                                </select>
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
                    name="blood_type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Groupe sanguin</FormLabel>
                            <FormControl>
                                <select
                                    {...field}
                                    className="w-full rounded-md border px-3 py-2"
                                >
                                    <option value="">
                                        Sélectionner un groupe sanguin
                                    </option>
                                    <option value="O-">O-</option>
                                    <option value="O+">O+</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
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
                    {isUpdate ? "Mettre à jour" : "Créer"}
                </Button>
            </form>
        </Form>
    );
}

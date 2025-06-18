import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact2 = ({
    title = "Contactez-nous",
    description = "Nous sommes disponibles pour toute question, retour ou opportunité de collaboration. Faites-nous savoir comment nous pouvons vous aider !",
    phone = "(123) 34567890",
    email = "email@example.com",
    web = { label: "shadcnblocks.com", url: "https://shadcnblocks.com" },
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 10 * 1024 * 1024) {
            setIsDialogOpen(true);
            e.target.value = ""; // réinitialiser le champ fichier
        }
    };

    return (
        <section className="py-32">
            <div className="container">
                <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
                    <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
                        <div className="text-center lg:text-left">
                            <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                                {title}
                            </h1>
                            <p className="text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border p-10">
                        <div className="flex gap-4">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="firstname">Prénom</Label>
                                <Input
                                    type="text"
                                    id="firstname"
                                    placeholder="Prénom"
                                />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="lastname">Nom</Label>
                                <Input
                                    type="text"
                                    id="lastname"
                                    placeholder="Nom"
                                />
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Adresse e-mail</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Adresse e-mail"
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="subject">Objet</Label>
                            <Input
                                type="text"
                                id="subject"
                                placeholder="Objet"
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                placeholder="Tapez votre message ici."
                                id="message"
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="attachment">
                                Pièce jointe (CV, lettre... max 10 Mo)
                            </Label>
                            <Input
                                type="file"
                                id="attachment"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                            />
                        </div>
                        <Button className="w-full">Envoyer le message</Button>
                    </div>
                </div>
            </div>

            {/* Alert Dialog */}
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Fichier trop volumineux
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            La taille du fichier sélectionné dépasse 10 Mo.
                            Veuillez choisir un fichier plus léger (CV, lettre,
                            etc.).
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Fermer
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </section>
    );
};

export { Contact2 };

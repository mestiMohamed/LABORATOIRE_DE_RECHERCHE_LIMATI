import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

function MembreAdd() {
    const [chercheursDispos, setChercheursDispos] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const [equipeId, setEquipeId] = useState(null); // Ajouter ici l'état pour stocker l'ID de l'équipe

    // Charger les chercheurs sans équipe et obtenir l'equipe_id de l'utilisateur connecté
    useEffect(() => {
        const fetchChercheursAndEquipeId = async () => {
            try {
                // 1. Charger les chercheurs disponibles
                const chercheursResponse = await axiosClient.get(
                    "/chercheurs-disponibles"
                );
                if (Array.isArray(chercheursResponse.data)) {
                    setChercheursDispos(chercheursResponse.data);
                } else {
                    console.error(
                        "La réponse n'est pas un tableau:",
                        chercheursResponse.data
                    );
                    setChercheursDispos([]);
                }

                // 2. Récupérer l'utilisateur connecté et son equipe_id
                const userResponse = await axiosClient.get("/user"); // Assure-toi que cette route te renvoie l'utilisateur connecté
                if (userResponse.data.equipe_id) {
                    setEquipeId(userResponse.data.equipe_id);
                } else {
                    console.error("L'utilisateur connecté n'a pas d'equipe_id");
                }
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données:",
                    error
                );
                toast.error("Erreur lors du chargement des chercheurs");
                setChercheursDispos([]);
            }
        };

        fetchChercheursAndEquipeId();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedUserId || !equipeId) return; // S'assurer que l'ID de l'équipe et de l'utilisateur sont présents

        setLoading(true);
        try {
            // Envoi de la requête PUT pour assigner le chercheur à l'équipe
            await axiosClient.put(`/users/${selectedUserId}/assign-equipe`, {
                equipe_id: equipeId, // Utiliser l'equipe_id du chef d'équipe
            });

            toast.success("Chercheur ajouté à l'équipe !");
            setChercheursDispos((prev) =>
                prev.filter((u) => u.id !== parseInt(selectedUserId))
            );
            setSelectedUserId("");
        } catch (error) {
            console.error("Erreur lors de l'ajout du chercheur:", error);
            toast.error("Échec de l'ajout du membre");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <Label>Ajouter un membre à l'équipe</Label>
            <Select
                value={selectedUserId}
                onValueChange={setSelectedUserId}
                disabled={loading || chercheursDispos.length === 0}
            >
                <SelectTrigger>
                    <SelectValue
                        placeholder={
                            chercheursDispos.length === 0
                                ? "Aucun chercheur disponible"
                                : "Sélectionner un chercheur"
                        }
                    />
                </SelectTrigger>

                {chercheursDispos.length > 0 && (
                    <SelectContent>
                        {chercheursDispos.map((chercheur) => (
                            <SelectItem
                                key={chercheur.id}
                                value={String(chercheur.id)}
                            >
                                {chercheur.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                )}
            </Select>

            <Button
                type="submit"
                disabled={
                    loading ||
                    !selectedUserId ||
                    chercheursDispos.length === 0 ||
                    !equipeId
                }
            >
                {loading ? "Ajout en cours..." : "Ajouter à l'équipe"}
            </Button>
        </form>
    );
}

export default MembreAdd;

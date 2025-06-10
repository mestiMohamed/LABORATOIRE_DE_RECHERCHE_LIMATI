import React from "react";
import ChercheurModifierCompte from "../Forms/ChercheurModifierCompte";

function ChercheurManageAccount(props) {
    return (
        <>
            <div>
                <div className=" flex flex-col items-center gap-2">
                    <h1 className=" text-3xl font-semibold ">
                        Mon compte - Informations personnelles
                    </h1>
                    <p className="text-center text-lg font-medium text-muted-foreground">
                        Gérez vos informations personnelles associées à votre
                        compte chercheur. Vous pouvez modifier vos coordonnées,
                        votre date de naissance, votre adresse, votre image de
                        profil, etc. Pour changer votre mot de passe, veuillez
                        utiliser le formulaire dédié plus bas.
                    </p>
                </div>
            </div>
            <div className="border m-5 p-12 rounded-lg">
                <div>
                    <h1 className=" text-3xl font-semibold mb-8">
                        Modifier mes informations personnelles
                    </h1>
                    <ChercheurModifierCompte />
                </div>
            </div>
        </>
    );
}

export default ChercheurManageAccount;

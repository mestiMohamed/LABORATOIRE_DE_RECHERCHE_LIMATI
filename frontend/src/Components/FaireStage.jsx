import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const FaireStage = ({
  heading = " Faire son stage au LIMATI",
  description = "Si vous souhaitez nous contacter pour faire votre stage au LIMATI du L1 au M2, n’hésitez pas à remplir le formulaire prévu à cet effet.",
  buttons = {
    primary: {
      text: "Remplir le formulaire",
      url: "/nous-contacter",
    },
  },
}) => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="flex w-full flex-col gap-16 overflow-hidden rounded-lg bg-accent p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-16">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h3>
            <p className="max-w-xl text-muted-foreground lg:text-lg">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {buttons.primary && (
              <Button asChild>
                <Link to={buttons.primary.url}>{buttons.primary.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { FaireStage };

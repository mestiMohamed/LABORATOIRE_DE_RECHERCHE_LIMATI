import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import av1 from "../assets/images_d'acceuil/img/prof1.jpg"
import av2 from "../assets/images_d'acceuil/img/prof2.jpg"
import av3 from "../assets/images_d'acceuil/img/prof3.jpg"
import av4 from "../assets/images_d'acceuil/img/prof4.jpg"
import av5 from "../assets/images_d'acceuil/img/prof5.jpg"
import av6 from "../assets/images_d'acceuil/img/prof6.jpg"
import av7 from "../assets/images_d'acceuil/img/prof7.jpg"
import av8 from "../assets/images_d'acceuil/img/prof8.jpg"
const Team1 = ({
    heading = "Nos membres",
    subheading = "Laboratoire LIMATI",
    description = "Le LIMATI regroupe une équipe pluridisciplinaire composée d’enseignants-chercheurs, d’ingénieurs et d’étudiants-chercheurs, unis par une même ambition : faire progresser les connaissances en mathématiques appliquées, en informatique et en technologies de l'information. Ensemble, ils collaborent sur des projets innovants à fort impact scientifique et sociétal.",
    members = [
        {
            id: "person-1",
            name: "john doe",
            role: "Responsable du laboratoire",
            avatar: av1,
        },
        {
            id: "person-2",
            name: "Jane Smith",
            role: "Chercheure senior",
            avatar: av2,
        },
        {
            id: "person-3",
            name: "Alice Johnson",
            role: "chercheure junior",
            avatar: av3,
        },
        {
            id: "person-4",
            name: "Bob Brown",
            role: "chercheure senior",
            avatar: av4,
        },
        {
            id: "person-5",
            name: "Charlie Davis",
            role: "Chercheur junior",
            avatar: av5,
        },
        {
            id: "person-6",
            name: "Emily Wilson",
            role: "Chercheuse senior",
            avatar: av6,
        },
        {
            id: "person-7",
            name: "Michael Taylor",
            role: "Chercheur junior",
            avatar: av7,
        },
        {
            id: "person-8",
            name: "alex Miller",
            role: "Chercheuse senior",
            avatar: av8,
        },
    ],
}) => {
    return (
        <section className="py-16">
            <div className="container flex flex-col items-center text-center">
                <p className="semibold">{subheading}</p>
                <h2 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
                    {heading}
                </h2>
                <p className="mb-8 max-w-6xl text-muted-foreground lg:text-xl">
                    {description}
                </p>
            </div>
            <div className="container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
                {members.map((person) => (
                    <div key={person.id} className="flex flex-col items-center">
                        <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
                            <AvatarImage src={person.avatar} />
                            <AvatarFallback>{person.name}</AvatarFallback>
                        </Avatar>
                        <p className="text-center font-medium">{person.name}</p>
                        <p className="text-center text-muted-foreground">
                            {person.role}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export { Team1 };

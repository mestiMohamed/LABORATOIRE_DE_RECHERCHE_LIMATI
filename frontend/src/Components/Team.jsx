import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Team1 = ({
    heading = "Nos membres",
    subheading = "Laboratoire LIMATI",
    description = "Le LIMATI regroupe une équipe pluridisciplinaire composée d’enseignants-chercheurs, d’ingénieurs et d’étudiants-chercheurs, unis par une même ambition : faire progresser les connaissances en mathématiques appliquées, en informatique et en technologies de l'information. Ensemble, ils collaborent sur des projets innovants à fort impact scientifique et sociétal.",
    members = [
        {
            id: "person-1",
            name: "Name",
            role: "Role",
            avatar: "https://shadcnblocks.com/images/block/avatar-1.webp",
        },
        {
            id: "person-2",
            name: "Name",
            role: "Role",
            avatar: "https://shadcnblocks.com/images/block/avatar-2.webp",
        },
        {
            id: "person-3",
            name: "Name",
            role: "Role",
            avatar: "https://shadcnblocks.com/images/block/avatar-3.webp",
        },
        {
            id: "person-4",
            name: "Name",
            role: "Role",
            avatar: "https://shadcnblocks.com/images/block/avatar-4.webp",
        },
        {
            id: "person-5",
            name: "Name",
            role: "Role",
            avatar: "https://shadcnblocks.com/images/block/avatar-5.webp",
        },
        {
            id: "person-6",
            name: "Name",
            role: "Role",
            avatar: "https://shadcnblocks.com/images/block/avatar-6.webp",
        },
        {
            id: "person-7",
            name: "Name",
            role: "Role",
            avatar: "https://shadcnblocks.com/images/block/avatar-7.webp",
        },
        {
            id: "person-8",
            name: "Name",
            role: "Role",
            avatar: "https://shadcnblocks.com/images/block/avatar-8.webp",
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

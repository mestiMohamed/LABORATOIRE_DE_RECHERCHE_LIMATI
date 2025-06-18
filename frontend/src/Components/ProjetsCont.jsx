import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import axiosClient from "../axiosClient";

const ProjetsCon = ({
    tagline = "Derniers projets",
    heading = "Projets de recherche",
    description = "Découvrez les derniers projets menés par les chercheurs et les équipes de notre institution.",
}) => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        axiosClient
            .get("/admin/projets")
            .then(({ data }) => {
                setPosts(data.data || []);
            })
            .catch((err) => {
                console.error("Erreur lors du chargement des projets", err);
            });
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const paginatedPosts = posts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    return (
        <section className="py-32">
            <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
                <div className="text-center">
                    <Badge variant="secondary" className="mb-6">
                        {tagline}
                    </Badge>
                    <h2 className="mb-3 text-3xl font-semibold md:text-4xl lg:text-5xl">
                        {heading}
                    </h2>
                    <p className="mb-8 text-muted-foreground lg:max-w-2xl">
                        {description}
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 w-full">
                    {paginatedPosts.map((post) => {
                        const isPublic = post.status === "publique";
                        const statusIcon = isPublic ? (
                            <CheckCircle className="text-green-500" size={18} />
                        ) : (
                            <Clock className="text-yellow-500" size={18} />
                        );

                        return (
                            <Card
                                key={post.id}
                                className="grid grid-rows-[auto_auto_1fr_auto] pt-0"
                            >
                                <div className="aspect-16/9 w-full bg-gray-200 flex items-center justify-center text-muted-foreground text-sm">
                                    Projet #{post.id}
                                </div>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold md:text-xl">
                                            {post.name}
                                        </h3>
                                        {statusIcon}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground line-clamp-3">
                                        {post.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="justify-between items-center">
                                    <Dialog
                                        open={dialogOpen}
                                        onOpenChange={setDialogOpen}
                                    >
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="link"
                                                className="p-0 h-auto text-sm"
                                                onClick={() => {
                                                    setSelectedPost(post);
                                                    setDialogOpen(true);
                                                }}
                                            >
                                                Lire plus
                                                <ArrowRight className="ml-1 size-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-xl">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    {selectedPost?.name}
                                                </DialogTitle>
                                                <DialogDescription>
                                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap mb-4">
                                                        {
                                                            selectedPost?.description
                                                        }
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        Début :{" "}
                                                        {
                                                            selectedPost?.date_debut
                                                        }{" "}
                                                        <br />
                                                        Fin :{" "}
                                                        {selectedPost?.date_fin ||
                                                            "Non définie"}
                                                    </p>
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination>
                        <PaginationContent className="gap-2 mt-10">
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )
                                    }
                                    className={
                                        currentPage === 1
                                            ? "pointer-events-none opacity-50"
                                            : ""
                                    }
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <PaginationItem key={i}>
                                    <Button
                                        variant={
                                            currentPage === i + 1
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() => setCurrentPage(i + 1)}
                                        className="h-8 px-3 text-sm"
                                    >
                                        {i + 1}
                                    </Button>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, totalPages)
                                        )
                                    }
                                    className={
                                        currentPage === totalPages
                                            ? "pointer-events-none opacity-50"
                                            : ""
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </section>
    );
};

export { ProjetsCon };

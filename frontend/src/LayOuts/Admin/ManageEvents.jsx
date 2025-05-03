import React from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../axiosClient";
import {Tabs, TabsContent, TabsTrigger, TabsList} from "@/components/ui/Tabs"
import {Separator} from "@/components/ui/Separator"
import {ScrollArea, ScrollBar} from "../../Components/ui/scroll-area"
import EventUpsertForm from "../../Components/Forms/EventUpsertForm";
import EventApi from "../../Components/services/Api/EventApi";

function ManageEvents(props) {
    const { user, setUser } = useStateContext();

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <>
            <div className="relative overflow-x-auto">
                <div className="hidden md:block">
                    <div className="">
                        <div className="bg-background">
                            <div className="grid">
                                <div className="col-span-3 lg:col-span-4">
                                    <div className="h-full px-4 py-6 lg:px-8">
                                        <Tabs
                                            defaultValue="parents_list"
                                            className="h-full space-y-6"
                                        >
                                            <div className="space-between flex items-center">
                                                <TabsList>
                                                    <TabsTrigger
                                                        value="parents_list"
                                                        className="relative"
                                                    >
                                                        Events
                                                    </TabsTrigger>
                                                    <TabsTrigger value="add_parent">
                                                        Add new Event
                                                    </TabsTrigger>
                                                </TabsList>
                                            </div>
                                            <TabsContent
                                                value="parents_list"
                                                className="border-none p-0 outline-none"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-1 w-full">
                                                        <h2 className="text-2xl font-semibold tracking-tight">
                                                            All parents
                                                        </h2>
                                                        
                                                    </div>
                                                </div>
                                                <Separator className="my-4" />
                                                <div className="relative">
                                                    <ScrollArea>
                                                        <div className="flex space-x-4 pb-4"></div>
                                                        <ScrollBar orientation="horizontal" />
                                                    </ScrollArea>
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="add_parent">
                                                <div className="space-y-1">
                                                <EventUpsertForm handleSubmit={(values) => EventApi.create(values)}/>
                                                </div>
                                                <Separator className="my-4" />
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageEvents;

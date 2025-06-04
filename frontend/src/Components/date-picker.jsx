"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "./ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerDemo({ value, onChange }) {
    const [stringDate, setStringDate] = React.useState(value || "");
    const [date, setDate] = React.useState(value ? new Date(value) : undefined);
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        if (value) {
            setStringDate(value);
            setDate(new Date(value));
        }
    }, [value]);

    return (
        <Popover>
            <div className="relative w-full">
                <Input
                    type="string"
                    value={stringDate}
                    onChange={(e) => {
                        setStringDate(e.target.value);
                        const parsedDate = new Date(e.target.value);
                        if (parsedDate.toString() === "Invalid Date") {
                            setErrorMessage("Date invalide");
                            setDate(undefined);
                            onChange(""); // Efface dans RHF
                        } else {
                            setErrorMessage("");
                            setDate(parsedDate);
                            onChange(e.target.value); // Met à jour RHF
                        }
                    }}
                    placeholder="aaaa-mm-jj"
                />
                {errorMessage !== "" && (
                    <div className="absolute bottom-[-1.75rem] left-0 text-red-400 text-sm">
                        {errorMessage}
                    </div>
                )}
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="w-4 h-4" />
                    </Button>
                </PopoverTrigger>
            </div>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                        if (!selectedDate) return;
                        const formatted = format(selectedDate, "yyyy-MM-dd");
                        setDate(selectedDate);
                        setStringDate(formatted);
                        setErrorMessage("");
                        onChange(formatted); // MAJ RHF
                    }}
                    defaultMonth={date}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

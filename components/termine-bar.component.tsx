"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ViewEnum } from "@/enums/view-type.enum";

interface Props {
  view: ViewEnum;
  setView: (view: ViewEnum) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export default function TermineBarComponent({
  view,
  setView,
  selectedDate,
  setSelectedDate,
}: Props) {
  return (
    <div className="flex items-center gap-4 mb-4 justify-between">
      <div className="flex items-center gap-4 mb-4">
        {/* Calendar Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
              >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "dd MMMM yyyy") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* View Toggle Buttons */}
        <div className="flex gap-2">
          {Object.values(ViewEnum).map((v) => (
            <Button
              key={v}
              variant={v === view ? "default" : "outline"}
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()}
            </Button>
          ))}
        </div>
      </div>

      <div className='flex flex-row gap-5'>
        <div id='termine-filtern-btn' className='cursor-pointer flex flex-row gap-2 items-center justify-center border border-s border-1 border-black w-fit h-8 px-3 py-1 text-sm rounded-md'>
          <SlidersHorizontal color="black" size={12} />
          <p>Termine filtern</p>
        </div>
        <div id='termine-filtern-btn' className='cursor-pointer bg-black flex flex-row gap-2 items-center justify-center border border-s border-1 border-black w-fit h-8 px-3 py-1 text-sm rounded-md'>
          <Plus color="white" size={12} />
          <p className='text-white'>Neuer Termin</p>
        </div>
      </div>
    </div>
  );
}

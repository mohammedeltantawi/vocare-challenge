"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ViewEnum } from "@/enums/view-type.enum";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useCategories } from "@/context/category.context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppointmentForm from "./new-appointment-form.component";

interface Props {
  view: ViewEnum;
  setView: (view: ViewEnum) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedCategories: string[];
  setSelectedCategories: (ids: string[]) => void;
  selectedClient: string;
  setSelectedClient: (name: string) => void;
  dateRange: { from: Date | null; to: Date | null };
  setDateRange: (range: { from: Date | null; to: Date | null }) => void;
}

export default function TermineBarComponent({
  view,
  setView,
  selectedDate,
  setSelectedDate,
  selectedCategories,
  setSelectedCategories,
  selectedClient,
  setSelectedClient,
  dateRange,
  setDateRange,
}: Props) {
  const categories = useCategories();
  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4 justify-between">
      <div className="flex items-center gap-4">
        {/* Calendar Picker */}
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
        <div className="flex gap-2 bg-secondary p-1 rounded">
          {Object.values(ViewEnum).map((v) => (
            <Button
              key={v}
              variant={v === view ? "outline" : "ghost"}
              size="sm"
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer flex flex-row gap-2 items-center justify-center border border-black w-fit h-8 px-3 py-1 text-sm rounded-md">
              <SlidersHorizontal size={12} />
              <span>Termine filtern</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Categories */}
              <div>
                <h4 className="font-semibold mb-2">Kategorien</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={selectedCategories.includes(cat.id)}
                        onCheckedChange={() => toggleCategory(cat.id)}
                      />
                      {cat.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Client */}
              <div>
                <Label className="font-semibold mb-1 block">Klient*in</Label>
                <Input
                  type="text"
                  placeholder="Name eingeben..."
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                />
              </div>

              {/* Time Period */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm mb-1 block">Von</Label>
                  <Input
                    type="date"
                    value={dateRange.from?.toISOString().split("T")[0] ?? ""}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, from: e.target.value ? new Date(e.target.value) : null })
                    }
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">Bis</Label>
                  <Input
                    type="date"
                    value={dateRange.to?.toISOString().split("T")[0] ?? ""}
                    onChange={(e) =>
                      setDateRange({ ...dateRange, to: e.target.value ? new Date(e.target.value) : null })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedClient("");
                  setDateRange({ from: null, to: null });
                }}
              >
                Filter zurücksetzen
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <div className="cursor-pointer bg-black flex flex-row gap-2 items-center justify-center w-fit h-8 px-3 py-1 text-sm rounded-md">
              <Plus color="white" size={12} />
              <span className="text-white">Neuer Termin</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <AppointmentForm onSuccess={() => window.location.reload()} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

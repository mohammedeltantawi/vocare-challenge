"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Category } from "@/models/category.model";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Props {
  categories: Category[];
  selectedCategories: string[];
  setSelectedCategories: (ids: string[]) => void;
}

export default function FilterDialog({ categories, selectedCategories, setSelectedCategories }: Props) {
  const toggleCategory = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(c => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Termine filtern</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Filter</DialogTitle>
        <DialogHeader>Filter</DialogHeader>

        <div className="space-y-4">
          <h4 className="font-semibold">Kategorien</h4>
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              {cat.label}
            </label>
          ))}
        </div>

        {/* Optional: Add date range or client filter here */}
      </DialogContent>
    </Dialog>
  );
}

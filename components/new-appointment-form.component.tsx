"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/context/category.context";
import { usePatients } from "@/context/patient.context";
import { createClient } from "@/lib/supabase/client";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onSuccess?: () => void;
}

export default function AppointmentForm({ onSuccess }: Props) {
  const supabase = createClient();
  const categories = useCategories();
  const patients = usePatients();

  const [form, setForm] = useState({
    title: "",
    start: "",
    end: "",
    location: "",
    notes: "",
    patient: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("appointments").insert([
      {
        title: form.title,
        start: new Date(form.start).toISOString(),
        end: new Date(form.end).toISOString(),
        location: form.location,
        notes: form.notes,
        patient: form.patient,
        category: form.category,
        attachements: null, // set this as needed
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Fehler beim Speichern des Termins");
      console.error(error);
    } else {
      onSuccess?.();
      setForm({
        title: "",
        start: "",
        end: "",
        location: "",
        notes: "",
        patient: "",
        category: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Titel</Label>
        <Input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Start</Label>
          <Input
            type="datetime-local"
            value={form.start}
            onChange={(e) => handleChange("start", e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Ende</Label>
          <Input
            type="datetime-local"
            value={form.end}
            onChange={(e) => handleChange("end", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label>Patient*in</Label>
        <select
          value={form.patient}
          onChange={(e) => handleChange("patient", e.target.value)}
          className="w-full border border-gray-300 rounded-md text-sm px-3 py-2 mt-1"
          required
        >
          <option value="" disabled>Wählen</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {`${p.firstname} ${p.lastname}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Kategorie</Label>
        <select
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full border border-gray-300 rounded-md text-sm px-3 py-2 mt-1"
          required
        >
          <option value="" disabled>Kategorie wählen</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Ort</Label>
        <Input
          type="text"
          value={form.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div>
        <Label>Notizen</Label>
        <Textarea
          value={form.notes}
          onChange={(e: { target: { value: string; }; }) => handleChange("notes", e.target.value)}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Speichern..." : "Speichern"}
      </Button>
    </form>
  );
}

// context/CategoryContext.tsx
import { Patient } from "@/models/patient.model";
import { createContext, useContext } from "react";

export const PatientContext = createContext<Patient[]>([]);

export const useCategories = () => useContext(PatientContext);

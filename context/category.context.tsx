// context/CategoryContext.tsx
import { Category } from "@/models/category.model";
import { createContext, useContext } from "react";


export const CategoryContext = createContext<Category[]>([]);

export const useCategories = () => useContext(CategoryContext);

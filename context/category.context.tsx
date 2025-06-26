// context/CategoryContext.tsx
import { createContext, useContext } from "react";

type Category = {
  id: string;
  label: string;
  color: string;
};

export const CategoryContext = createContext<Category[]>([]);

export const useCategories = () => useContext(CategoryContext);

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { FavoritesSlicesType, createFavoritesSlice } from "./FavoritesSlice";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";



// En el Arrow Function, el valor '...a' lo que hace es obtener todos los argumentos posibles de store
export const useAppStore = create<RecipesSliceType & FavoritesSlicesType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
})))


import { create } from "zustand";

export const PROJECT_CATEGORIES = ["All", "Web", "Mobile", "Backend & API"] as const;
export type CategoryFilter = (typeof PROJECT_CATEGORIES)[number];

interface UIState {
  activeCategory: CategoryFilter;
  setActiveCategory: (category: CategoryFilter) => void;

  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeCategory: "All",
  setActiveCategory: (category) => set({ activeCategory: category }),

  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));

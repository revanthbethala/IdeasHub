// store/ideaStore.ts
import { create } from 'zustand';

export type FormData = {
  title: string;
  description: string;
  techStack: string[];
  tags: string[];
};

interface IdeaState {
  formData: FormData;
  setFormField: (field: keyof FormData, value: string | string[]) => void;
  resetForm: () => void;
  addTech: (tech: string) => void;
  removeTech: (tech: string) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

export const useIdeaStore = create<IdeaState>((set) => ({
  formData: {
    title: '',
    description: '',
    techStack: [],
    tags: [],
  },
  setFormField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),
  resetForm: () =>
    set({
      formData: {
        title: '',
        description: '',
        techStack: [],
        tags: [],
      },
    }),
  addTech: (tech) =>
    set((state) => ({
      formData: {
        ...state.formData,
        techStack: [...new Set([...state.formData.techStack, tech.trim()])],
      },
    })),
  removeTech: (tech) =>
    set((state) => ({
      formData: {
        ...state.formData,
        techStack: state.formData.techStack.filter((t) => t !== tech),
      },
    })),
  addTag: (tag) =>
    set((state) => ({
      formData: {
        ...state.formData,
        tags: [...new Set([...state.formData.tags, tag.trim()])],
      },
    })),
  removeTag: (tag) =>
    set((state) => ({
      formData: {
        ...state.formData,
        tags: state.formData.tags.filter((t) => t !== tag),
      },
    })),
}));

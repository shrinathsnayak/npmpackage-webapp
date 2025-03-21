"use client";

import { useLocalStorage } from "@mantine/hooks";

export const useBookmark = () => {
  const [value, setValue, removeValue] = useLocalStorage<any[]>({
    key: "bookmark",
    defaultValue: [],
  });

  const removeBookmark = (key: string) => {
    const storageValue = value.filter((value: any) => value.key !== key);
    setValue([...storageValue]);
  };

  const addBookmark = (obj: any) => {
    setValue([...value, obj]);
  };

  const isBookmarked = (key?: any) =>
    value.find((value: any) => value.key === key);

  return {
    value,
    removeBookmark,
    addBookmark,
    clearBookmark: removeValue,
    isBookmarked,
  };
};

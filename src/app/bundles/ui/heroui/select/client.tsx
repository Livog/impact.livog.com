"use client";

import {Select, SelectItem} from "@heroui/react";

export function SelectPage() {
  const animals = [
    {key: "cat", label: "Cat"},
    {key: "dog", label: "Dog"},
    {key: "elephant", label: "Elephant"},
    {key: "lion", label: "Lion"},
  ];
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select className="max-w-xs" label="Select an animal">
        {animals.map((animal) => (
          <SelectItem key={animal.key}>{animal.label}</SelectItem>
        ))}
      </Select>
      <Select className="max-w-xs" label="Favorite Animal" placeholder="Select an animal">
        {animals.map((animal) => (
          <SelectItem key={animal.key}>{animal.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}

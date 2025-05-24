"use client";

import {Autocomplete, AutocompleteItem} from "@heroui/react";

export function AutocompletePage() {
  const animals = [
    {label: "Cat", key: "cat"},
    {label: "Dog", key: "dog"},
    {label: "Elephant", key: "elephant"},
    {label: "Lion", key: "lion"},
    {label: "Tiger", key: "tiger"},
    {label: "Giraffe", key: "giraffe"},
  ];
  return (
    <Autocomplete className="max-w-xs" label="Select an animal">
      {animals.map((animal) => (
        <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
      ))}
    </Autocomplete>
  );
}

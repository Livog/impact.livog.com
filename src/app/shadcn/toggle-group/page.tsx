import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupPage() {
  return (
    <ToggleGroup type="single">
      <ToggleGroupItem value="1">Item 1</ToggleGroupItem>
      <ToggleGroupItem value="2">Item 2</ToggleGroupItem>
    </ToggleGroup>
  );
} 
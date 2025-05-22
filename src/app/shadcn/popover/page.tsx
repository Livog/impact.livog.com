import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export default function PopoverPage() {
  return (
    <Popover>
      <PopoverTrigger>Open Popover</PopoverTrigger>
      <PopoverContent>Popover content</PopoverContent>
    </Popover>
  );
} 
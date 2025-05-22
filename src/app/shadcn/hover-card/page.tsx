import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

export default function HoverCardPage() {
  return (
    <HoverCard>
      <HoverCardTrigger>Hover me</HoverCardTrigger>
      <HoverCardContent>Hover card content</HoverCardContent>
    </HoverCard>
  );
} 
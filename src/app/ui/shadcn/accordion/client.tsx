"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function AccordionPage() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Accordion Item</AccordionTrigger>
        <AccordionContent>Accordion content</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
} 

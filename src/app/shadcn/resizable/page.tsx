import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function ResizablePage() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>Panel 1</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>Panel 2</ResizablePanel>
    </ResizablePanelGroup>
  );
} 
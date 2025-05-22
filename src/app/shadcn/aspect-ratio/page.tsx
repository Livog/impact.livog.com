import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioPage() {
  return (
    <AspectRatio ratio={16 / 9}>
      <div style={{ background: '#eee', width: '100%', height: '100%' }}>AspectRatio</div>
    </AspectRatio>
  );
} 
import { Container } from "@/components/container";
import HeroBackground from "@/components/hero-background";
import SearchDirect from "@/components/search-direct";
import { Section } from "@/components/section";

export default function SearchBlock() {
  return (
    <Section spacing="xlarge" background={<HeroBackground />} className="min-h-screen flex flex-col items-center justify-center">
      <Container className="relative">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Know Your Bundle Impact
        </h1>
        <p className="text-lg md:text-xl text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
          Discover the real weight of UI packages before you install them. 
          Make informed decisions about your dependencies and keep your bundle size in check.
        </p>
        <div className="w-full max-w-xl min-h-60 relative mx-auto">
          <SearchDirect className="absolute top-0 left-0 w-full" />
        </div>
      </Container>
    </Section>
  );
}

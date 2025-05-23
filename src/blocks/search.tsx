import { Container } from "@/components/container";
import { HeroBackground } from "@/components/hero-background";
import SearchDirect from "@/components/search-direct";
import { Section } from "@/components/section";

export function SearchBlock() {
  return (
    <Section spacing="xlarge" background={<HeroBackground />} className="min-h-screen flex flex-col items-center justify-center">
      <Container className="relative">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Impact Of UI Components
        </h1>
        <div className="w-full max-w-xl min-h-60 relative mx-auto">
          <SearchDirect className="absolute top-0 left-0 w-full" />
        </div>
      </Container>
    </Section>
  );
}

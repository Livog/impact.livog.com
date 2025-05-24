import { Container } from '@/components/container'
import { HeroBackground } from '@/components/hero-background'
import { SearchDirect } from '@/components/search-direct'
import { Section } from '@/components/section'

export function SearchBlock() {
  return (
    <Section spacing="xlarge" background={<HeroBackground />} className="flex min-h-screen flex-col items-center justify-center">
      <Container className="relative">
        <h1 className="mb-4 text-center text-4xl font-bold md:text-6xl">Know Your Bundle Impact</h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-3xl text-center text-lg md:text-xl">
          Discover the real weight of UI packages before you install them. Make informed decisions about your dependencies and keep your
          bundle size in check.
        </p>
        <div className="relative mx-auto min-h-60 w-full max-w-xl">
          <SearchDirect className="absolute top-0 left-0 w-full" />
        </div>
      </Container>
    </Section>
  )
}

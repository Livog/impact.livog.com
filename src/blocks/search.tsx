import { Container } from '@/components/container'
import { HeroBackground } from '@/components/hero-background'
import { SearchDirect } from '@/components/search-direct'
import { Section } from '@/components/section'

export function SearchBlock() {
  return (
    <Section spacing="xlarge" background={<HeroBackground />} className="flex min-h-screen flex-col items-center justify-center">
      <Container className="relative">
        <h1 className="mb-4 text-center text-4xl font-bold md:text-6xl">
          Know Your Bundle <span className="bg-gradient-to-br from-purple-400 to-indigo-400 inline-block text-transparent bg-clip-text">Impact</span>
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 text-center text-lg md:text-xl">
          Know the exact impact of UI packages—control your dependencies and bundle size.
        </p>
        <div className="relative mx-auto min-h-60 w-full max-w-xl">
          <SearchDirect className="absolute top-0 left-0 w-full" />
        </div>
      </Container>
    </Section>
  )
}

import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getUiIndex } from '@/lib/ui-index'

export interface SidebarKit {
  name: string
  components: string[]
}

export async function SidebarNav() {
  const kits = await getUiIndex()
  return (
    <aside className="border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
      <Accordion type="multiple" className="space-y-1">
        {kits.map((kit) => (
          <AccordionItem value={kit.name} key={kit.name}>
            <AccordionTrigger className="text-sm capitalize">{kit.name}</AccordionTrigger>
            <AccordionContent>
              <ul className="pl-2 text-sm">
                <li>
                  <Link href={`/ui/${kit.name}`} className="block py-1">
                    Overview
                  </Link>
                </li>
                {kit.components.map((c) => (
                  <li key={c}>
                    <Link href={`/bundles/ui/${kit.name}/${c}`} className="text-muted-foreground hover:text-foreground block py-1">
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  )
}

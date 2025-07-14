import type { ComponentPropsWithRef, ElementType } from 'react'

export type PolymorphicAsProp<E extends ElementType> = {
  as?: E
}

export type PolymorphicProps<E extends ElementType, P extends object = object> = P &
  PolymorphicAsProp<E> &
  Omit<ComponentPropsWithRef<E>, keyof PolymorphicAsProp<E>> 
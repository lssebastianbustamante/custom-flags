declare module 'vtex.styleguide'

declare module '@vtex/styleguide/lib/*' {
  import type { ComponentType } from 'react'

  const Component: ComponentType<unknown>
  export default Component
}

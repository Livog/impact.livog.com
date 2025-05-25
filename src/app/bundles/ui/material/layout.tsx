import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppRouterCacheProvider options={{ enableCssLayer: true }}>{children}</AppRouterCacheProvider>
}
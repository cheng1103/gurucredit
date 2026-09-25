import type { Metadata } from 'next';
import { localizedMetadata } from '@/lib/seo';
import { meta } from './metadata';

export async function generateMetadata(): Promise<Metadata> {
  return { ...(await localizedMetadata(meta)), robots: { index: false, follow: false } };
}

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return children;
}

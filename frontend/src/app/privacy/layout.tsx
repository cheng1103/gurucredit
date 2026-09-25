import { localizedMetadata } from '@/lib/seo';
import { meta } from './metadata';

export async function generateMetadata() {
  return localizedMetadata(meta);
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}

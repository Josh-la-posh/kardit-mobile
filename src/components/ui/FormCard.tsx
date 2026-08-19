import type { PropsWithChildren } from 'react';

import { InfoCard } from '@/components/ui/InfoCard';

export function FormCard({ children, title }: PropsWithChildren<{ title: string }>) {
  return <InfoCard title={title}>{children}</InfoCard>;
}

import { Screen } from '@/components/layout/Screen';
import { EmptyState } from '@/components/ui/EmptyState';

export function TransactionsScreen() {
  return (
    <Screen>
      <EmptyState
        title="No transactions"
        message="Card loads, spends, and status updates will appear here."
      />
    </Screen>
  );
}

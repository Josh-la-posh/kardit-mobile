import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ListItem } from '@/components/ui/ListItem';
import type { CasesStackParamList } from '@/navigation/types';
import { mockCases } from '@/utils/mockData';

type Props = NativeStackScreenProps<CasesStackParamList, 'CasesHome'>;

export function CasesScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Support cases"
        subtitle="Create demo cases, attach evidence placeholders, and review Service Provider update timelines."
      />
      <Button onPress={() => navigation.navigate('CaseType')}>Create case</Button>
      {mockCases.length === 0 ? (
        <EmptyState title="No cases" message="Support cases and their statuses will appear here." />
      ) : (
        mockCases.map((supportCase) => (
          <ListItem
            key={supportCase.id}
            title={supportCase.title}
            meta={`${supportCase.reference} | ${supportCase.priority} | Updated ${supportCase.lastUpdatedAt}`}
            detail={supportCase.status}
            onPress={() => navigation.navigate('CaseDetails', { caseId: supportCase.id })}
          />
        ))
      )}
    </Screen>
  );
}

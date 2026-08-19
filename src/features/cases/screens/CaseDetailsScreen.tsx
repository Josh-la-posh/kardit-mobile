import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { StatusPill } from '@/components/ui/StatusPill';
import { Timeline } from '@/components/ui/Timeline';
import type { CasesStackParamList } from '@/navigation/types';
import { mockCases } from '@/utils/mockData';

type Props = NativeStackScreenProps<CasesStackParamList, 'CaseDetails'>;

export function CaseDetailsScreen({ navigation, route }: Props) {
  const supportCase = mockCases.find((item) => item.id === route.params.caseId) ?? mockCases[0];

  return (
    <Screen>
      <AppHeader
        title="Case details"
        subtitle="Demo support record with linked context, evidence placeholders, and update timeline."
      />
      <InfoCard title={supportCase.title}>
        <StatusPill label={supportCase.status} tone="warning" />
        <ListItem title="Reference" detail={supportCase.reference} />
        <ListItem title="Priority" detail={supportCase.priority} />
        <ListItem title="Type" detail={supportCase.type} />
        <ListItem title="Description" meta={supportCase.description} />
        <ListItem
          title="Related record"
          detail={supportCase.relatedRecord?.label ?? 'Not linked'}
        />
      </InfoCard>
      <InfoCard title="Evidence">
        {supportCase.evidence?.length ? (
          supportCase.evidence.map((item) => (
            <ListItem
              key={item.id}
              title={item.fileName}
              detail={item.uploadedAt ?? 'Pending upload'}
            />
          ))
        ) : (
          <EmptyState title="No evidence" message="Evidence attachments will appear here." />
        )}
      </InfoCard>
      <InfoCard title="Case updates">
        <Timeline
          items={supportCase.updates.map((update) => ({
            id: update.id,
            label: update.message,
            meta: `${update.author} | ${update.createdAt}`,
          }))}
        />
      </InfoCard>
      <Button onPress={() => navigation.navigate('CaseEvidence', { caseId: supportCase.id })}>
        Attach evidence demo
      </Button>
      <Button
        variant="secondary"
        onPress={() => navigation.navigate('CaseInformationResponse', { caseId: supportCase.id })}
      >
        Respond to request demo
      </Button>
    </Screen>
  );
}

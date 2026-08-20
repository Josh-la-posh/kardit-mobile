import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { defaultImporterOnboardingDraft } from '@/features/onboarding/importerOnboardingStorage';
import {
  getRequiredImporterDocuments,
  importerDocumentTypeMap,
} from '@/features/onboarding/importerOnboardingValidation';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'DocumentSubmission'>;

export function DocumentSubmissionScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        title="Documents"
        subtitle="Upload placeholders for business and representative checks."
      />
      <StepIndicator current={2} total={5} />
      <InfoCard title="Required documents">
        {getRequiredImporterDocuments(defaultImporterOnboardingDraft).map((documentKey) => (
          <ListItem
            key={documentKey}
            title={importerDocumentTypeMap[documentKey]}
            meta="PDF, JPG, or PNG. 10MB maximum."
            detail="Pending"
          />
        ))}
      </InfoCard>
      <EmptyState
        title="No documents yet"
        message="Document picker will be added after backend upload rules are confirmed."
      />
      <Button onPress={() => navigation.navigate('BusinessProfile')}>Continue</Button>
    </Screen>
  );
}

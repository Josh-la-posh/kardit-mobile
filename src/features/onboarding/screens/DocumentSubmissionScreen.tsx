import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { useImporterOnboarding } from '@/features/onboarding/ImporterOnboardingContext';
import {
  getRequiredImporterDocuments,
  importerDocumentTypeMap,
} from '@/features/onboarding/importerOnboardingValidation';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'DocumentSubmission'>;

export function DocumentSubmissionScreen({ navigation }: Props) {
  const { draft, error, loading, saveStep, updateDraft } = useImporterOnboarding();
  const requiredDocuments = getRequiredImporterDocuments(draft);

  const pickDocument = async (documentKey: (typeof requiredDocuments)[number]) => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: ['application/pdf', 'image/jpeg', 'image/png'],
    });
    if (result.canceled) return;
    const file = result.assets[0];
    const sizeMb = (file.size ?? 0) / 1024 / 1024;
    updateDraft({
      documents: {
        ...draft.documents,
        [documentKey]: {
          fileName: file.name,
          mimeType: file.mimeType ?? '',
          sizeMb,
          uri: file.uri,
          uploadProgress: 100,
        },
      },
    });
  };

  return (
    <Screen>
      <AppHeader
        title="Documents"
        subtitle="Upload placeholders for business and representative checks."
      />
      <StepIndicator current={2} total={5} />
      <InfoCard title="Required documents">
        {requiredDocuments.map((documentKey) => (
          <ListItem
            key={documentKey}
            title={importerDocumentTypeMap[documentKey]}
            meta="PDF, JPG, or PNG. 10MB maximum."
            detail={draft.documents[documentKey]?.fileName ?? 'Select file'}
            onPress={() => void pickDocument(documentKey)}
          />
        ))}
      </InfoCard>
      {error ? <ListItem title="Save failed" meta={error} detail="Retry" /> : null}
      <Button
        disabled={loading || requiredDocuments.some((key) => !draft.documents[key])}
        onPress={() => void saveStep(2).then((saved) => saved && navigation.navigate('BusinessProfile'))}
      >
        {loading ? 'Saving...' : 'Save and continue'}
      </Button>
    </Screen>
  );
}

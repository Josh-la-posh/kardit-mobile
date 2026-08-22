import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ListItem } from '@/components/ui/ListItem';
import { Select } from '@/components/ui/Select';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { useImporterOnboarding } from '@/features/onboarding/ImporterOnboardingContext';
import { validateImporterOnboardingStep } from '@/features/onboarding/importerOnboardingValidation';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'BusinessProfile'>;

export function BusinessProfileScreen({ navigation }: Props) {
  const { draft, error, loading, saveStep, updateDraft } = useImporterOnboarding();
  const validation = validateImporterOnboardingStep(draft, 3);

  return (
    <Screen>
      <AppHeader title="Import profile" subtitle="Tell Kardit what your business imports." />
      <StepIndicator current={3} total={5} />
      <Select label="Business sector" value={draft.businessSector} placeholder="Select sector" onPress={() => updateDraft({ businessSector: draft.businessSector || 'Other' })} />
      <Input label="Business sector" value={draft.businessSector} onChangeText={(businessSector) => updateDraft({ businessSector })} />
      <Input label="Business activity" value={draft.businessActivity} onChangeText={(businessActivity) => updateDraft({ businessActivity })} />
      <Input label="Import categories (comma separated)" value={draft.importCategories.join(', ')} onChangeText={(value) => updateDraft({ importCategories: value.split(',').map((item) => item.trim()).filter(Boolean) })} />
      <Input label="Other import category" value={draft.otherImportCategory} onChangeText={(otherImportCategory) => updateDraft({ otherImportCategory })} />
      <Input label="Import frequency" value={draft.importFrequency} onChangeText={(importFrequency) => updateDraft({ importFrequency })} />
      <Input label="Expected import value" value={draft.expectedImportValue} onChangeText={(expectedImportValue) => updateDraft({ expectedImportValue })} />
      <ListItem
        title="Validation"
        meta={`${validation.missing.length} required items remaining`}
        detail="Local"
      />
      {error ? <ListItem title="Save failed" meta={error} detail="Retry" /> : null}
      <Button
        disabled={loading || !validation.valid}
        onPress={() => void saveStep(3).then((saved) => saved && navigation.navigate('ReviewDeclaration'))}
      >
        {loading ? 'Saving...' : 'Save and continue'}
      </Button>
    </Screen>
  );
}

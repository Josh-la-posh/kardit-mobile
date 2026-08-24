import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ListItem } from '@/components/ui/ListItem';
import { StepIndicator } from '@/components/ui/StepIndicator';
import { useImporterOnboarding } from '@/features/onboarding/ImporterOnboardingContext';
import { validateImporterOnboardingStep } from '@/features/onboarding/importerOnboardingValidation';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'BusinessProfile'>;

export function BusinessProfileScreen({ navigation }: Props) {
  const {
    draft,
    error,
    loading,
    options,
    optionsError,
    optionsLoading,
    saveStep,
    updateDraft,
  } = useImporterOnboarding();
  const validation = validateImporterOnboardingStep(draft, 3);
  const optionsUnavailable = !optionsLoading && !options;

  return (
    <Screen>
      <AppHeader title="Import profile" subtitle="Tell Kardit what your business imports." />
      <StepIndicator current={3} total={5} />
      {optionsUnavailable ? (
        <ListItem title="Options unavailable" meta={optionsError} detail="Retry later" />
      ) : null}
      <ListItem title="Business sector" detail={draft.businessSector || 'Required'} />
      {options?.businessSectors?.map((businessSector) => (
        <ListItem
          key={businessSector}
          title={businessSector}
          detail={draft.businessSector === businessSector ? 'Selected' : 'Select'}
          onPress={() => updateDraft({ businessSector })}
        />
      ))}
      <ListItem title="Business activity" detail={draft.businessActivity || 'Required'} />
      {options?.activities?.map((businessActivity) => (
        <ListItem
          key={businessActivity}
          title={businessActivity}
          detail={draft.businessActivity === businessActivity ? 'Selected' : 'Select'}
          onPress={() => updateDraft({ businessActivity })}
        />
      ))}
      <ListItem
        title="Import categories"
        detail={draft.importCategories.length ? draft.importCategories.join(', ') : 'Required'}
      />
      {options?.categories?.map((category) => (
        <ListItem
          key={category}
          title={category}
          detail={draft.importCategories.includes(category) ? 'Selected' : 'Select'}
          onPress={() => {
            const selected = draft.importCategories.includes(category)
              ? draft.importCategories.filter((item) => item !== category)
              : [...draft.importCategories, category];
            updateDraft({ importCategories: selected });
          }}
        />
      ))}
      <Input label="Other import category" value={draft.otherImportCategory} onChangeText={(otherImportCategory) => updateDraft({ otherImportCategory })} />
      <ListItem title="Import frequency" detail={draft.importFrequency || 'Required'} />
      {options?.frequencies?.map((importFrequency) => (
        <ListItem
          key={importFrequency}
          title={importFrequency}
          detail={draft.importFrequency === importFrequency ? 'Selected' : 'Select'}
          onPress={() => updateDraft({ importFrequency })}
        />
      ))}
      <ListItem title="Expected import value" detail={draft.expectedImportValue || 'Required'} />
      {options?.expectedValues?.map((expectedImportValue) => (
        <ListItem
          key={expectedImportValue}
          title={expectedImportValue}
          detail={draft.expectedImportValue === expectedImportValue ? 'Selected' : 'Select'}
          onPress={() => updateDraft({ expectedImportValue })}
        />
      ))}
      <ListItem
        title="Validation"
        meta={`${validation.missing.length} required items remaining`}
        detail={validation.valid ? 'Ready' : 'Required'}
      />
      {error ? <ListItem title="Save failed" meta={error} detail="Retry" /> : null}
      <Button
        disabled={loading || optionsLoading || optionsUnavailable || !validation.valid}
        onPress={() => void saveStep(3).then((saved) => saved && navigation.navigate('ReviewDeclaration'))}
      >
        {loading ? 'Saving...' : 'Save and continue'}
      </Button>
    </Screen>
  );
}

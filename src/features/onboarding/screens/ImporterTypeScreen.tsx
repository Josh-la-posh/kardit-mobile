import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '@/components/layout/Screen';
import { AppHeader } from '@/components/ui/AppHeader';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/InfoCard';
import { ListItem } from '@/components/ui/ListItem';
import { Select } from '@/components/ui/Select';
import type { OnboardingStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ImporterType'>;

export function ImporterTypeScreen({ navigation }: Props) {
  return (
    <Screen>
      <AppHeader
        eyebrow="Onboarding demo"
        title="Importer setup"
        subtitle="Capture demo profile inputs, document placeholders, and declaration flow before backend onboarding APIs are confirmed."
      />
      <InfoCard title="Applicant type">
        <ListItem
          title="Rule pending"
          meta="Backend/product must confirm whether importer type changes required documents."
          detail="Demo"
        />
      </InfoCard>
      <Select label="Importer type" placeholder="Select importer type" />
      <Button onPress={() => navigation.navigate('ApplicantInformation')}>Continue</Button>
    </Screen>
  );
}

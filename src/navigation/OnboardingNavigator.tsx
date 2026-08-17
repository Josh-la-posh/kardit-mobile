import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AdditionalInformationRequiredScreen } from '@/features/onboarding/screens/AdditionalInformationRequiredScreen';
import { ApplicantInformationScreen } from '@/features/onboarding/screens/ApplicantInformationScreen';
import { ApplicationStatusScreen } from '@/features/onboarding/screens/ApplicationStatusScreen';
import { BusinessProfileScreen } from '@/features/onboarding/screens/BusinessProfileScreen';
import { DocumentSubmissionScreen } from '@/features/onboarding/screens/DocumentSubmissionScreen';
import { ImporterTypeScreen } from '@/features/onboarding/screens/ImporterTypeScreen';
import { ReviewDeclarationScreen } from '@/features/onboarding/screens/ReviewDeclarationScreen';

import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ImporterType"
        component={ImporterTypeScreen}
        options={{ title: 'Importer Type' }}
      />
      <Stack.Screen
        name="ApplicantInformation"
        component={ApplicantInformationScreen}
        options={{ title: 'Applicant Information' }}
      />
      <Stack.Screen
        name="DocumentSubmission"
        component={DocumentSubmissionScreen}
        options={{ title: 'Documents' }}
      />
      <Stack.Screen
        name="BusinessProfile"
        component={BusinessProfileScreen}
        options={{ title: 'Business Profile' }}
      />
      <Stack.Screen
        name="ReviewDeclaration"
        component={ReviewDeclarationScreen}
        options={{ title: 'Review' }}
      />
      <Stack.Screen
        name="ApplicationStatus"
        component={ApplicationStatusScreen}
        options={{ title: 'Application Status' }}
      />
      <Stack.Screen
        name="AdditionalInformationRequired"
        component={AdditionalInformationRequiredScreen}
        options={{ title: 'Additional Information' }}
      />
    </Stack.Navigator>
  );
}

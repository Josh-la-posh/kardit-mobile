import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type OnboardingStackParamList = {
  ImporterType: undefined;
  ApplicantInformation: undefined;
  DocumentSubmission: undefined;
  BusinessProfile: undefined;
  ReviewDeclaration: undefined;
  ApplicationStatus: undefined;
};

export type CardsStackParamList = {
  CardsList: undefined;
  CardDetails: { cardId: string };
  CreateCard: undefined;
  FundCard: { cardId?: string };
};

export type MainTabParamList = {
  Dashboard: undefined;
  Cards: NavigatorScreenParams<CardsStackParamList>;
  Transactions: undefined;
  Profile: undefined;
  Support: undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

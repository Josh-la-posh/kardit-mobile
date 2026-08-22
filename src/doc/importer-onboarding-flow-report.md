# Importer Onboarding Flow Report

## Purpose

This document describes the current importer onboarding experience from entry to final compliance decision. It is intended for the mobile developer implementing the same flow and API behavior.

Primary web entry points:

- `/onboarding`: stakeholder selection screen.
- `/importer/onboarding`: importer application wizard.
- `/super-admin/importer-applications`: service-provider review queue.
- `/super-admin/importer-applications/:applicationId`: service-provider application review.

Relevant implementation files:

- [StakeholderSelectionPage.tsx](../pages/onboarding/StakeholderSelectionPage.tsx)
- [ImporterOnboardingPage.tsx](../pages/importer-onboarding/ImporterOnboardingPage.tsx)
- [ImporterOnboardingLayout.tsx](../pages/importer-onboarding/ImporterOnboardingLayout.tsx)
- [importerOnboardingApi.ts](../services/importerOnboardingApi.ts)
- [validation.ts](../pages/importer-onboarding/validation.ts)
- [ImporterApplicationDetailPage.tsx](../pages/super-admin/importers/ImporterApplicationDetailPage.tsx)

## 1. Entry And Routing

### 1.1 Stakeholder selection

The user opens `/onboarding` and selects one of two registration types:

- **Importer**: creates and manages cards for their own business.
- **Affiliate**: follows the separate affiliate onboarding flow.

The selected stakeholder type is stored in local storage under `kardit.onboarding.stakeholderType.v1`.

Selecting **Importer** and pressing the main **Continue** button:

1. Sets the stakeholder type to `importer`.
2. Clears any stored importer draft and stored application ID.
3. Clears the explicit resume marker.
4. Navigates to `/importer/onboarding`.

The route is protected by `OnboardingEntryGate`. A user without a valid stakeholder selection is redirected to `/onboarding`. A user with the wrong stakeholder type is redirected to the matching onboarding route.

### 1.2 Importer card actions

The Importer card on `/onboarding` contains these actions:

- **Continue Application**
- **Track Application**

Both actions open an application lookup dialog. The user enters an **Application ID**, not the application reference number.

#### Continue Application

1. Validate that the ID is not empty.
2. Call `GET /importers/onboarding/applications/{applicationId}`.
3. Map the returned application into the local draft.
4. Store the draft, application ID, and explicit resume marker.
5. Navigate to the server-provided resume route when valid, otherwise use `/importer/onboarding?step={currentStep}`.
6. The resume route should return the user to the server-reported current step.

#### Track Application

1. Validate that the ID is not empty.
2. Call `GET /importers/onboarding/applications/{applicationId}`.
3. Store the returned application locally.
4. Navigate directly to `/importer/onboarding?step=5`.
5. Display the status screen without opening editable steps.

Lookup failure should show an error and preserve the dialog so the user can retry. The application ID input should support the full ID string and should not be replaced by the reference number.

## 2. Wizard Structure

The importer wizard contains five steps:

1. **Personal & Organisation** - business and applicant details.
2. **Document Submission** - required evidence upload.
3. **Business & Import Profile** - business activity and import details.
4. **Review & Declaration** - review all data and consent.
5. **Application Status** - submitted application tracking.

The header displays the current step, total steps, percentage progress, and step metadata. Completed steps are marked complete. Future steps are reachable only when all prior steps are complete. The status step is not directly editable from the stepper.

The web layout provides:

- **Previous** button on steps 1-4.
- **Save and Continue** on steps 1-3.
- **Submit Application** on step 4.
- **Save Updates** when responding to a compliance information request.
- Loading states while requests are in progress.
- Inline field errors and a review-level list of missing items.

Mobile should preserve the same sequencing and rules, but can use a one-step-per-screen layout with a persistent progress indicator.

## 3. Step 1: Personal And Organisation Information

### Organisation fields

All fields marked required must be completed before continuing:

| Field | Input | Rules / notes |
|---|---|---|
| Business Type | Selection | `LLC` or `Registered Business` in the current web fallback options. The API may provide options. |
| CAC / RC / BN Number | Text | Required. Sent as `organization.cacRcBnNumber`. |
| Tax ID | Text | Required. Sent as `organization.taxId`. |
| Legal Business Name | Text | Required. Selecting a business type currently fills a demo/default legal name; mobile should confirm whether this autofill is intended for production. |
| Business Status | Dropdown | Current web options are `active` and `inactive`, displayed as `Active` and `Inactive`. Required. Sent as `organization.businessStatus`. Confirm the backend enum before mobile implementation. |
| Business Phone Number | Phone | Required; must pass the shared valid-phone rule. Sent as `profile.businessPhone`. |
| Business Email | Email | Required; must be valid. Sent as `organization.businessEmail`. |
| Address Line 1 | Text | Required. Sent as `profile.addressLine1`. |
| Address Line 2 | Text | Optional. Sent as `profile.addressLine2`. |
| Country | Searchable select | Required. Options come from `GET /countries/with-states` through the location service. Selecting a country clears state and city. |
| State | Searchable select | Required. Disabled until a country is selected. Selecting a state clears city. |
| City / LGA | Searchable select | Required. Disabled until a state is selected. |

### Applicant fields

| Field | Input | Rules / notes |
|---|---|---|
| Full Name | Text | Required. Sent as `applicant.fullName`. |
| Role | Select | Required. API options are preferred; fallback is Director, Owner, Employee, Authorised Agent. Sent as `applicant.role`. |
| NIN | Numeric text | Required; digits only and exactly 11 digits. Sent as `applicant.nin`. |
| Phone Number | Phone | Required; must pass valid-phone rule. Sent as `applicant.phone`. |
| Email Address | Email | Required; must be valid. Sent as `applicant.email`. |

Selecting Employee or Authorised/Authorized Agent makes **Authority to Act** required in the document step. Changing to a role that does not require authority removes that document from the local draft and selected-file queue.

On **Save and Continue**, the application is created if no application ID exists. The returned application ID is stored locally. If an application already exists, the current draft is sent as an update instead.

## 4. Step 2: Document Submission

Required baseline documents:

1. **CAC Certificate** - certificate of incorporation or business registration.
2. **Government Issued ID** - passport, national ID, driver license, or voter card.
3. **Proof of Business Address** - utility bill, lease, or official address confirmation.

Conditional document:

4. **Authority to Act** - required for Employee and Authorised/Authorized Agent roles.

Upload constraints:

- Accepted formats: PDF, JPG, PNG.
- Maximum size: 10 MB per file.
- Each required upload must reach 100% progress before the step is complete.
- Users can replace or remove a file before saving.
- Existing server documents display as already uploaded and include verification/scan status when supplied.

Mobile should use the platform file picker/camera/document picker as appropriate, but send the same document type values:

| UI document | API `documentTypes` value |
|---|---|
| CAC Certificate | `CAC_CERTIFICATE` |
| Government Issued ID | `APPLICANT_GOVERNMENT_ID` |
| Proof of Business Address | `BUSINESS_ADDRESS_PROOF` |
| Authority to Act | `AUTHORITY_TO_ACT` |

On **Save and Continue**, files are sent as multipart form data to the application update endpoint. The selected files are cleared after a successful update, and the local document records are marked server-uploaded.

## 5. Step 3: Business And Import Profile

| Field | Input | Rules / notes |
|---|---|---|
| Business Sector | Select | Required. API options preferred; fallback includes Fashion, Manufacturing, Retail, Healthcare, Agriculture, Construction, Other. |
| Business Activity | Select | Required. API options preferred; fallback includes Fashion, Wholesale trading, Retail distribution, Manufacturing, Import and resale, Other. |
| Import Categories | Multi-select/search | Required; at least one category. Current fallback includes Agricultural Products, Food & Beverages, Pharmaceuticals & Medical Supplies, Chemicals, Electronics, Machinery, Automotive, Textiles, Construction Materials, Cosmetics, Household Goods, Other. |
| Other Import Category | Text | Required only when Other is selected. |
| Import Frequency | Select | Required. One-off, Monthly, Quarterly, Bi-annually, Annually in fallback options. |
| Expected Import Value | Select | Required. Fallback values are 500000, 1000000, 2000000, 5000000, and 10000000+. |

The options are loaded from `GET /importers/onboarding/options`. If the request fails, the web client displays a warning and uses fallback values. Mobile should provide the same fallback behavior or an equivalent recoverable state.

The profile is sent through the application update endpoint using:

- `profile.sector`
- `profile.activity`
- repeated `profile.categories`
- `profile.otherCategory`
- `profile.frequency`
- `profile.expectedValue`

## 6. Step 4: Review And Declaration

The review screen shows:

- Applicant information.
- Organisation information.
- Business and import profile.
- Uploaded documents.
- A declaration checkbox.

Each section has an edit action that returns to the relevant step.

The declaration text is:

> I declare that the information provided is true, accurate, and submitted by an authorised representative of this business.

The declaration is required. Submission is disabled until all personal, document, profile, and declaration validations pass.

On **Submit Application**:

1. Ensure an application exists, creating it if necessary.
2. Call `POST /importers/onboarding/applications/{applicationId}/submit`.
3. Send JSON `{ declarationAccepted: true, consentAccepted: true }` when checked.
4. Store the returned status, submitted timestamp, reference number, reasons, and requested items.
5. Navigate to the status step.

## 7. Step 5: Application Status

The status screen loads the latest application using:

`GET /importers/onboarding/applications/{applicationId}`

It displays:

- Application ID.
- Reference number where available in the stored application data.
- Submitted date for submitted applications.
- Current status.
- Draft current step and progress when the application is still a draft.
- Rejection reason when rejected.
- Compliance review reason and requested items when additional information is required.

The user can manually refresh status with **Refetch Application Status**.

### Status behavior

- **DRAFT**: show **Complete Your Draft** and allow the user to resume from the server-reported step.
- **SUBMITTED / UNDER_REVIEW**: show that Compliance is reviewing the application and documents; allow status refresh.
- **ADDITIONAL_INFORMATION_REQUIRED**: show the review reason and requested items; show **Update Information**.
- **APPROVED**: show the successful terminal status; allow return to dashboard or start a new application.
- **REJECTED**: show the rejection reason; allow return to dashboard or start a new application.

## 8. Additional Information Loop

When Compliance requests more information, the user selects **Update Information**.

The web flow:

1. Re-fetches the application.
2. Merges the server application data and documents into the local draft.
3. Shows the compliance feedback panel on Personal, Documents, Profile, and Review steps.
4. Sets the mode to update and returns to Personal & Organisation.
5. Allows the user to edit fields and replace/add requested documents.
6. Requires a non-empty **Message to Compliance** on the Review step.
7. Uses **Save Updates** instead of Submit Application.
8. Synchronizes the application with `PUT /importers/onboarding/applications/{applicationId}`.
9. Calls `POST /importers/onboarding/applications/{applicationId}/additional-information` with multipart form data containing `notes`, `message`, and any replacement documents.
10. Re-fetches the latest application and returns to the status step.

The compliance request contains a message/reason and an optional list of requested document type values. Mobile should show both the human-readable request and the requested items, and should not force the user to upload documents that were not requested unless they choose to update them.

## 9. Persistence And Resume Rules

The web client persists the draft in local storage under:

- `kardit.importerOnboarding.draft.v1`
- `kardit.importerOnboarding.applicationId.v1`
- `kardit.importerOnboarding.explicitResume.v1`

The local draft is saved after every state change. On explicit resume, server-uploaded documents are retained while transient local file entries are filtered out.

The server response may provide:

- `progress.currentStep`: numeric step, 1 through 5.
- `progress.currentStepKey`: semantic step key.
- `progress.route`: preferred resume route.
- `progress.canSubmit`: whether the server considers the application ready.
- `progress.startedAt`: draft start timestamp.

Mobile should prefer the server progress response over a locally guessed step. If no route is supplied, use the numeric step mapping:

| Step | Route query |
|---|---|
| 1 | `/importer/onboarding?step=1` |
| 2 | `/importer/onboarding?step=2` |
| 3 | `/importer/onboarding?step=3` |
| 4 | `/importer/onboarding?step=4` |
| 5 | `/importer/onboarding?step=5` |

Starting a new application must clear the old draft, stored application ID, explicit resume marker, selected files, and additional-information state.

## 10. API Contract Summary

All requests use the configured API base URL and include:

- `X-Correlation-ID`: a new UUID per request.
- `X-Tenant-Id`: configured tenant ID, defaulting to `public`.

Applicant-facing endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/importers/onboarding/options` | Load selectable onboarding options. |
| POST | `/importers/onboarding/applications` | Create an application with initial personal/organisation fields. |
| GET | `/importers/onboarding/applications/{id}` | Load application, status, progress, and documents. |
| GET | `/importers/onboarding/applications/{id}/overview` | Load compact application overview. |
| PUT | `/importers/onboarding/applications/{id}` | Save fields and optional document uploads. |
| POST | `/importers/onboarding/applications/{id}/submit` | Submit the declaration and application. |
| POST | `/importers/onboarding/applications/{id}/additional-information` | Submit a response to a compliance request. |

The update and additional-information endpoints use multipart form data. Do not manually set the multipart `Content-Type` boundary on mobile.

Service-provider endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/admin/importers/applications` | Paginated review queue with status filtering. |
| GET | `/admin/importers/applications/{id}` | Full application details and documents. |
| POST | `/admin/importers/applications/{id}/review` | Move/open a submitted application for review. |
| POST | `/admin/importers/applications/{id}/approve` | Approve with notes. |
| POST | `/admin/importers/applications/{id}/reject` | Reject with required reason and notes. |
| POST | `/admin/importers/applications/{id}/request-information` | Ask for clarification/documents. |
| GET | `/admin/importers/applications/{id}/documents/{documentId}/file` | Download an uploaded document. |

## 11. Mobile Acceptance Criteria

- The importer card on the onboarding route visibly includes **Continue Application** and **Track Application**.
- Continue requires an application ID, loads the application, and resumes at the server-provided step.
- Track requires an application ID and opens the status screen directly.
- A new importer application starts with no stale draft or application ID.
- The five steps appear in the same order and enforce the same completion gates.
- Required and conditional document rules match the role selected by the applicant.
- Upload validation rejects unsupported formats and files larger than 10 MB.
- Review cannot submit until all required data, documents, and declaration consent are complete.
- The application ID is retained after creation and used for all later calls.
- Submission displays the server status and allows refresh.
- Additional-information requests show the compliance reason and requested items.
- An additional-information response requires a message and supports replacement document uploads.
- Approved and rejected applications are treated as terminal states with a start-new-application option.
- Network errors are recoverable and do not erase local draft data.
- Loading, empty, validation, upload, API error, and offline/retry states are explicit on every screen.

## 12. Items To Confirm With Backend/Product

1. Confirm the canonical `businessStatus` values. The current web UI sends `active` or `inactive`; an earlier requirement referenced boolean `true`/`false`. Mobile must use the backend contract, not display labels alone.
2. Confirm whether the server expects `profile.businessPhone` or `organization.businessPhone`; the current web payload uses `profile.businessPhone`.
3. Confirm whether an application reference number can be used for lookup. The current UI explicitly requires the application ID.
4. Confirm whether `progress.route` can contain a mobile route. The current route is a web path and mobile should map the step semantics rather than depend on the web URL.
5. Confirm status values are stable uppercase enums, especially `ADDITIONAL_INFORMATION_REQUIRED`.
6. Confirm document upload retry and virus-scan status behavior, including whether a document can be submitted while scan status is pending.
7. Confirm authentication/session requirements for applicant-facing endpoints and whether the public tenant fallback is valid for mobile.

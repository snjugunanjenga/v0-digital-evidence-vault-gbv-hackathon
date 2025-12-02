# User Settings and Data Export

This document provides an overview of the user settings and data export features in the Digital Evidence Vault.

## User Settings

The user settings page is located at `/dashboard/settings`. It is divided into three tabs:

*   **Profile & Security**: This tab uses Clerk's `<UserProfile />` component to allow users to manage their profile information, change their password, and enable two-factor authentication.
*   **Notifications**: This tab allows users to manage their notification preferences. The settings are saved when the user clicks the "Save Preferences" button.
*   **Data**: This tab allows users to export their data and manage their account.

## Data Export

The data export feature allows users to download a JSON file containing all of their cases and evidence. This can be useful for backing up data or for sharing it with a lawyer or other trusted third party.

To export your data, go to the "Data" tab in the settings page and click the "Export All Data" button. A file named `evidence-export.json` will be downloaded to your computer.

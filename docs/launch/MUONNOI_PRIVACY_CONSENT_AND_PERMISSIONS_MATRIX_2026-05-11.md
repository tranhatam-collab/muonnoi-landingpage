# Muonnoi Privacy Consent And Permissions Matrix

Date: 2026-05-11
Scope: iOS + Android permissions and consent.

## Permission policy

Request permissions only when user action requires it.

Never request camera, photo, location or notification permission during cold start unless user has chosen a feature that needs it.

## Permission matrix

Camera:
- Use: capture proof photo/video.
- Prompt moment: when user taps capture proof.
- Fallback: choose existing photo or text proof if quest allows.

Photos:
- Use: attach proof media.
- Prompt moment: when user taps attach photo.
- Fallback: camera or text proof.

Location:
- Use: optional GPS/geotag proof for location-based quests.
- Prompt moment: when quest explicitly requires location proof.
- Fallback: host validation or manual proof if quest allows.

Notifications:
- Use: proof review, validation request, security alert, user-requested reminder.
- Prompt moment: after user joins a quest or enables reminders.
- Fallback: in-app inbox.

Biometric:
- Use: optional account unlock/security.
- Prompt moment: user enables it in settings.
- Fallback: device passcode/session.

## Consent rules

- Consent text must say what is collected and why.
- Consent cannot imply reward loss unless technically true and documented.
- User must be able to continue with reduced capability where possible.
- Privacy settings must show current permission state.

## Data minimization

Store only:
- proof payload needed for validation
- timestamps
- review state
- minimal device/push metadata

Do not store:
- unrelated gallery data
- continuous location
- contact list
- ad identifiers


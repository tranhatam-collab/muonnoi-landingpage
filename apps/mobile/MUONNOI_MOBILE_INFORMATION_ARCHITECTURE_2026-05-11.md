# Muonnoi Mobile Information Architecture

Date: 2026-05-11
Scope: iOS + Android Life Quest OS.

## Product shape

Muonnoi mobile is organized around real-life action, proof, trust and community.

Primary navigation:
- Today
- Quests
- Proof
- Community
- Profile

## Navigation model

Tab bar:
- Today: current mission, next action, urgent validation.
- Quests: discover, join and filter quests.
- Proof: submitted proof, receipts, validation state.
- Community: host, family, local and peer activity.
- Profile: identity, trust, settings and privacy.

Stack navigation:
- Onboarding stack
- Auth stack
- Main tab stack
- Quest detail stack
- Proof submission stack
- Host validation stack
- Settings/privacy stack
- Support/complaint stack

Modal surfaces:
- Permission rationale
- Camera/photo picker
- Location consent
- Proof rejection reason
- Offline draft recovery
- Report abuse

## Core modules

Dulich:
- quest discovery
- place detail
- host detail
- proof submission
- receipt

Hoctap:
- lesson quest
- reflection proof
- streak without addiction pressure
- skill receipt

Family:
- family group
- shared quest
- parent/guardian note
- safety and consent copy

## Data ownership by screen

Today:
- user session
- active quests
- notification inbox summary

Quests:
- quest catalog
- module filters
- eligibility

Proof:
- proof draft
- upload status
- review status
- receipt

Community:
- host status
- validation requests
- trusted peer signals

Profile:
- profile
- trust score
- permissions
- privacy controls

## Non-negotiable IA rules

- No infinite feed.
- No reward screen that implies financial gain.
- No hidden permission request.
- No quest completion without proof state.
- No trust score without explainable source.


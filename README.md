# Instagram-campaign-public — dormant iframe experiment

**Current decision (7 November 2026): bookmarklet only. No website hosting.**

The Bookstagram/Reading Room interface is a **JavaScript bookmarklet** that opens an overlay directly on Instagram. Source code and tests stay on GitHub, but **GitHub Pages is not being used**.

The folders `docs/`, `bookmarklet/`, and `tests/` contain an earlier **synthetic-only iframe feasibility experiment**. They remain as reference code, **not a deployed application**. Do not enable GitHub Pages or install the iframe bookmarklet from this repository.

## Active prototype

Use the working bookmarklet maintained in the private [Instagram-campaign repository](https://github.com/thatgirlfeels-1/Instagram-campaign/tree/poc/milestone-0-stage-b/milestone-0/bookmarklet). Its JavaScript runs as an overlay on Instagram and supports invented test notes only.

## Security boundary

A bookmarklet executes in Instagram's page context; its local storage and any GitHub token would not be isolated from Instagram's scripts. **Do not enter real reading notes, GitHub access tokens, or other private information.** Automatic synchronisation of private GitHub records remains an unsolved requirement for this bookmarklet-only design. A hosted iframe cannot satisfy the stated no-hosting constraint, and we will not silently introduce one.

This public repository contains no private Bookstagram records, no credentials, and no deployable production service.

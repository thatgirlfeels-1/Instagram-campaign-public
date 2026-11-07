# Instagram campaign — Public iframe test

**Purpose:** This public repository contains only the synthetic-data, no-credential iframe compatibility test used by the Bookstagram bookmarklet. The private project and future private records remain in the separate **private** [Instagram-campaign repository](https://github.com/thatgirlfeels-1/Instagram-campaign).

## How to enable the free GitHub Pages test

1. Open [this repository's Pages settings](https://github.com/thatgirlfeels-1/Instagram-campaign-public/settings/pages).
2. Under **Build and deployment** choose **Deploy from a branch**.
3. Select **main** and **/docs**, then click **Save**.
4. Once GitHub shows the site as published, open [the iframe test page](https://thatgirlfeels-1.github.io/Instagram-campaign-public/) directly. It should show **Reading Room — Secure-frame compatibility test**.
5. Enter invented text only; test **Save invented note**, refresh, then **Reload saved note**.

## Test inside Instagram (no downloads)

1. Open [bookmarklet/bookmarklet.txt](./bookmarklet/bookmarklet.txt) and copy the complete single line beginning with `javascript:`.
2. Create a **new** browser bookmark named **Reading Room iframe test**. Paste the copied line into the bookmark's **URL** field. Do not replace the existing working bookmarklet.
3. Open Instagram in the browser and click the new bookmark.
4. If a framed Reading Room panel loads, look for the message **Frame loaded; cross-origin handshake + storage succeeded**. If it is blocked or shows no reply, report exactly what you see.
5. Type only **invented test text**, save, close the panel, click the bookmark again, and confirm the invented text reloads.

### Security and scope

- **This is NOT the final app.** The test page is deliberately public and contains no credentials, private data or connection to your GitHub data repository.
- Instagram might block external iframes; browser storage restrictions may interfere. Neither behaviour has been verified on your computer or phone.
- **Do not enter GitHub tokens, Instagram passwords, personal book notes, or any genuine account content**.
- The public `docs/` folder is the Pages publishing source; the `bookmarklet/` folder contains the bookmarklet, and `tests/` contains source checks.
- GitHub Pages is the invisible component *inside* the Instagram bookmarklet overlay. You do not have to visit the website during normal use if the iframe works.

## Rollback

To stop, remove the new test bookmark, then choose **Settings → Pages → Source: None** (if offered) to unpublish. The original Instagram bookmarklet and the private repository are unaffected. Clearing the Pages origin's site storage removes invented local test notes.

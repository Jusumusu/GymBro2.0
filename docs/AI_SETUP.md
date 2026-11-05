# Connect conversational AI

If Coach says **AI is not connected** or **Offline training tools**, its replies come from local rules and recorded facts. Offline tools can review a routine or a lift, but they are not a live language model.

GitHub Pages hosts the static app. A separate backend runs the AI connection and protects your provider key. The compatible Node backend is included in this repository; no provider account or hosted backend has been provisioned.

## What you need

1. An OpenAI API account or another compatible provider, with an API key and supported model. A ChatGPT subscription does not automatically supply API access or credits.
2. A backend host that can run the included Node server behind HTTPS.
3. A separate private access token for your backend. This is not the provider API key.

Set the provider key, model, base URL, access token and allowed app origin on the server using its secret manager. Never paste the provider key into the app, GitHub source, or chat. Follow the exact [backend configuration](https://github.com/Jusumusu/GymBro2.0/blob/improvements/server/README.md).

In Gym Bro, open **Coach → Connect AI** (or **AI connection, style & privacy**), enter the backend `/coach` URL and its separate access token, and enable training-context consent. Body weight and readiness have their own opt-ins. Save, then select **Cloud AI** below the question. No request is sent merely by saving the settings.

The access token stays in the current tab and must be entered again after a reload. The chat keeps your chosen mode and exercise across replies. A connection error is shown and your question remains available to retry; it does not quietly return an offline answer labeled as AI.

## What is sent

Your question, up to six bounded prior turns, selected training facts and optional explicit preferences. No photos, raw saved workout notes, complete database or provider key is sent by the app. Delete local conversation/memory using Coach controls; requests already sent remain subject to the provider’s retention policy.

## Check it is working

Choose Cloud AI and send a question. A successful assistant reply is labeled **AI COACH · CLOUD INTERPRETATION**. Missing or invalid credentials show an error. Locally generated replies are labeled **OFFLINE ANALYSIS · RULES BASED**. Medical guidance may use the local guard, even with cloud mode selected.

The connection and response contracts have automated stub-provider tests. A real provider still needs to be configured and evaluated before judging live response quality.

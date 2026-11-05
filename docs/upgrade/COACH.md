# Coaching architecture, privacy and evaluation

## Facts before language

The journal and optional preferences feed pure analytics (`engine.js`, `analytics.js`, `training-tools.js`). `buildCoachContext` creates bounded facts with IDs: goal/equipment, current and previous weekly activity, recent exercise exposures, comparable rep trends, deterministic progression, muscle distribution, goal progress, available exercise names/IDs, explicit preferences and recent decision/conversation context. Missing RIR, duration, baseline and readiness remain missing; estimates have labels.

Local coaching is deterministic analysis with templates, visibly labeled LOCAL COACH. Cloud coaching sends a sanitized contract to the configured personal backend, which calls a compatible chat-completions provider. Cloud output is interpretation, not authoritative journal data. Fact IDs are validated, but this cannot prove every natural-language numerical assertion is true; live-model factual evaluation remains necessary.

The client validates a proposed action against the current journal, produces an editable preview, then requires approval and validates again before the queued write. A changed journal invalidates the proposal. Rejecting saves only a decision receipt. Cloud prose cannot execute JavaScript, set arbitrary loads, delete workouts or write storage directly.

Whitelisted actions: add 1–2 sets to an identified draft movement; replace an uncompleted exercise; generate bounded new programs; shorten uncompleted work while preserving completed work; create a variant for a named scheduled session; clear optional memory. Completed sessions and original routines are not silently rewritten. No prescription baseline is borrowed across substitutions. Plan proposals include rationale, rests, strategies and suggested weekdays and can be edited before approval.

## Data boundaries

Cloud use is off by default. Each request requires the user's configured endpoint, current-session backend token, consent and selection of cloud mode. Provider API keys live only on the backend. The private backend token is not persisted in IndexedDB/localStorage or JSON backups and is lost on reload. Consent settings and conversation text are in the local backup; protect that file.

Only selected facts and the user's question go outbound. Recent bounded conversation is included for follow-ups. No photos, raw saved workout/exercise notes, complete database or provider key is transmitted. Body-weight/goals and subjective readiness need separate opt-ins. Explicit memory is optional and editable/deletable; inferred entries are not sent and memory never substitutes for actual training evidence. User-supplied names/preferences/questions remain untrusted text. Recognized injury/pain questions receive cautious local guidance; keyword detection is not a medical safety guarantee.

The backend stores no workout database and logs no request bodies. Provider retention is governed by the selected provider/account; `store:false` requests supported no-storage behavior but is not a universal retention guarantee. Removing local messages/memory cannot retract a request already sent to a provider. Do not treat local deletion as provider data deletion.

## Evaluation actually performed

Synthetic tests cover: no history, matched-load rep increases beyond ten reps, plateau vs one bad day, repeated target misses, conservative increments, missing effort, future records, irrelevant/adversarial notes, body/readiness consent gates, sparse readiness, inferred memory excluded, deletion/rejection isolation, schedule variant preservation, unsupported code/unsafe load commands, inappropriate 500kg progression, empty/corrupt history, large context bounds, real known fact IDs and consistent facts across five tones.

Browser checks exercise weekly/exercise questions, editable proposals, explicit approval/rejection, memory deletion, privacy controls and token omission from stored state and backup. HTTP tests use a **stub provider**, covering auth, exact origins, payload sanitization, missing provider configuration, invalid/oversized requests and rate limits. They do not evaluate a live LLM.

Before enabling a provider broadly, run the same scenario matrix against real responses and review factual accuracy, conservative advice, unsupported requests, prompt injection, proposed actions, refusal quality and latency. No actual provider was configured here. Local analysis works offline and remains selectable if a cloud request fails; errors are shown rather than silently replacing a failed cloud response with a fabricated one.

## 0.2.1 response-quality fix

The reported question, “Should I change my routine?”, previously fell through to a generic weekly answer. A specific routine tool now selects the named/active/latest-matching saved program, uses the last 28 days of actual records, compares matching-load reps or load increases without losing reps, identifies repeated below-target sets/equipment conflicts, and asks the reason for changing. Limited data stays limited; no replacement plan or mutation is generated by a review question. Unsupported offline questions state the tool's limits rather than reciting unrelated stats. Rep/rest/technique questions use their own handlers; a rest question cannot accidentally shorten a workout.

The cloud selector previously reset to local after renders. Mode, selected exercise and question now survive renders in tab memory. Connection status distinguishes missing endpoint, consent and session token. Errors retain the question and selected mode; no synthetic local reply is shown as cloud success. A pending-request guard prevents concurrent asks.

Cloud context now includes up to six validated prior user/assistant turns (800 characters each), plus bounded saved-program and deterministic routine-review facts. The backend system prompt asks for a direct answer to the actual question, relevant evidence and one needed clarification. Invalid history roles/extra fields are rejected or stripped. Real provider response quality still requires credentials and evaluation; passing stub tests establishes transport/contracts, not model intelligence.

New tests reproduce the routine question, sparse evidence, specifically named programs, repeated misses, equipment conflicts, load progress, question-specific replies, follow-ups, mode/selector/question retention and cloud failures. Browser cloud tests explicitly use stub transport. The app links to [AI setup](../AI_SETUP.md).

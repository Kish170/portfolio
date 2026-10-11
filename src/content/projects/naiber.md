---
title: nAIber
tagline: AI voice companion that phones elderly people and remembers their conversations.
status: shipped
order: 1
problem: Loneliness in older adults is common, and scripted check-in calls feel robotic. nAIber holds real, open-ended phone conversations that build on what someone said last time.
results:
  - About 800 ms voice response latency over a live phone call.
  - Conversations adapt to earlier turns and past calls via an event-sourced dialogue engine.
  - Relationship-aware recall from a combined vector and graph memory.
stack: [TypeScript, Node.js, WebSockets, Twilio, ElevenLabs, Redis, LangGraph, Neo4j, Qdrant]
diagram:
  nodes:
    - { id: phone, label: Phone call, role: "The person's ordinary phone. No app or device to set up.", col: 0 }
    - { id: twilio, label: Twilio, role: "Telephony. Streams call audio in and out over a WebSocket.", col: 1 }
    - { id: voice, label: Voice service, role: "Node.js service bridging Twilio and ElevenLabs audio streams in real time.", col: 2 }
    - { id: elevenlabs, label: ElevenLabs, role: "Speech in and speech out for the conversational agent.", col: 3 }
    - { id: engine, label: Dialogue engine, role: "Event-sourced on Redis so each turn can react to everything said before.", col: 2 }
    - { id: memory, label: Memory layer, role: "Post-call LangGraph pipeline writes facts to Qdrant and Neo4j; RAG reads them back.", col: 3 }
  edges:
    - { from: phone, to: twilio, label: audio }
    - { from: twilio, to: voice, label: WebSocket }
    - { from: voice, to: elevenlabs, label: stream }
    - { from: voice, to: engine, label: events }
    - { from: engine, to: memory, label: context }
---

nAIber is a startup I co-founded. This page covers the architecture at a high level; the product has its own site.

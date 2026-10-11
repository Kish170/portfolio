---
title: nAIber
tagline: AI voice companion that phones elderly people and remembers their conversations.
status: building
order: 1
problem: Loneliness in older adults is common, and scripted check-in calls feel robotic. nAIber holds real, open-ended phone conversations that build on what someone said last time.
worksToday:
  - Real-time phone calls streaming audio between Twilio and ElevenLabs over WebSockets, with about 800 ms response latency.
  - Event-sourced dialogue engine on Redis that adapts to earlier turns and past calls.
  - Post-call memory pipeline writing facts to Qdrant and Neo4j, recalled with relationship-aware RAG.
planned:
  - Pilot with first users.
  - Automated end-to-end call tests and agent evals as a regression suite.
  - Configuration and infrastructure as code.
  - Security hardening before calls run on a public number.
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

nAIber is a startup I co-founded. This page covers the architecture at a high level.

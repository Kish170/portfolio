---
title: internship-watcher
tagline: Always-on job discovery on a Raspberry Pi that ranks new postings into my notes every morning.
status: building
order: 3
problem: Good internship postings fill within days, and checking boards by hand is slow and noisy. This pulls listings automatically, filters out what does not fit, and ranks the rest.
worksToday:
  - Firehose pulls about 14.6k listings into SQLite, deduplicated by company, title, and URL.
  - Triage filters by eligibility, term, and role, then scores 0 to 104 on freshness, company tier, role fit, sponsorship, and location.
  - Ranked queue written to my Obsidian vault on a systemd timer. Python standard library only.
planned:
  - Watchtower polling of Greenhouse, Lever, and Ashby every 15 minutes to catch postings the hour they open.
  - Push alerts on top-tier matches.
  - Workday coverage and more listing feeds.
stack: [Python, SQLite, systemd, Raspberry Pi]
diagram:
  nodes:
    - { id: feeds, label: Listing feeds, role: "Public listing JSON, refreshed daily. No auth needed.", col: 0 }
    - { id: firehose, label: Firehose, role: "Pulls and deduplicates postings three times a day.", col: 1 }
    - { id: sqlite, label: SQLite, role: "Seen-postings store so each listing is processed once.", col: 2 }
    - { id: triage, label: Triage + scoring, role: "Drops ineligible roles, then scores what is left on five weighted signals.", col: 3 }
    - { id: vault, label: Obsidian queue, role: "Daily ranked queue lands in my notes, pushed via git.", col: 4 }
  edges:
    - { from: feeds, to: firehose }
    - { from: firehose, to: sqlite }
    - { from: sqlite, to: triage }
    - { from: triage, to: vault, label: daily }
---

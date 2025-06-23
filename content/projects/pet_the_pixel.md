---
title: How I tried to make the internet "pet" a "pixel"
tags:
  - project
  - typescript
  - react
  - go
  - golang
  - dragonfly
  - protobuf
  - webdev
  - gamedev
  - indiegames
---
# A Tiny Game About Lifting Spirits, One Click at a Time
In a world of ultra-high-definition screens and retina displays, the humble pixel — once the atomic unit of digital life — has become invisible.

But what if we could bring it back? What if a community of strangers could remind a single pixel that it still matters?

That’s the idea behind [**Pet the Pixel**](https://ptp.051205.xyz/), a minimalist multiplayer browser game where you click to pet a pixel. Every click — every _pet_ — adds to a global counter. And as the total climbs, the pixel reacts. It changes. It feels. It evolves.

## Why make this?
Honestly? I just wanted to make something small and delightful — and have fun building it

Let's face it: we’re surrounded by complexity — apps, AI, algorithms, ads. I wanted to strip all of that away and focus on something pure: the concept of a single pixel, and a single interaction. No logins, no accounts, no monetization. Just... pet the pixel.

## How to Play
Unsurprisingly, there isn't much you can do — and that’s the point:
- **Click** the cube (yes, that’s the pixel!) as much as you want.
- Your pets add to a **global total** shared by all players.
- As the total increases, the pixel’s **mood and appearance** evolve.
- There’s **no end goal** — just a shared journey to lift the spirit of one little pixel.

## Behind the Scenes: The Stack
Let’s talk about the tech. The project might seem simple on the surface, but a lot of thought went into making it somewhat minimal _and_ scalable.
And yes — I know this leans toward the classic “Enterprise Hello World.” But honestly, that was part of the fun. The goal wasn’t to optimize every byte — it was to experiment with tech I enjoy and see how far I could push a silly little idea.

### Backend
**Language & Framework:**
- Written in **Go**, using the lightweight **Chi** router for clean and minimal HTTP routing.
The backend exposes just two simple endpoints:
```go
r.Get("/api/status", GetStatusHandler)
r.Post("/api/pet", PetHandler)
```

**Data & State:**
- The **global pet count** is stored in [**Dragonfly**](https://www.dragonflydb.io/) — an open source alternative to Redis, which has shown to actually be faster in most benchmarks.
- **No in-memory state** — Dragonfly handles everything

**Serialization:**
- Instead of JSON, all responses use [**Protocol Buffers** (protobuf)](https://protobuf.dev/).
	- Why? Smaller payloads, lower bandwidth costs, helps keep the project within **free-tier hosting limits** (although it's a *veery* generous 10TB/monthly).
- **Rate Limiting:** IP-based throttling to prevent bots/spam/auto-clickers and preserve the spirit of the game.

### Frontend
**Built with:**
- **React + Vite + Mantine** — somewhat minimal structure, no frameworks or boilerplate beside the UI library. Why Mantine? I just like the way it looks — minimal, but not *too* minimal, if that makes sense.
**Interaction model:**
- Initially polls `/api/status` to get the global count.
- Each `/api/pet` call returns the **updated total**, which is then used to update the pixel’s **mood** and **visual effects**.
**Mood Logic:**
- Stored as simple thresholds in code:
	- `0`: nonexistent
	- `100+`: noticed
	- `1,000+`: Mildly Amused
	- (...and more, which can be found in the about section on the top right)
- Each milestone "reveals" new moods and animations (also lightweight, made with simple CSS `@keyframes`).

## Philosophy
There’s no onboarding, no leaderboard, no gamification. The goal isn’t to compete — it’s to _cooperate_. Every pet is a gentle reminder that a pixel — like any of us — just needs a little attention to come alive.

## What I learned from this
- **Protocol Buffers** are amazing for micro-projects like this — especially if you're trying to keep server costs low — although not as straight forward as plain JSON. It was impressive to see how much they could reduce overall message size.
- **Dragonfly** makes a perfect ultra-fast, atomic global counter. I'll definitely be using it instead of Redis. And I think you should too if you're up to support open source projects! 
- Sometimes, overengineering things _can_ be fun! _Just don't overdo it :D_
- MVPs can still have heart.

## What’s Next for the Pixel?
To begin with, the pixel isn't yet complete! I've probably overshot it, but I've set the last milestone at 100 million "pets", so there's still plenty of time before it's over for the project.

Secondly, I've decided that if there's enough interest around it, I’ll consider open-sourcing the project. Maybe others will remix it — a **Pet the Planet**, or **Pet the Pigeon**.. who knows? Endless possibilities!

Until then, give the pixel a pet. It needs you :)

👉 [Try it here](https://ptp.051205.xyz/)
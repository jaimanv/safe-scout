# 🌆 CityShield — Place-First Urban Safety Intelligence Platform

## Project Info

**Live URL**: https://example.com  
**Repository**: https://github.com/your-org/cityshield

CityShield is a **place-first, explainable urban safety intelligence platform** that helps people decide **when and where it is safer to move** using time-aware crime trends, interactive heatmaps, and an AI-powered safety assistant.  
This is a **decision-support tool**, not an emergency service.

## What does this project do?

CityShield enables users to:

- Search any **city / locality / area**
- Instantly view an **area safety summary**
- Explore **interactive crime heatmaps**
- Understand **time-based risk patterns**
- Compare localities using **city safety rankings**
- Ask questions via a **context-aware safety assistant chatbot**

## Why is this project useful?

Urban safety information today is often static, non-explainable, and hard to act on.  
CityShield improves this by providing:

- **Place-first entry flow** (search before map)
- **Safety score (0–100)** with clear reasoning
- **Time-aware risk analysis** (hour / day / weekend)
- **Explainable insights**, not black-box labels
- **Trust signals** such as data freshness

## Simple Architecture Overview

CityShield uses a **modern, serverless architecture** for scalability and performance.

```mermaid
graph TD
    User((User))
    User -->|Interacts| FE[React Frontend - Vite]

    FE -->|Verify Identity| AUTH[Supabase Auth]
    FE -->|Fetch Safety Data| DB[Supabase PostgreSQL]
    FE -->|Upload Incident Data| STORAGE[Supabase Storage]

    FE -->|Render Maps & Heatmaps| MAPS[Maps API]
    FE -->|Risk Scoring & Trends| AI[AI Risk Engine]
    FE -->|Safety Queries| BOT[Safety Assistant Chatbot]

    subgraph Backend Services
        AUTH
        DB
        STORAGE
    end

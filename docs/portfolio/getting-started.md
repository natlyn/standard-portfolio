---
sidebar_position: 3
title: "Aura analytics getting started"
---

# Getting started with Aura analytics

:::info Writing sample
This is a portfolio sample demonstrating developer-oriented getting-started documentation. Aura Analytics is a fictional product.
:::

This guide walks you through setting up your Aura Analytics environment, generating an API key, and making your first API call to retrieve a data report. By the end, you'll have a working integration you can build on.

**Estimated time:** 15 minutes.

---

## Prerequisites

Before you begin, make sure you have:

- An Aura Analytics account. Sign up at [aura.io/signup](https://aura.io/signup) if you don't have one.
- A package manager: [npm](https://nodejs.org) (v16 or later) or [pip](https://pip.pypa.io) (Python 3.8 or later), depending on your language preference.
- Basic familiarity with REST APIs and JSON.

---

## Step 1: Generate an API key

All requests to the Aura Analytics API must be authenticated using an API key.

1. Log in to the [Aura dashboard](https://app.aura.io).
2. Navigate to **Settings > API Keys**.
3. Select **Generate New Key**.
4. Give your key a descriptive name (for example, `my-first-integration`).
5. Select **Create**. Your new key is displayed once; copy it now and store it somewhere safe, such as a password manager or a secrets vault.

:::caution
Aura does not display API keys again after the initial creation screen. If you lose a key, revoke it and generate a new one.
:::

---

## Step 2: Install the Aura SDK (optional)

Aura provides official SDKs for JavaScript and Python. You can also use any HTTP client to call the API directly.

**JavaScript (npm)**

```bash
npm install @aura-analytics/sdk
```

**Python (pip)**

```bash
pip install aura-analytics
```

If you prefer to use the REST API directly without an SDK, skip to [Step 3](#step-3-make-your-first-api-call).

---

## Step 3: Make your first API call

The following examples retrieve a summary report for the past 7 days from the `events` dataset.

### Using cURL

```bash
curl -X GET "https://api.aura.io/v2/reports/summary" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "dataset": "events",
    "date_range": {
      "start": "2025-02-19",
      "end": "2025-02-26"
    },
    "metrics": ["total_events", "unique_users", "avg_session_duration"]
  }'
```

### Using JavaScript

```javascript
import { AuraClient } from '@aura-analytics/sdk';

const client = new AuraClient({ apiKey: 'YOUR_API_KEY' });

const report = await client.reports.getSummary({
  dataset: 'events',
  dateRange: {
    start: '2025-02-19',
    end: '2025-02-26',
  },
  metrics: ['total_events', 'unique_users', 'avg_session_duration'],
});

console.log(report.data);
```

### Using Python

```python
from aura_analytics import AuraClient

client = AuraClient(api_key="YOUR_API_KEY")

report = client.reports.get_summary(
    dataset="events",
    date_range={"start": "2025-02-19", "end": "2025-02-26"},
    metrics=["total_events", "unique_users", "avg_session_duration"]
)

print(report["data"])
```

---

## Step 4: Understand the response

A successful request returns a `200 OK` response with a JSON body:

```json
{
  "report_id": "rpt_7f2a91bc",
  "dataset": "events",
  "date_range": {
    "start": "2025-02-19",
    "end": "2025-02-26"
  },
  "generated_at": "2025-02-26T15:04:22Z",
  "data": {
    "total_events": 148320,
    "unique_users": 9410,
    "avg_session_duration": 312
  }
}
```

| Field | Type | Description |
|---|---|---|
| `report_id` | string | Unique identifier for this report instance. |
| `dataset` | string | The dataset queried. |
| `date_range` | object | The start and end dates of the report window. |
| `generated_at` | string | ISO 8601 timestamp of when the report was generated. |
| `data` | object | Key-value pairs of the requested metrics and their values. |

`avg_session_duration` is returned in seconds.

---

## Troubleshooting

**`401 Unauthorized`**
Your API key is missing, expired, or invalid. Verify the key in **Settings > API Keys** and check that you're passing it in the `Authorization` header.

**`400 Bad Request`**
The request body is malformed or a required field is missing. Check that your `dataset`, `date_range`, and `metrics` values are correctly formatted.

**`404 Not Found`**
The dataset name you specified does not exist or you do not have access to it. Check your workspace's available datasets under **Data > Datasets**.

---

## Next steps

Now that you've made your first API call, here's where to go next:

- **Explore available metrics** — See the full list of metrics and dimensions in the [Metrics Reference](https://docs.aura.io/metrics).
- **Schedule reports** — Set up automated reports delivered to your email or a webhook. See [Scheduled Reports](https://docs.aura.io/scheduled-reports).
- **Stream real-time events** — Connect to the Aura WebSocket API to receive live event data. See [Real-Time Streaming](https://docs.aura.io/streaming).

---

*[← Back to Portfolio](./index.md)*
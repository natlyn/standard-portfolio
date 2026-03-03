---
sidebar_position: 4
title: "AI Prompt Library for Technical Writers"
---

# AI Prompt library for technical writers

:::info Real Work
Unlike the other samples in this portfolio, this page documents **real tooling** from my active workflow. The prompt library lives in this repository under `.github/prompts/` and is fully functional with VS Code and GitHub Copilot.
:::

As AI tools have become a standard part of technical writing workflows, I've invested in building reusable, structured prompts that produce consistent, high-quality documentation. This prompt library is designed for technical writers working in VS Code with GitHub Copilot — but the prompts are plain Markdown and can be adapted for Claude, ChatGPT, or Cursor as well.

---

## Why a prompt library?

Ad-hoc AI prompting produces inconsistent results. A well-designed prompt library solves three problems:

1. **Consistency**: every writer on the team starts from the same baseline, producing docs with a consistent structure and tone.
2. **Speed**: a good prompt can generate a first draft in seconds that would take 30–60 minutes to scaffold from scratch.
3. **Quality control**: prompts encode your style guide, preferred terminology, and structural requirements so the model produces output that matches your standards.

---

## How to use this library

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/download)
- GitHub Copilot enabled in VS Code
- Reusable prompts enabled in your workspace settings

### Setup

1. Clone this repository to your local machine.
2. In VS Code, go to **File > Preferences > Settings** and search for `chat.promptFiles`.
3. Enable the setting and add the path to your local clone of this repository.
4. You can now invoke prompts from the Copilot chat panel using `/prompt-name`.

---

## Prompts

### FAQ generator (`create-faq`)

This prompt accepts a file of raw customer support tickets and generates a structured, publication-ready FAQ. It's designed to turn messy support data into self-service documentation without manual summarization or editing from scratch.

#### The prompt

```markdown
---
description: Create FAQ entries from customer support tickets.
model: GPT-4.1
---
You are a technical writer on the customer support team for an e-commerce platform.
Your task is to analyze the tickets in ${input:tickets-data}, a markdown file containing
raw customer support tickets, and do the following:

- Identify the most common issues and those that can be addressed with clear documentation.
- Draft an FAQ page based solely on these issues.
- Group similar issues together to highlight patterns.
- Write clear, concise questions and answers to help customers resolve their issues independently.
- DO NOT include or infer any information that was not provided in the tickets.
- Format and organize the FAQ in markdown, using logical headings and bullet points
  for clarity (e.g., Shipping and orders, Product issues).
- Name the output file `faqs.md`.
- Ensure the FAQ is user-friendly and easy to navigate.
```

#### Input variable

| Variable | Description |
|---|---|
| `tickets-data` | Path to a `.md` file containing raw customer support tickets |

#### Example usage

```bash
/create-faq tickets-data=docs/prompt-samples/support-tickets.md
```

#### Try It Yourself

Use the test data at [support tickets](../prompt-samples/support-tickets.md) to test the prompt yourself. The output will be a structured FAQ in Markdown format, saved as `faqs.md`. Open the file to review the generated content and verify its accuracy.

---

## More Prompts in This Library

| Prompt | Description |
|---|---|
| `create-faq` | Generate a structured FAQ from raw support ticket data |

---

*[← Back to Portfolio](./index.md)*
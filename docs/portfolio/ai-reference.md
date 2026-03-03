---
sidebar_position: 5
title: "Working with AI Systems — A Dev Reference"
---

# Working with AI Systems: A Developer Reference

:::info Writing Sample
This is a portfolio sample with technical documentation for AI-powered systems. The audience is an internal engineering team integrating with an LLM.
:::

This reference covers three foundational concepts every engineering team should understand before deploying an AI system: **guardrails and safety constraints**, **context files and system prompts**, and **prompt engineering and output validation**. These are key to ensuring a production-ready AI integration.

---

## Guardrails and safety constraints

Guardrails define the boundaries of acceptable AI behavior. They act as a control layer between the model's raw capabilities and its permitted actions in your product. Without guardrails, a model may produce outputs far outside your use case or safety requirements.

### Types of guardrails

| Guardrail type | Description | Example |
|---|---|---|
| **Topic restrictions** | Limit the subjects the model will engage with | "Only respond to questions about our product" |
| **Output format constraints** | Require structured, predictable output | "Always respond in valid JSON" |
| **Refusal rules** | Explicit instructions to decline certain requests | "Do not provide legal or medical advice" |
| **Source grounding** | Require the model to draw only from provided content | "Answer only from the attached documentation" |

### Common guardrail challenges

- **Prompt injection**: Users craft inputs that override system prompts.
- **Context overflow**: Key instructions fall outside the model's attention window in long conversations.
- **Conflicting instructions**: Contradictory prompts lead to unpredictable behavior.

:::caution
Guardrails reduce risk but do not eliminate it. Test thoroughly before deploying to production.
:::

---

## Context files and system prompts

### The role of context

An LLM has no memory between sessions and no inherent knowledge of your product. Context bridges this gap, tailoring the model to your specific use case. Context sources include:

| Source | Description |
|---|---|
| **System prompt** | Privileged instructions defining the model's role and behavior. |
| **Conversation history** | Prior turns in the session for maintaining dialogue coherence. |
| **Retrieved documents (RAG)** | External content injected at runtime for grounding. |
| **User input** | The end user's message, treated as untrusted input. |

### Writing an effective system prompt

A well-crafted system prompt ensures consistent, predictable model behavior. Key components include:

1. **Role definition**: Define the model's purpose.
2. **Scope boundaries**: Specify allowed topics and tasks.
3. **Tone and style**: Set communication style (e.g., formal, friendly).
4. **Output format**: Define response structure.
5. **Refusal rules**: State what the model should decline.
6. **Fallback behavior**: Define actions for unknown answers.

**Example system prompt (customer support bot):**
```
You are a support assistant for Meridian, a cloud-based project management platform. Your role is to help users troubleshoot issues, understand product features, and navigate the Meridian interface.

Scope:
- Only answer questions related to Meridian's product and features.
- Do not answer questions about competitor products.
- Do not provide pricing information. Direct pricing questions to the sales team.

Tone: Professional, concise, and friendly.
Output: Respond in 1–3 short paragraphs. Use numbered lists for steps.

If you do not know the answer, say: "I don't have that information right now. Please contact our support team for help."
```

---

## Prompt engineering and output validation

### Prompt engineering principles

1. **Be explicit**: Clearly state what you want.
   - Weak: "Summarize this article."
   - Strong: "Summarize this article in 3 bullet points focusing on the main finding, methodology, and key limitation."

2. **Use examples**: Show desired output formats.
   - Example input: "My order was supposed to arrive Tuesday but it's now Friday."
   - Example output: "- Issue type: Shipping delay\n- Action required: Check order status."

3. **Separate instructions from data**: Use clear boundaries to reduce prompt injection risks.
   - Example:
     ```
     [INSTRUCTIONS]
     Classify the following message as billing, shipping, or technical issue.

     [MESSAGE]
     {{user_input}}
     ```

4. **Ask for reasoning**: For complex tasks, instruct the model to reason step by step before concluding.

### Output validation

Always validate model output before use. Key checks include:

- **Format check**: Ensure output matches the expected structure.
- **Content check**: Verify required fields and length.
- **Safety check**: Flag inappropriate content.
- **Grounding check**: Confirm factual claims are traceable to sources.

**Validation example (JSON):**
```javascript
try {
  const raw = modelResponse.content[0].text;
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);
  // Validate parsed against your schema here
} catch (err) {
  console.error("Model output failed JSON parsing:", err);
}
```

---

*[← Back to Portfolio](./index.md)*
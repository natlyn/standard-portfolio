# Welcome

Welcome to my repository!

This space showcases projects and resources I’ve built to help teams streamline document creation and management. Here, you’ll find examples of my work and tools designed to make technical writing more efficient.

## Prompt Library

Inside this repository, you’ll find reusable `*.prompt.md` files for use with Visual Studio Code and GitHub Copilot. These prompts are designed to assist with AI-powered technical writing tasks, such as generating:

- FAQs
- User guides
- API documentation

### Prerequisites

To use these prompts effectively, you’ll need:

- [Visual Studio Code](https://code.visualstudio.com/download) installed
- GitHub Copilot enabled in your Visual Studio Code environment
- Reusable prompts enabled in your Visual Studio Code settings

#### Enable reusable prompts in your workspace

Before you begin, make sure you’ve cloned this repository to your local machine and added it to your workspace.

1. Navigate to `chat.promptFiles` in **File** > **Preferences** > **Settings** > **Chat: Prompt Files**, or use `Ctrl + Shift + P` to open the command palette and search for the option.
2. Check the box to enable reusable prompts.
3. Select **Add Item** and enter the path to the folder containing this repository in the `chat.promptFiles` setting. For example, if you cloned the repository to `C:\Users\YourName\Documents\prompt-library`, add that folder path.
4. You can now use these prompts from Copilot chat or the command palette.

### FAQ Creation Prompt

This prompt accepts a file containing raw customer support data and generates a comprehensive FAQ. Make sure you have a markdown file with customer support tickets ready.

#### Input Variables

| Variable      | Description |
| --- | ---|
| tickets-data | Path to a markdown file containing raw customer support tickets|

#### Example usage:
`/create-faq tickets-data=docs\prompt-samples\support-tickets.md`


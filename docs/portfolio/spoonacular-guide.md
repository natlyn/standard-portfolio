---
sidebar_position: 6
title: "Sample: Spoonacular API quickstart"
---

# Spoonacular API quickstart guide

:::info Writing sample
This is a portfolio sample based on the real [Spoonacular Food API](https://spoonacular.com/food-api), a publicly available recipe and nutrition data API. It demonstrates API quickstart documentation written for developers using Postman.
:::

This guide walks you through authenticating with the Spoonacular API and making your first two requests: retrieving random recipes filtered by cuisine and finding recipes similar to a specific dish. By the end, you'll have a working Postman workspace you can use to explore the full API.

**Time to complete:** About 15 minutes.

---

## What is Spoonacular?

Spoonacular is a food and recipe API that gives developers access to a database of over 360,000 recipes, ingredient data, nutrition information, and meal planning tools. It's commonly used in food apps, meal planning platforms, grocery services, and nutrition trackers.

The API follows REST conventions and returns JSON responses.

---

## Prerequisites

Before you begin, you'll need:

- A **Spoonacular account and API key** — sign up at [spoonacular.com/food-api](https://spoonacular.com/food-api). Free tier accounts are available.
- **Postman** installed — download it at [postman.com/downloads](https://www.postman.com/downloads/). This guide uses Postman to construct and send requests, but any HTTP client will work.

### Get your API key

1. Go to [spoonacular.com/food-api](https://spoonacular.com/food-api) and select **Get a Free API Key**.
2. Complete registration and log in to your Spoonacular account.
3. Navigate to **My Console**, then select the **Profile** tab.
4. Select **Show/hide API key** to reveal your key and copy it somewhere accessible — you'll need it in the steps below.

:::tip
Store your API key as a Postman environment variable named `apikey`. This lets you reference it as `{{apikey}}` across all your requests without hardcoding it into each one.
:::

---

## Set up your Postman workspace

1. In Postman, select **New → Collection** from the left sidebar.
2. Name your collection (for example, `Spoonacular Recipes`) and add a short description so collaborators know its purpose.
3. Save the collection.

All requests in this guide will be added to this collection.

---

## Request 1: Get random recipes

The `/recipes/random` endpoint returns a set of randomly selected recipes. You can filter results using tags to narrow by cuisine type, meal type, diet, or ingredients to exclude.

The following example returns 10 random Italian recipes that do not include anchovies.

### Add the request

1. Inside your Spoonacular collection, select **Add a request**.
2. Name it `Get random recipes` and save.
3. Set the HTTP method to **GET**.
4. Enter the following base URL:

```
https://api.spoonacular.com/recipes/random
```

### Configure query parameters

In the **Params** tab, add the following key-value pairs:

| Key | Value | Description |
|---|---|---|
| `limitLicense` | `true` | Returns only recipes with an open license that permits display with attribution. |
| `includeNutrition` | `false` | Excludes nutritional data from the response. Set to `true` to include it. |
| `include-tags` | `italian` | Filters results to recipes matching this tag. Accepts meal types, cuisines, and diets. Separate multiple tags with commas. |
| `exclude-tags` | `anchovies` | Excludes recipes containing this ingredient or tag. |
| `number` | `10` | Number of recipes to return. Accepts 1–100. Defaults to 10. |
| `apiKey` | `{{apikey}}` | Your Spoonacular API key. |

### Send the request

Select **Send**. Postman constructs and fires the following request:

```
GET https://api.spoonacular.com/recipes/random?limitLicense=true&includeNutrition=false&include-tags=italian&exclude-tags=anchovies&number=10&apiKey=<apiKey>
```

### Example response

A successful request returns `200 OK` with a JSON object containing a `recipes` array. Each item in the array represents one recipe:

```json
{
  "recipes": [
    {
      "id": 716429,
      "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
      "image": "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      "servings": 2,
      "readyInMinutes": 45,
      "cuisines": ["Italian"],
      "diets": ["vegetarian"],
      "summary": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be just the main course you are searching for..."
    }
  ]
}
```

:::note
The response will vary each time you call this endpoint — it returns a random selection within your tag filters on every request.
:::

---

## Request 2: Get similar recipes

The `/recipes/{id}/similar` endpoint returns a list of recipes similar to a dish you specify by its Spoonacular recipe ID. This is useful for building "you might also like" features or exploring variations on a theme.

### Find a recipe ID

Recipe IDs appear in Spoonacular API responses as the `id` field. You can also find them in recipe URLs on the Spoonacular website — for example, the ID in `spoonacular.com/pasta-bolognese-654812` is `654812`.

Use the `id` returned from your random recipes request above, or substitute any valid Spoonacular recipe ID.

### Add the request

1. Inside your Spoonacular collection, select **Add a request**.
2. Name it `Get similar recipes` and save.
3. Set the HTTP method to **GET**.
4. Enter the following URL, replacing `{id}` with your recipe ID:

```
https://api.spoonacular.com/recipes/{id}/similar
```

For example:

```
https://api.spoonacular.com/recipes/716429/similar
```

### Configure query parameters

| Key | Value | Description |
|---|---|---|
| `number` | `10` | Number of similar recipes to return. Accepts 1–100. Defaults to 10. |
| `apiKey` | `{{apikey}}` | Your Spoonacular API key. |

### Send the request

Select **Send**. Postman fires the following request:

```
GET https://api.spoonacular.com/recipes/716429/similar?number=10&apiKey=<apiKey>
```

### Example response

A successful request returns `200 OK` with a JSON array of similar recipes:

```json
[
  {
    "id": 715538,
    "imageType": "jpg",
    "title": "Bruschetta Style Panzanella Salad",
    "readyInMinutes": 10,
    "servings": 2,
    "sourceUrl": "https://spoonacular.com/bruschetta-style-panzanella-salad-715538"
  },
  {
    "id": 648259,
    "imageType": "jpg",
    "title": "Italian String Beans with Breadcrumbs",
    "readyInMinutes": 45,
    "servings": 2,
    "sourceUrl": "https://spoonacular.com/italian-string-beans-648259"
  }
]
```

---

## Troubleshooting

**`401 Unauthorized`**
Your API key is missing, incorrect, or has expired. Verify the key in your Spoonacular console and confirm you're passing it correctly as the `apiKey` parameter.

**`402 Payment Required`**
You've exceeded the daily request quota for your current plan. Free tier accounts are limited to 150 requests per day. Check your usage in the Spoonacular console.

**`404 Not Found`**
The recipe ID in your request doesn't exist. Verify the ID against a known Spoonacular recipe URL or a previous API response.

**Empty `recipes` array**
Your tag combination may be too restrictive. Try broadening your `include-tags` value or removing `exclude-tags` to confirm the endpoint is responding correctly, then add filters back one at a time.

---

## Next steps

Now that you have a working Postman setup, explore more of the Spoonacular API:

- **Search recipes by ingredients** — Use `/recipes/findByIngredients` to return recipes that match a list of ingredients you have on hand.
- **Get full recipe details** — Use `/recipes/{id}/information` to retrieve full recipe details including instructions, ingredients, and nutrition.
- **Analyze nutrition** — Use `/recipes/{id}/nutritionWidget.json` to get a detailed nutritional breakdown for any recipe.

See the full [Spoonacular API documentation](https://spoonacular.com/food-api/docs) for the complete list of available endpoints.

---

*[← Back to Portfolio](./index.md)*
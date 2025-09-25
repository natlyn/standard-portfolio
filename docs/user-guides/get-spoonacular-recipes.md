# Get Spoonacular recipes

## Prerequisites

- Sign up for a preferred API testing application account or log in to your existing account. This example uses Postman.
- Obtain an API key to access the Spoonacular API. If you already have an account and API key, you can skip this section.
  1. Navigate to the [Spoonacular API website](https://spoonacular.com/food-api) and select **Get a Free API Key**.
  2. To view your API key in the Spoonacular console:
    - Log in to navigate to your dashboard then select **My Console**.
    - From the **Profile** tab, select **Show/hide API key** to copy your API key.
    - Paste your key into a notepad for later or keep the Spoonacular browser tab open for easy access.

## Set up your Postman workspace

1. **Optional:** Consider creating a new collection to keep your requests organized. To do so, select **New** then **Collection** from the left menu and create a new collection. Name your new collection (for example, `Spoonacular recipes`) and save your changes.
2. Add a description for your new workspace so viewers know what to expect.

## Make your first request

Postman allows users to perform CRUD (create, read, update, or delete) operations on RESTful APIs using the `POST`, `GET`, `PUT`, and `DELETE` HTTP methods. This guide will only cover the GET method.

### GET random recipes

You can access random recipes and filter requests by tags to determine your desired output. These tags can be `meal types`, `cuisines`, `specific diets`, or other strict intolerances.

Let's configure your first request to return 10 random `Italian cuisine` meals that do not have anchovies as an ingredient:

1. From your new workspace, add a new request and name it (for example, "Get random recipes"), then save your changes.
2. In the **Params** section, enter your key-value pairs to configure your request as follows. The description entry is optional and a great way to keep track of your key values.

| Key            | Value      | Description                                                                 |
|----------------|------------|-----------------------------------------------------------------------------|
| `limitLicense`   | `true`       | Whether the recipes should have an open license that allows display with proper attribution. |
| `includeNutrition`| `false`      | The tags that the recipe must match. They can be diets, meal types, cuisines, or intolerances. For multiple tags, separate with commas (interpreted as 'AND'). |
| `include-tags`   | `italian`    | The tags to include (for example, cuisine type).                            |
| `exclude-tags`   | `anchovies`  | The tags to exclude.                                                        |
| `number`         | `10`         | The maximum number of items to return (between 1 and 100). Defaults to 10.  |
| `apiKey`         | `{{apikey}}` | The authorization key required to send the request.                         |

3. Paste your API key from the Spoonacular site in the Value field for your `apiKey`, then select **Send**.

#### Example API call and response
```
https://api.spoonacular.com/recipes/random?limitLicense=true&includeNutrition=false&include-tags=italian&exclude-tags=anchovies&number=10&apiKey=<apiKey>
```

```json
[
  {
    "id": 4053,
    "aisle": "Oil, Vinegar, Salad Dressing",
    "image": "olive-oil.jpg",
    "consistency": "LIQUID",
    "name": "olive oil",
    "amount": 1,
    "unit": "teaspoon"
  },
  {
    "id": 11282,
    "aisle": "Produce",
    "image": "brown-onion.png",
    "consistency": "SOLID",
    "name": "onions",
    "amount": 3,
    "unit": "cups"
  }
]
```

### Get similar recipes

You can also request recipes similar to a specific dish by its recipe ID. The following example returns 10 recipes similar to the one specified by an ID.
1. From your Spoonacular workspace in Postman, add a new request and name it (for example, "Get similar recipes"), then save your changes.
2. In the **Params** section, enter your key-value pairs to configure your request as follows.

| Key            | Value      | Description                                                                 |
|----------------|------------|-----------------------------------------------------------------------------|
| `limitLicense`   | `true`       | Whether the recipes should have an open license that allows display with proper attribution. |
| `recipeID`       | `1234`       | Replace with the ID of the recipe you want similar recipes for.             |
| `apiKey`         | `{{apikey}}` | The authorization key required to send the request.                         |

#### Example API call and response

```
https://api.spoonacular.com/recipes/1234/similar?apiKey=<apiKey>
```

Example response:
```json
[
  {
    "id": 648259,
    "imageType": "jpg",
    "title": "Italian String Beans With Anchovies and Breadcrumbs",
    "readyInMinutes": 45,
    "servings": 2,
    "sourceUrl": "https://spoonacular.com/italian-string-beans-with-anchovies-and-breadcrumbs-648259"
  }
]
```

Refer to the [Spoonacular API documentation](https://spoonacular.com/food-api/docs) for more information about the available API operations.

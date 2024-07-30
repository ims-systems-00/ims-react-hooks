## useBuildQueryString hook

This hook is a helper hook for complex query building and handling that can be used through `url query strings` on a particular `api` endpoint. Bear in mind this hook does not directly depend on your api or does not need your `api service` for interaction as a dependency.

What this does is this builds you **query strings** that can be furture utilised with the api that you want to use. This only handles states of query depending on your `react applpication business loggic`. This makes it highly **decoupled** from your api service layer.

### Enough ! How to use ?

To initiate the hook it takes an optional object as a parameter and the properties are `required`, `filter`, `pagination` and `search`. Example:

```js
useBuildQueryString({
  required: {},
  filter: {},
  search: {},
  pagination: {},
});
```

All the supplied values are in plain js objects are then converted into query strings. Four object handles it's states in isolation. the queries have to be always in the `value` object in each properties. Example:

```js
useBuildQueryString({
  required: {
    value: { someQueryFiled: theValue, otherQueryField: theValue },
  },
  filter: {
    value: { someQueryFiled: theValue, otherQueryField: theValue },
  },
  search: {
    value: { someQueryFiled: theValue, otherQueryField: theValue },
  },
  pagination: {
    value: { someQueryFiled: theValue, otherQueryField: theValue },
  },
});
```

The `required` object is immutable and gets added to all the query of this query instance.
The `filter` object can me be muted and changed according to `backend` needs and can contain any value as an object.
The `pagination` object handles the pagination if backend supports it.
The `search` object handles searching with key words with other applied fileters by `filter`query.

The hook exposes folloing functions :

- **query** this is the string that has been built.
- **toolState** this is the raw object has been built.
- **getQueryString** gives the same string hat has been built.
- **handleFilter** helpful for changing and muting current filter.
- **handlePgination** helpful for changing and muting current pagination.
- **handleSearch** helpful for changing and muting current search.

### Examples

> Scenerio : You need to query a backend that returns list of users and supports pagination and filters and search in the urls. And these `pagination`, `filter` and `search` queries needs to be immutable depending on use cases

You would simply

```js
let { query, toolState, getQueryString, handlePagination, ...queryHandlers } =
  useBuildQueryString({
    filter: {
      //  backed api team will proide...
      value: {
        sort: "username",
      },
    }, // default filter applied
  });
```

Above will return a query string like `sort=username`

Now if you want to build a query that needs to be solrted by user name and are admins only, a query make look like.

```js
queryHandlers.handleFilter({
  value: {
    role: "admin",
    sort: "username",
  },
});
```

Above will return a query string like `role=admin&sort=username`

Now among this users if you want to also search by name just do

```js
queryHandlers.handleSearch({
  value: {
    // folloing key will be given by backend api
    keywords: "Some amazing name",
  },
});
```

Above will return a query string like `role=admin&sort=username&keywords=Some amazing name`

`handlePagination` functions does handle the pagination for you in the same manner. To use them simply

```js
handlePagination(5, 30); // (page,size)
```

And this will produce `role=admin&sort=username&keywords=Some amazing name&page=5&size=30`

Now as you can see the `query` & use `getQueryString` function to use it with any your api endpoint. example

```js
http.get("https://my-awsome-api.com/some-route?" + getQueryString());
```

A more precise ezample:

```js
fetch("https://my-awsome-api.com/some-route?" + getQueryString(), {
  method: "GET",
});
```

or

```js
fetch("https://my-awsome-api.com/some-route", {
  method: "GET",
  query: getQueryString(),
});
```

This helps you use the string depending on how you want to implement you api layer.

More complex queries can be built with this hook contact your api team for relavant quries and also the beauty is one mutation does not impact other values inthe `url query strings` which is a beauty. Say now it we do :

```js
queryHandlers.handleFilter({
  value: {
    age: {
      gte: 15,
    },
    sort: "role",
  },
});
```

Above will mute the string like `age[gte]=15&sort=role&keywords=Some amazing name&page=5&size=30`. Without impacting the other properties like pagination and search which helps to build complex combination of searching and filtering.

# Solution Docs

<!-- You can include documentation, additional setup instructions, notes etc. here -->

Autocomplete is extended to use HTTP endpoint as datasource. Autocomplete can either work with given dataset using de data option OR use a HTTP endpoint using a given url option

### Example for using local dataset:

```
const data = usStates.map(state => ({
  text: state.name,
  value: state.abbreviation
}));

new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
});

```

### Example using HTTP endpoint
```
// Github Users
new Autocomplete(document.getElementById('gh-user'), {
  url: "https://api.github.com/search/users?q={query}&per_page={count}",
  onSelect: (ghUserId) => {
    console.log('selected github user id:', ghUserId);
  },
})
```

Remark:
The github url used in this example is rate limited to max. 60 requests per hour. If you want to use this github search in your application you should use authentication to prevent this rate limit. More information can be found on: https://developer.github.com/v3/#rate-limiting


When clicking on one of the results in de dropdown box, the result is shown in the search box.
Navigating the list can be done using the up/down keyspairs.


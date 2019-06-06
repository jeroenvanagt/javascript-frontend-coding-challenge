import ApiHandler from './ApiHandler'

export default class Autocomplete {
  constructor(rootEl, options = {}) {
    options = Object.assign({ numOfResults: 10, data: [], url: undefined }, options);
    Object.assign(this, { rootEl, options });
    if (this.options.url){
      this.apiHandler = new ApiHandler(this.options)
    }

    this.init();
  }

  onQueryChange(query) {
    // Get data for the dropdown
    this.getResults(query, this.options.data).then(results => {
      this.updateDropdown(results);
    })
  }

  /**
   * Given an array and a query, return a filtered array based on the query.
   * Async function, returns a promise
   */
  getResults(query, data) {
    return new Promise((resolve, reject) => {

      if (!query){
        console.log('no query');
        resolve([]);
      } else if (data.length>0){

        // Filter for matching strings
        let results = data.filter((item) => {
          return item.text.toLowerCase().includes(query.toLowerCase());
        });

        results = results.slice(0, this.options.numOfResults);
        resolve(results)

      } else if (this.options.url){
        resolve(this.apiHandler.getData(query));
      }

    });
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    results.forEach((result) => {
      const el = document.createElement('li');
      Object.assign(el, {
        className: 'result',
        textContent: result.text,
      });

      // Pass the value to the onSelect callback
      el.addEventListener('click', (event) => {
        const { onSelect } = this.options;
        if (typeof onSelect === 'function') onSelect(result.value);
        this.rootEl.firstElementChild.value=result.text;
      });

      fragment.appendChild(el);
    });
    return fragment;
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    Object.assign(inputEl, {
      type: 'search',
      name: 'query',
      autocomplete: 'off',
    });

    inputEl.addEventListener('input', event =>
      this.onQueryChange(event.target.value));

    return inputEl;
  }

  init() {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl)

    // Build results dropdown
    this.listEl = document.createElement('ul');
    Object.assign(this.listEl, { className: 'results' });
    this.rootEl.appendChild(this.listEl);
  }
}

import stringInject from 'stringinject';

export default class ApiHandler{
    constructor(options){
        this.options = Object.assign({ numOfResults: 10, json_root: 'items', mapping: {text: 'login', value: 'id'}}, options);
    }

    getData(query){
        let url = stringInject(this.options.url,{query: query, count: this.options.numOfResults});
        console.log(url);
        return fetch(url)
        .then( resp => resp.json())
        .then( data =>  {
            return data[this.options.json_root].map( item => ({
                text: item[this.options.mapping.text],
                value: item[this.options.mapping.value]
            }))
        })

    }
}
import axios from 'axios';

export class InfluxDBHandler {
    
    constructor(){

       const hostName = 'localhost';
        const hostPort = 8086;
        const dbName = 'healthdata';
        const username = 'admin';
        const password = 'changeme';
        this.baseQuery = `http://${hostName}:${hostPort}/query?db=${dbName}&u=${username}&p=${password}`;

        this.getMultiOperatorQuery = this.getMultiOperatorQuery.bind(this);
        this.getSelectQuery = this.getSelectQuery.bind(this);
        this.getBaseQuery = this.getBaseQuery.bind(this);
        this.fetchData = this.fetchData.bind(this);
        }

    getBaseQuery = (metric, time, timeDuration = '1h', operator) => `${this.baseQuery}&q=${this.getSelectQuery(operator, metric, time, timeDuration)}`;
    getMultiOperatorQuery = (metric, time, timeDuration = '1h', operator) =>{
        var that = this;
        const queries = operator.reduce((a,q) => `${a}${that.getSelectQuery(q, metric, time, timeDuration)}`, '');
        return `${this.baseQuery}&q=${queries}`
    }
  
    async fetchData(metric, time, duration = '1h', operator = 'sum') {
        let url = '';
        if (typeof operator === 'string'){
            url = this.getBaseQuery(metric, time, '1d', operator);
        } else {
            url = this.getMultiOperatorQuery(metric, time, '1d', operator);
        }
        const response = await axios.get(url)
        
        let transformedResponse=[]
        try {
            for(let i=0;i<response.data.results[0].series[0].values.length;i++){
                const date = response.data.results[0].series[0].values[i][0];
                let value = response.data.results[0].series[0].values[i][1];
                if (response.data.results.length > 1){
                    value = []
                    for (let j=0;j<response.data.results.length;j++){
                        value.push(response.data.results[j].series[0].values[i][1])
                    }
                }
                transformedResponse.push({
                    time: date,
                    value: value
                })
            }
 
        } catch (e) {
            console.log(`Failed to fetch metrics for ${metric}, URL: ${url}`)
        }
        return transformedResponse;
      }


      getSelectQuery = (operator, metric, timestamp, duration) => `SELECT%20${operator}(%22value%22)%20FROM%20%22${metric}%22%20WHERE%20time%20%3E%3D%20${timestamp}ms%20GROUP%20BY%20time(${duration})%20fill(null)%3B`;

}
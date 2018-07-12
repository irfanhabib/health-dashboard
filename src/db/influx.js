import axios from 'axios';

export class InfluxDBHandler {
    
    constructor(){

       const hostName = 'localhost';
        const hostPort = 8086;
        const dbName = 'healthdata';
        const username = 'admin';
        const password = 'changeme';
        this.baseQuery = `http://${hostName}:${hostPort}/query?db=${dbName}&u=${username}&p=${password}`;
    }

    getBaseQuery = (metric, time, timeDuration = '1h', operator) => `${this.baseQuery}&q=SELECT%20${operator}(%22value%22)%20FROM%20%22${metric}%22%20WHERE%20time%20%3E%3D%20${time}ms%20GROUP%20BY%20time(${timeDuration})%20fill(null)&epoch=ms`;

    async fetchData(metric, time, duration = '1h', operator = 'sum') {
        const url = this.getBaseQuery(metric, time, '1d', operator);
        const response = await axios.get(url)
        
        let transformedResponse=[]
        try {

            transformedResponse = response.data.results[0].series[0].values.map(
                d => ({
                    time: d[0],
                    value: d[1] ? d[1] : 0
                })
            )
        } catch (e) {
            console.log(`Failed to fetch metrics for ${metric}, URL: ${url}`)
        }
        return transformedResponse;
      }

}
import axios from 'axios';

export class InfluxDBHandler {

    constructor() {

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
        this.fetchDataForDay = this.fetchDataForDay.bind(this);
    }

    getBaseQuery = (metric, fromTime, toTime = null, timeDuration = '1h', operator) => `${this.baseQuery}&q=${this.getSelectQuery(operator, metric, fromTime, toTime, timeDuration)}`;

    getMultiOperatorQuery = (metric, fromTime, toTime, timeDuration = '1h', operator) => {
        var that = this;
        const queries = operator.reduce((a, q) => `${a}${that.getSelectQuery(q, metric, fromTime, toTime, timeDuration)}`, '');
        return `${this.baseQuery}&q=${queries}`
    }

    async fetchData(metric, fromTime, toTime = null, duration = '1h', operator = 'sum') {
        let url = '';
        if (typeof operator === 'string') {
            url = this.getBaseQuery(metric, fromTime, toTime, duration, operator);
        } else {
            url = this.getMultiOperatorQuery(metric, fromTime, toTime, duration, operator);
        }
        const response = await axios.get(url)

        return this.transformResponse(response, metric, url);

    }

    async fetchDataForDay(metric, time) {
        let url = this.getMetricForDay(metric, time);
        const response = await axios.get(url)

        return this.transformResponse(response, metric, url);
    }

    getSelectQuery = (operator, metric, fromTimestamp, toTimestamp, duration) => {
        let whereClause = `time > ${fromTimestamp}ms`
        if (!!toTimestamp) {
            whereClause = `${whereClause} AND time <= ${toTimestamp}ms`
        }
        return encodeURIComponent(`SELECT ${operator}("value") FROM "${metric}" WHERE ${whereClause} GROUP BY time(${duration}) fill(null);`);
    }

    getMetricForDay = (metric, timestamp) => `SELECT sum("value") FROM "${metric}" WHERE time >= ${timestamp}ms and time <= ${timestamp + 86400000}ms GROUP BY time(1d) fill(null)`

    transformResponse(response, metric, url) {
        let transformedResponse = [];
        try {
            for (let i = 0; i < response.data.results[0].series[0].values.length; i++) {
                const date = response.data.results[0].series[0].values[i][0];
                let value = response.data.results[0].series[0].values[i][1];
                if (response.data.results.length > 1) {
                    value = [];
                    for (let j = 0; j < response.data.results.length; j++) {
                        value.push(response.data.results[j].series[0].values[i][1]);
                    }
                }
                transformedResponse.push({
                    time: date,
                    value: value
                });
            }
        } catch (e) {
            console.log(`Failed to fetch metrics for ${metric}, URL: ${url}`);
        }
        return transformedResponse;
    }
}
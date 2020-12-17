import React, { Component } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'



export class DailyChart extends Component {
    state = { sorted: [] }

    componentDidMount(){
        axios.get('https://disease.sh/v3/covid-19/countries?sort=deaths')
            .then(res => this.setState({sorted: res.data }))
    }

    render() {
        return (
            <div>
                  <h1> hello world</h1>
            </div>
        )
    }
}



export default DailyChart
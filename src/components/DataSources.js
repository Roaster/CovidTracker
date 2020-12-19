import React, { Component } from 'react'
import axios from 'axios';

export class DataSources extends Component {

    render() {
        return (
            <div>
                <div>
                    <h2 style={{marginBottom:'10px', textAlign: "center", wordWrap: "normal", width:"260px"}}>Data Gathered From:</h2>
                    <a style={{textAlign: "center"}} href="https://disease.sh/"> APIs from disease.sh </a>
                    <br></br>
                    <a style={{textAlign: "center"}} href="https://disease.sh/v3/covid-19/countries?sort=deaths"> For Country-Specific Data </a>
                    <br></br>
                    <a style={{textAlign: "center"}} href="https://disease.sh/v3/covid-19/states"> For State-Specific Data </a>
                    <br></br>
                    <a style={{textAlign: "center"}} href="https://disease.sh/v3/covid-19/continents?sort=cases"> For Continental Data </a>
                    <br></br>
                    <a style={{textAlign: "center"}} href="https://disease.sh/v3/covid-19/historical/all?lastdays=all"> For Historical Data </a>
                </div>
            </div>
        )
    }
}

const state = {
    display: 'flex',
}

export default DataSources

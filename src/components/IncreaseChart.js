import React from 'react';  
import axios from 'axios'
import {Bar, Line} from 'react-chartjs-2'

class IncreaseChart extends React.Component {  
    state = {
        continentDiff: [],
    }
    componentDidMount() {
        const todayReq = axios.get('https://disease.sh/v3/covid-19/continents?sort=cases');
        const yesterdayReq = axios.get('https://disease.sh/v3/covid-19/continents?yesterday=1');
        Promise.all([todayReq, yesterdayReq])
            .then(([todayResults, yesterdayResults]) => {
                const todayData = todayResults.data;
                const yesterdayData = yesterdayResults.data;
                const yesterdayContinentToData = {};
                yesterdayData.forEach(data => {
                    yesterdayContinentToData[data.continent] = data;
                });
                const diffData = todayData.map(todayContinent => {
                    const continent = todayContinent.continent;
                    const yesterdayContinent = yesterdayContinentToData[continent];
                    console.log(continent, yesterdayContinent.continent);
                    return {
                        continent,
                        cases: todayContinent.cases - yesterdayContinent.cases,
                        deaths: todayContinent.deaths - yesterdayContinent.deaths,
                        recovered: todayContinent.recovered - yesterdayContinent.recovered,
                    };
                });
                console.log('diffData', diffData);
                this.setState({continentDiff: diffData});
            });
    }

    render(){  
        const continents = this.state.continentDiff;
       return(  
        <div style ={{width: "70%", margin: "50px auto", textAlign: "center"}}>
            <h1>Daily Changes</h1>
        <Bar 
            data= {{
            labels: continents.map(({continent})=> continent),
            datasets: [{
                data: continents.map(({cases})=>cases),
                label: "Confirmed",
                fill: false,
                borderColor: "#F00",
                backgroundColor: "#F00",
            },{
           
                data: continents.map(({deaths})=>deaths),
                    label: "Deaths",
                    fill: false,
                    borderColor: "black",
                    backgroundColor: "black",

                },{
                data: continents.map(({recovered})=>recovered),
                label: "Recovered",
                fill: false,
                borderColor: "green",
                backgroundColor: "green",
                }
            ]
            
            }
            
            }/> 

    </div>
    )  
}  
}  
  
export default IncreaseChart;
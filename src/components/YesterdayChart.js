import React from 'react';  
import axios from 'axios'
import {Bar} from 'react-chartjs-2'


class YesterdayChart extends React.Component {  
    state = {
        country: [],
       yesterday:[]

    }
    componentDidMount(){
        axios.get('https://disease.sh/v3/covid-19/continents?sort=cases')
        .then(res => this.setState({country: res.data}))
        axios.get('https://disease.sh/v3/covid-19/continents?yesterday=true&sort=cases')
        .then(res => this.setState({yesterday: res.data}))



       
   }
    render(){  

        
       return(  
        <div style= {{height:'650px', overflow:'auto',width: '370px' }}>
            <h2 style={{marginBottom:'10px', textAlign: "center"}}>Confirmed Cases, Recovered, Deaths from Previous Day </h2>
        <div style = {{display: 'auto', justifyContent: 'center'}}>    
        <Bar 
            data= {{
            labels: this.state.country.map(({continent})=> continent),
            datasets: [{
                data: this.state.yesterday.map(({cases})=>cases),
                label: "Previous day Confirmed",
                backgroundColor:"red",
                borderColor: "black",
            },{
           
                data: this.state.country.map(({cases})=>cases),
                    label: "Cofirmed",
                    backgroundColor:" green",
                    borderColor: "black",

                }
            ],

        }}/> 
        <Bar 
            data= {{
            labels: this.state.country.map(({continent})=> continent),
            datasets: [{
                data: this.state.yesterday.map(({deaths})=>deaths),
                label: "Previous day Deaths",
                backgroundColor:"gray",
                borderColor: "white",
            },{
           
                data: this.state.country.map(({deaths})=>deaths),
                    label: "death",
                    backgroundColor:" black",
                    borderColor: "white",

                }
            ],

        }}/> 
        <Bar 
            data= {{
            labels: this.state.country.map(({continent})=> continent),
            datasets: [{
                data: this.state.yesterday.map(({recovered})=>recovered),
                label: "Previous day Recovered",
                backgroundColor:"tan",
                borderColor: "black",
            },{
           
                data: this.state.country.map(({recovered})=>recovered),
                    label: "Recovered",
                    backgroundColor:" yellow",
                    borderColor: "black",

                }
            ],

        }}/> 
        
        </div>
    </div>
    )  
}  
}  
  
export default YesterdayChart;
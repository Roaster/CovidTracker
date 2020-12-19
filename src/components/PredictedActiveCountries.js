import React, { Component } from 'react'
import axios from 'axios';

export class PredictedActiveCountries extends Component {

    state = { 
        sorted: [] 
    }

    multiplyByTen(i) {
        return ((i*10).toLocaleString())
    }

    componentDidMount(){
        axios.get('https://disease.sh/v3/covid-19/countries?sort=deaths')
            .then(res => this.setState({sorted: res.data }))
    }

    render() {
        return (
            <div>
            <div style = {{background: "#bbb", borderRadius: "2%", padding: "10px"}}>
                <h2 style={{marginBottom:'10px', textAlign: "center", wordWrap: "normal", width:"260px"}}>Predicted Cases by Countries</h2>
                        <div style= {{height:'250px', overflow:'auto', width: '260px'}}>
                            {this.state.sorted.map((data, i) => (
                                <div key={i} style={country }>
                                <h4 >{data.country}</h4>
                                <h4 style={{marginLeft:'15px'}}>{this.multiplyByTen(parseInt(data.active))}</h4>
                                </div>
                            ))}
                        </div>
                        </div>
            </div>
        )
    }
}

const country = {
    display: 'flex',
}

export default PredictedActiveCountries

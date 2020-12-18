import React, { Component } from 'react'
import axios from 'axios';

export class ActiveCountries extends Component {

    state = { 
        sorted: [] 
    }

    componentDidMount(){
        axios.get('https://disease.sh/v3/covid-19/countries?sort=deaths')
            .then(res => this.setState({sorted: res.data }))
    }
    render() {
        return (
            <div>
            <div style = {{background: "#bbb", borderRadius: "2%", padding: "10px"}}>
                <h2 style={{marginBottom:'10px', textAlign: "center", wordWrap: "normal", width:"260px"}}>Active Cases by Countries</h2>
                        <div style= {{height:'250px', overflow:'auto', width: '260px'}}>
                            {this.state.sorted.map((data, i) => (
                                <div key={i} style={country }>
                                <h4 >{data.country}</h4>
                                <h4 style={{marginLeft:'15px'}}>{parseInt(data.active).toLocaleString()}</h4>
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

export default ActiveCountries

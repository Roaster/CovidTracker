import React, { Component } from 'react'
import axios from 'axios';

export class Countries extends Component {
    
    render() {
        return (
            <div >
            <div style = {{background: "#bbb", borderRadius: "2%", padding: "10px"}}>
                <h2 style={{marginBottom:'10px', textAlign: "center"}}>Countries by Cases</h2>
                        <div style= {{height:'250px', overflow:'auto',width: '260px' }} >
                            
                             {this.props.sorted.map((data, i) => (
                                <div key={i} style={country} onClick={(e) => this.props.handleCountryChange(data.country)} >
                                <h4 >{data.country}</h4>
                                <h4 style={{marginLeft:'15px'}}>{parseInt(data.cases).toLocaleString()}</h4>
                                </div>
                            )) }
                        </div>
                </div>
            </div>
        )        
    }
}

const country = {
    display: 'flex',
    
}

export default Countries

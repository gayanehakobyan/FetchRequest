import React from 'react';
import './List.css';



export default class Fetch extends React.Component{
  constructor(props) {
    super(props);
    this._header = ["title", "director", "producer", "description"];
    this.state={
     isLoading: true,
     contacts:null,
     error:null
    }
    
  }

  componentDidMount(){
    this.fetchData(); 
  }

  fetchData(){
    fetch("https://ghibliapi.herokuapp.com/films")
    .then(response =>response.json())
    .then(data=>this.setState({
      contacts:data,
      isLoading:false
    }))
    .catch(error=>this.setState({
      error:error,
      contacts:null,
      isLoading:false
    }))

  }


    render() {
      const {contacts, isLoading, error }=this.state

      console.log(this.state.error)

      return (

        <div>
        {
          isLoading==true ? <div id="loader"/> :null
        }
        {
          error? <div> Error </div> :null
        }
        {
          contacts== null ? null : (
            <table>
              <thead>
                <tr>
                {
                  this._header.map(key=>(
                    <th key={key}>{key}</th>
                  ))
                }
                </tr>
              </thead>
              <tbody>
                {
                  contacts.map(film=>(
                    <tr key={film.id}>
                    {
                      this._header.map((key, i)=>(
                        <td key={i}>
                          <div style={{
                            maxWidth:"200px",
                            overflow:"hidden",
                            // maxHeight:"100px",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis"
                          }} title={film[key]} >
                            {film[key] || "N/A"}
                          </div>
                        </td>
                      ))
                    }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
        }
        </div>
 
      )

     
  }
}

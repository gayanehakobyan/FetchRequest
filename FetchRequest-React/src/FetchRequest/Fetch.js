import React from 'react';
import './List.css';



export default class Fetch extends React.Component{
  constructor(props) {
    super(props);
    this.state={
     isLoading: true,
     contacts:[]
    }
    
  }

  componentDidMount(){
    this.fetchData(); 
  }

  fetchData(){
    fetch("https://ghibliapi.herokuapp.com/films")
    .then(response =>response.json())
    .then(data=>data.map(obj=>(
      {
        title:`${obj.title}`,
        release_date:`${obj.release_date}`,
        description: `${obj.description}`,
        producer:`${obj.producer}`,
        director: `${obj.director}`,
        id:`${obj.id}`,
      }
    )))
    .then(contacts=>this.setState({
      contacts,
      isLoading:false
    }))
    .catch(function(error,contacts) {
      console.log("Parsing faild", error);
      this.setState({
        contacts,
        isLoading:false,
      })
      this.render()  
    })

  }


    render() {
      const {isLoading, contacts}=this.state;
      return (
        <div className={`${!isLoading? document.getElementById('loader').style.display="none" : ""}`}>
        {console.log(isLoading)}
        <div className="inputs">
        {
            contacts.map(contact=>{
              return <div key={contact.title} className="infoTitle "> 
              {contact.title}
              </div> 
            })
        } 
        </div>

      <div className="inputs"> 
        {
            contacts.map(contact=>{
              return <div key={contact.release_date} className="infoDate"> 
                {contact.release_date}
              </div> 
            })
        } 
      </div>

      <div className="inputs">
        {
            contacts.map(contact=>{
              return <div key={contact.description} className="infoDescription">
               {contact.description}
               </div> 
            })
        } 
      </div>

      <div className="inputs"> 
        {
          contacts.map(contact=>{
            return <div key={contact.producer} className="infoProducer"> 
            {contact.producer}
            </div> 
          })
        } 
      </div>

      <div className="inputs">
      {
        contacts.map(contact=>{
          return <div key={contact.director} className="infoDirector"> 
           {contact.director}
          </div> 
        })
      } 
      </div>


      <div className="inputs">
      {
        contacts.map(contact=>{
          return <div i={contact.id} className="infoDirector">
            {contact.id}
           </div> 
        })
      }
      </div>
      <div id="loader">

     </div>

        </div>

      );
    }
  }


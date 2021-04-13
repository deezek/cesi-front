import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import App from '../../App';
import Banner from '../Banner'
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ressource: "",
      viewPdf:"",
      
    }
  }

  async componentDidMount() {
    console.log('select your file');

    const id = JSON.parse(window.sessionStorage.getItem('art'));
    console.log(id,"id")
    let ressourceResponse = await
      fetch(`http://localhost:1337/ressources/${id}`)

    if (ressourceResponse.status == 200) {
      let data = await ressourceResponse.json()
      this.setState({
        ressource: data,
        viewPdf:"http://localhost:1337"+data.fichier[0].url
      });
      console.log(data,"data")


    }
  }

  ecrireDate(date) {
    var listeJours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    var listeMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

    date = new Date(date)
    var nombre = date.getDate()
    var jour = listeJours[date.getDay()];
    var mois = listeMois[date.getMonth()];
    return nombre + " " + mois + " " + date.getFullYear()
  }
  afficherPDF(url){

    window.sessionStorage.setItem("pdf", url);
    return <App/>
  }

  render() {
    console.log(this.props.match.params.testvalue,"test")
    return (
      <div><Banner
      backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
      title=""
    />
      <article className="mt-90">

        <header className="text-center mb-40">
          <h3>
            {this.state.ressource.titre} 
          </h3>
          <div className="link-color-default fs-12">
      <time>{this.ecrireDate(this.state.ressource.created_at)}</time>
          </div>
        </header>

        {/* <a href="blog-single.html">
          
          <img className="rounded" src={this.state.urlPhoto} alt="..." />
        </a> */}

        
        {this.afficherPDF(this.state.viewPdf)}

          
      </article>
      </div>
    );
  };
}

export default Article;
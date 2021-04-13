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


class MesArticles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      citoyen:{ressources:[]},
      urlPhoto: "",
      tabRessource:[],
    }
  }

  async componentDidMount() {
    console.log('select your file');

    const id = 1
    let ressourceResponse = await
      fetch(`http://localhost:1337/citoyens/${id}`)

    if (ressourceResponse.status == 200) {
      let data = await ressourceResponse.json()
      this.setState({
        citoyen: data,
      });
      this.remplirTableau()

    }


  }
  remplirTableau(){
    let tab = []
    let tab2 = []
    for (const r of this.state.citoyen.ressources) {
      console.log(r,"ress")
      
        tab.push(r)
      
    }
    for (let i = tab.length-1;i >=0;i--) {
        tab2.push(tab[i])
    }
    console.log(tab2)
    this.setState({
      tabRessource:tab2,
    })
  }


  afficherImage(url){
    return "http://localhost:1337"+url
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
  lirePlus(id) {
    window.sessionStorage.setItem("art", id);
    window.location.replace("/article")
  }
  render() {
    return (
      <div>
        <Banner
          backgroundImage="url(assets/img/bg-gift.jpg)"
          title="Partageons nos idées, partageons notre avenir !"
          subtitle="L'endroit où sont stockés tous vos fichiers"
        />



        <main className="main-content bg-gray">
          <div className="row">
            <div className="col-12 col-lg-6 offset-lg-3">

              {

                this.state.tabRessource.map((ressource) => {
                  return <article className="mt-90">
                    
                    <header className="text-center mb-40">
                      <h3>
                        {ressource.titre}
                      </h3>
                      <div className="link-color-default fs-12">

                        <time>{this.ecrireDate(ressource.created_at)}</time>
                        <p className="text-center mt-40">
                        <button className="btn btn-primary btn-round" onClick={this.lirePlus.bind(this,ressource.id)}>afficher</button>
                        {/* <Link className="btn btn-primary btn-round" to="/article">Read more</Link> */}
                      </p>

                      </div>
                    </header>

                    
                  </article>

                })}


              <nav className="flexbox mt-50 mb-50">
                <a className="btn btn-white disabled">
                  <i className="ti-arrow-left fs-9 mr-4" /> Plus récent</a>
                <a className="btn btn-white" href="#">Plus ancien
            <i className="ti-arrow-right fs-9 ml-4" />
                </a>
              </nav>
            </div>
          </div>
        </main>

      </div>
    );
  };
}

export default MesArticles;
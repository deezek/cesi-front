 import React from 'react';
import Banner from './../Banner';
import Article from './../Article';
import Navbar from './../Navbar';
import { Link } from 'react-router-dom';
import App from '../../App';

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      ressources: [],
      tabRessource: []

    };


  }
  async componentDidMount() {

    let id = 1
    let pfSanteResponse = await
      fetch(`http://localhost:1337/ressources`)

    if (pfSanteResponse.status == 200) {
      let data = await pfSanteResponse.json()
      this.setState({
        ressources: data,
      });
      this.remplirTableau()

    }
  }

  remplirTableau(){
    let tab = []
    let tab2 = []
    for (const r of this.state.ressources) {
      if(r.diffusion!="perso"){
        tab.push(r)
      }
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
          subtitle="Lisez et postez les dernières actualités"
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
                        <p className="text">posté part {ressource.citoyen.prenom} {ressource.citoyen.nom}</p>


                      </div>
                    </header>
                  
                  <center><img className="rounded" src={this.afficherImage(ressource.categorie.image[0].url)}  /></center>

                    {/* <App /> */}
                    <div className="card-block">
                      
                      <p className="text-justify">{ressource.commentaire}</p>
                      <p className="text-center mt-40">
                        <button className="btn btn-primary btn-round" onClick={this.lirePlus.bind(this,ressource.id)}>lire +</button>
                        {/* <Link className="btn btn-primary btn-round" to="/article">Read more</Link> */}
                      </p>
                    </div>
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

export default Welcome;
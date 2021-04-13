import React from 'react';

const Footer = () => {
  return (

    <footer className="site-footer bg-dark text-center text-white text-lg-start">

<div class="container p-4">
  </div>
  <div class="row">
  <div class="col-lg-3 col-md-12 mb-4 mb-md-0"> 
  
  <img className="logo-default" src={`${process.env.PUBLIC_URL}/assets/img/logo-carre.png`} alt="logo" /> 
  </div>
  <div class="col-lg-3 col-md-12 mb-4 mb-md-0">
  <h5 class="text-uppercase" >Partagez votre experience !</h5>
  <p>
          Partagez votre experience via Ressource Relationelles, aidez nous à agrandire notre réseau de partage d'information
        </p>

  </div>
  <div class="col-lg-3 col-md-12 mb-4 mb-md-0">
  <h5 class="text-uppercase">Missions du Ministère</h5>
  <p>
  Le ministre des Solidarités et de la Santé prépare et met en œuvre la politique du Gouvernement dans les domaines de la solidarité, de la cohésion sociale, de la santé publique et de l’organisation du système de santé.
        </p>

  </div>
  <div class="col-lg-3 col-md-12 mb-4 mb-md-0"> 
  <h5 class="text-uppercase">Nous contacter</h5>
  <ul class="list-unstyled"> 
  <li>Tel: 00 00 00 00 00</li>
  <li>Mail: Info@rerelationelles.com</li>


  
  
  </ul>
 
  </div>

  </div>
  <div class="text-center p-3"></div>

  
  <div class="text-center p-3" style={{ backgroundColor: '#03989E' }} >
    © 2021 Copyright: Groupe Projet RIL - PERE Simon - GUERET Grégory - LUZURIC Erwan
    
  </div>
  
      {/*
      <div className="container">
        <div className="col col-lg-2"> </div>

        <div className="col-md-auto">  col-12 col-lg-6 offset-lg-3 
          <ul className="nav nav-primary nav-hero">
            <li className="nav-item">
              <img className="logo-default" src={`${process.env.PUBLIC_URL}/assets/img/logo-carre.png`} alt="logo" />
            </li>
          </ul>
        </div>
        <div>

        </div>
        <div className="col col-lg-2">



        </div>

      </div>

       */}
    </footer>
  )
}  

export default Footer; 
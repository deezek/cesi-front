import React from 'react';
import { validateAll } from 'indicative';
import Axios from 'axios';
import config from '../config/index';
import Banner from '../Banner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: []
    };


  }
  componentDidMount() {
    let dbUser = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    if (dbUser != null || dbUser != undefined) {
        this.props.history.push('/')
    }
    document.body.classList.add('account-page');
  }
  componentWillUnmount() {
    document.body.classList.remove('account-page');
  }
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    //console.log(this.state)
    // validating user data
    const data = this.state;
    const rules = {
      name: 'required|string',
      email: 'required|email',
      password: 'required|string|min:6|confirmed'
    };

    const messages = {
      required: 'The {{ field }} is required.',
      'password.confirmed': 'The password confirmation does not match.'
    }
        
    if (
        !(this.state.email.trim() === "")) {  

            var axios = require('axios');
            var raw = JSON.stringify({"username":this.state.name, 
                                      "email": this.state.email, 
                                      "password": this.state.password}
            );

            var config = {
              method: 'post',
              url: 'http://localhost:1337/auth/local/register',
              headers: { 
                'Content-Type': 'application/json'
              },
              data : raw
            };

            axios(config)
            .then((response) => {
              
              if (response.status == 200 && (response.data != null)) {

                //console.log(JSON.stringify(response.data));
                toast.success("Nous avons terminé votre inscription avec succès !", {
                });
              } else {
                //console.log(response.data);
                toast.error("Il y a une erreur, veuillez réessayer", {
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
     }
     else {
      toast.warn("Veillez à bien remplir tous les champs !", {
      });
  }
        
  }
  
  render() {
    return (
      <div><ToastContainer /><Banner
        backgroundImage="url(assets/img/bg-gift.jpg)"
        title="Bienvenue parmi-nous"
        subtitle="Inscrivez-vous"
      />
      
        <div className="mh-fullscreen bg-img center-vh p-20" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)` }}>
          <div className="card card-shadowed p-50 w-400 mb-0" style={{ maxWidth: '100%' }}>
            <h5 className="text-uppercase text-center">Création de compte</h5>
            <br />
            <br />
            
            <form className="form-type-material" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control" name="name" value={this.state.name} placeholder="Nom d'utilisateur" onChange={this.handleInputChange} />
                {
                  this.state.errors['name'] &&
                  <small className="text-danger">{this.state.errors['name']}</small>
                }
              </div>
              <div className="form-group">
                <input type="text" className="form-control" name="email" value={this.state.email} placeholder="Adresse Email" onChange={this.handleInputChange} />
                {
                  this.state.errors['email'] &&
                  <small className="text-danger">{this.state.errors['email']}</small>
                }
              </div>
              <div className="form-group">
                <input type="password" className="form-control" name="password" value={this.state.password} placeholder="Mot de passe" onChange={this.handleInputChange} />
                {
                  this.state.errors['password'] &&
                  <small className="text-danger">{this.state.errors['password']}</small>
                }
              </div>
              <div className="form-group">
                <input type="password" className="form-control" name="password_confirmation" placeholder="Mot de passe (confirmation)" onChange={this.handleInputChange} />
              </div>
              <br />
              <button className="btn btn-bold btn-block btn-primary" type="submit">Enregistrer</button>
            </form>
            <hr className="w-30" />
            <p className="text-center text-muted fs-13 mt-20">Vous avez déjà un compte?
    <a href="login.html"> Se connecter</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUp;
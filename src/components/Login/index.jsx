import React from 'react';
import Axios from 'axios';
import config from '../config/index';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends React.Component{
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      redirectToReferre: false,
      preserveLogin: true
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
  handleInputChange1 = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  handleInputChange2 = (event) => {
    this.setState({
      password: event.target.value
    })
  }
  handleSubmit = (event) =>{
    event.preventDefault();
    this.setState({
      isLoading: true,
      redirectToReferre: true
		});
    console.log(this.state)
    if(
      !(this.state.username.trim() && this.state.password.trim() === "")){

        var raw = JSON.stringify({
          "identifier": this.state.username,
          "password": this.state.password
        });
        var config = {
          method: 'post',
          url: 'http://localhost:1337/auth/local/',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : raw
        };
        
        Axios(config)
        .then( (response) =>{
          if (response.status == 200 && (response.data != null)) {

            this.props.history.push('/');
            console.log(JSON.stringify(response.data));
           
          }else{
            this.setState({
							isLoading: false
						})
            console.log(response.data);
                toast.error("Tentative de connexion échouée", {
                });
          }
        })
        .then((result) => {

					if (result != null) {
						this.setState({
							isLoading: false
						})
						toast.success("Vous avez été connecté à votre compte !")
						if (this.state.preserveLogin == true) {
              localStorage.setItem("user", JSON.stringify(
								{
									token: result.jwt,
									user: result.user,
									state: true
								}
							))
						} else {
							sessionStorage.setItem("user", JSON.stringify(
								{
									token: result.jwt,
									user: result.user,
									state: true
								}
							))
						}
            //window.location.assign('/Navbar');
						console.log(result);
					}
				})
        .catch(function (error) {
          console.log(error);
        });
      }else{
        toast.warn("Veillez à bien remplir tous les champs !", {
        });
      }
      
  }

  render(){
    return (

      <div className="content">
        <ToastContainer />
        <div className="mh-fullscreen bg-img center-vh p-20" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)`}}> 
            <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
        <h5 className="text-uppercase text-center">Connexion</h5>
        <br /><br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Username" onChange={this.handleInputChange1} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" onChange={this.handleInputChange2} />
          </div>
          <div className="form-group flexbox py-10">
            <label className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" defaultChecked />
              <span className="custom-control-indicator" />
              <span className="custom-control-description">Se souvenir de moi</span>
            </label>
            <a className="text-muted hover-primary fs-13" href="#">Mot de passe oublié ?</a>
          </div>
          <div className="form-group">
            <button className="btn btn-bold btn-block btn-primary" style={{ backgroundColor: '#03989E' }} type="submit">Connexion</button>
          </div>
        </form>
        <hr className="w-30" />
        <p className="text-center text-muted fs-13 mt-20">Pas encore de compte ?<Link to="/signup">S'inscrire</Link></p>
            </div>
          </div>
      </div>

    )
  }
}

export default Login;
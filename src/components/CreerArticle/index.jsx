import React from 'react';
import Banner from '../Banner';
import Axios from 'axios';
import axios from 'axios';

const selectDiffusion = [
  {
      label: "Amis",
      value: "Amis",
  },
  {
      label: "Tout le monde",
      value: "tout",
  },
  {
      label: "Personnel",
      value: "perso",
  }
]

class CreerArticle extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      categorieChoisi: "",
      title: "",
      content: "",
      diffusion: "",
      fichier: [],
      citoyen:"",
      idCitoyen:1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleChangeDiffusion = this.handleChangeDiffusion.bind(this)
  }
  async componentDidMount() {
    let pfSanteResponse = await
      fetch(`http://localhost:1337/categories`)

    if (pfSanteResponse.status == 200) {
      let data = await pfSanteResponse.json()
      this.setState({
        categories: data
      });
    }

    let response = await
      fetch(`http://localhost:1337/citoyens/${this.state.idCitoyen}`)

    if (response.status == 200) {
      let data = await response.json()
      this.setState({
        citoyen: data
      });
    }
  }

  handleChange(event) {
    this.setState({ categorieChoisi: event.target.value });
    console.log(event.target.value, "event")
  }
  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
    console.log(event.target.value, "event")
  }

  handleChangeContent(event) {
    this.setState({ content: event.target.value });
    console.log(event.target.value, "event")
  }

  handleChange2(event) {
    this.setState({ fichier: event.target.files[0] });
    console.log(event.target.files[0], "event")
  }
  handleChangeDiffusion(event){
    this.setState({ diffusion: event.target.value });
    console.log(event.target.value,"diffusion")
  }

  handleSumit = async () => {
    let cat = ""
    let tab = this.state.citoyen.ressources
    let fichierCreer = []
    console.log("création")

    const data = new FormData()
    data.append('files', this.state.fichier)

    let catResponse = await
      fetch(`http://localhost:1337/categories/${this.state.categorieChoisi}`)

    if (catResponse.status == 200) {
      cat = await catResponse.json()
      console.log(cat,"cat")
    }

    const response = await axios({
      method: 'post',
      url: 'http://localhost:1337/upload',
      data
    }).then(function (response) {
      //On traite la suite une fois la réponse obtenue 
      console.log(response.data[0], "reponse")
      fichierCreer = response.data[0]

    })
    const response2 = await axios({
      method: 'post',
      url: 'http://localhost:1337/ressources',
      data: {
        titre: this.state.title,
        commentaire: this.state.content,
        categorie: cat,
        diffusion: this.state.diffusion,
        fichier: fichierCreer,
        citoyen:this.state.citoyen
      }
    }).then(function (response2) {
      //On traite la suite une fois la réponse obtenue 
      console.log(response2.data, "reponse")
      tab.push(response2.data)

    })
    axios.put(`http://localhost:1337/citoyens/${this.state.idCitoyen}`, {
        ressources: tab
        })
            .then(response => {
                console.log(response, "reponse1");
            });
  }

  render() {
    return (
      <div>

        <Banner
          backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
          title="Écrire un article "
        />
        {/* END Header */}
        {/* Main container */}
        <main className="main-content">
          <section className="section">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-12">
                  <form className="p-30 bg-gray rounded" data-form="mailer" >
                    <div className="row">
                      <div className="form-group col-md-12 my-5">
                        <input type="file" className="form-control" onChange={this.handleChange2} />
                      </div>
                      <div className="form-group col-12 col-md-4">
                        <input className="form-control form-control-lg" type="text" name="name" placeholder="Titre" onChange={this.handleChangeTitle} />
                      </div>
                      <div className="form-group col-12 col-md-4">
                        <select className="form-control form-control-lg" name="categorie" id="categorie-select" onChange={this.handleChange}>
                          <option value="" >--choisir une catégorie--</option>
                          {this.state.categories.map((c) => {
                            return <option value={c.id}>{c.categorieName}</option>
                          })}
                        </select>
                      </div>
                      <div className="form-group col-12 col-md-4">
                        <select className="form-control form-control-lg" name="categorie" id="categorie-select" onChange={this.handleChangeDiffusion}>
                          <option value="" >--choisir la diffusion--</option>
                          {selectDiffusion.map((c) => {
                            return <option value={c.value}>{c.label}</option>
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea className="form-control form-control-lg" rows={4} placeholder="Extrait" name="message" defaultValue={""} onChange={this.handleChangeContent} />
                    </div>
                    <div className="text-center">
                      <button className="btn btn-lg btn-primary" style={{ backgroundColor: '#03989E' }} onClick={this.handleSumit.bind(this)}>Créer Article</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* END Main container */}
      </div>
    )
  }
}
export default CreerArticle;
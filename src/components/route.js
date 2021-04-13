// import React, { Component } from 'react';

// import ReactDOM from 'react-dom';
// //import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { BrowserRouter, Route, withRouter } from 'react-router-dom';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import Article from '../components/Article';
// import Article2 from '../components/Article2';
// import Accueil from './Welcome';
// import CreerArticle from './CreerArticle'
// import Welcome from './Welcome';

// //const Chart =  import('react-apexcharts');

// export const Routage = withRouter(({ location }) => {
//     return (
//         <div>
//             {
//                 location.pathname !== '/login' && location.pathname !== '/signup' &&
//                 <Navbar />
//             }

//             <Route path="/" exact component={Accueil} />
//             <Route path="/Article2" exact component={Article2} />
//             <Route path="/CreerArticle" exact component={CreerArticle} />
//             <Route component={Article} />
//             //

//             {
//                 location.pathname !== '/login' && location.pathname !== '/signup' &&
//                 <Footer />
//             }
//         </div>
//     );
// });
// ReactDOM.render(
//     <BrowserRouter>
//     <Routage />
//     </BrowserRouter>, document.getElementById('root'));





// export class Routage extends Component {

//     render() {
//         return (
//             <React.Fragment>
//                 <Router>
//                     <Switch>
//                         <div>
//                             {
//                                 location.pathname !== '/login' && location.pathname !== '/signup' &&
//                                 <Navbar />
//                             }

//                             <Route path="/" exact component={Accueil} />
//                             <Route path="/Article2" exact component={Article2} />
//                             <Route path="/CreerArticle" exact component={CreerArticle} />
//                             <Route component={Article} />

//                             {
//                                 location.pathname !== '/login' && location.pathname !== '/signup' &&
//                                 <Footer />
//                             }
//                         </div>

//                     </Switch>
//                 </Router>
//             </React.Fragment>

//         )
//     }

// }

// export default Routage;
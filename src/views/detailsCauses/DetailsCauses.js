import * as React from 'react';
import Button from '@mui/material/Button';
import CardsCible2 from '../../components/cardsCibles/CardsCible2';

import './DetailsCauses.css'



const imagesCible = [
    { id:1,
        image:"https://www.scidev.net/afrique-sub-saharienne/wp-content/uploads/sites/2/Items-distribution-for-disabled-people-main-996x567.jpg",
    titre:"VULNERABLE 1",
    text: " Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte."
  },
  {id:2,
    image:"https://img.lemde.fr/2020/05/04/464/0/3500/1750/1440/720/60/0/13e3861_GGG-SIB02_HEALTH-CORONAVIRUS-SAFRICA_0504_11.JPG",
    titre:"VULNERABLE 3",
    text: "Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte."
  },
  {id:3,
    image:"https://aho.org/wp-content/uploads/2019/03/a-1-1000x563.jpg",
    titre:"VULNERABLE 2",
    text: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500."
  },
  {id:4,
    image:"https://img.lemde.fr/2020/05/04/464/0/3500/1750/1440/720/60/0/13e3861_GGG-SIB02_HEALTH-CORONAVIRUS-SAFRICA_0504_11.JPG",
    titre:"VULNERABLE 3",
    text: "Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte."
  },
  {id:5,
    image:"https://aho.org/wp-content/uploads/2019/03/a-1-1000x563.jpg",
    titre:"VULNERABLE 2",
    text: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500."
  },
  ]


export default function DetailsCauses(){


    return(
        <duv className="details-causes-container">
            <section className="details-causes-section-details pt-5" >
                <div className="container pt-5">
                    <div className="row pt-5">
                        <div className="col-lg-6 col-md-5 col-sm-10 col-11">
                            <img className="img-fluid" alt="" src="https://ecowarriorprincess.net/wp-content/uploads/2015/11/Untitled-design-73.jpg" />
                        </div>
                        <div className="col-lg-6 col-md-7 col-sm-10 col-11">
                            <div className="row align-items-center">
                                <div className="col-md-10 col-12">
                                    <h2>
                                        titre vulnerabilité
                                    </h2>
                                </div>
                            </div>
                            <div className="row justify-content-start align-items-center">
                                <div className="col-12">
                                    <p>
                                    On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de
                                    </p>
                                </div>
                            </div>
                            <div className="row justify-content-start align-items-center">
                                <div className="col-md-6 col-10">
                                    <Button fullWidth variant="contained" size="large">
                                        Nous soutenir 
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-autres-causes">
                <div className="container">
                    <div className="row justify-content-start align-items-center">
                        <div className="col-xl-8 col-lg-9 col-md-10 col-sm-11">
                            <h1>
                                D'autres causes à soutenir
                            </h1>
                        </div>
                    </div>
                    <div className="row mt-md-5 mt-2 justify-content-center">
                        
                        {imagesCible.map((item,index) => {
                            return(
                                <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-sm-11 my-3">
                                    <CardsCible2 key={index} {...item} />
                                </div>
                             )
                             } )}
                        
                    </div>

                </div>
            </section>
        </duv>
        )
}
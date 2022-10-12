import React from "react";
// import {  Message, useToaster,Button, IconButton, ButtonGroup, Carousel,Panel } from 'rsuite';
// import anime from 'animejs/lib/anime.es.js';
import Button from '@mui/material/Button';
import OwlCarousel from 'react-owl-carousel';

import './Home.css';

import { useNavigate } from "react-router-dom";
// import CarouselHeader from "../../components/carouselHeader/CarouselHeader";
import CardsCible2 from "../../components/cardsCibles/CardsCible2";
import { useEffect } from "react";
import { Splitscreen } from "@mui/icons-material";
import FooterApp from "../../components/footer/FooterApp";
// import CardUserGive from "../../components/cardUserGive/CardUserGive";


const imagesCible = [
  {image:"https://www.scidev.net/afrique-sub-saharienne/wp-content/uploads/sites/2/Items-distribution-for-disabled-people-main-996x567.jpg",

  titre:"Les enfants handicap ",
  text: "Les parents cherchant de moyens financiers pour subvenir aux besoins de leurs familles vous demandent de l’aide"
},
{
  image:"https://img.lemde.fr/2020/05/04/464/0/3500/1750/1440/720/60/0/13e3861_GGG-SIB02_HEALTH-CORONAVIRUS-SAFRICA_0504_11.JPG",
  titre:"Aide financiere",
  text: "Les enfants handicap abandonnés par leurs familles ne trouvant pas de quoi manger vous demandent de l’aide Afin d’améliorer leurs conditions de vie."
 
},
{
  image:"https://information.tv5monde.com/sites/info.tv5monde.com/files/styles/large/public/assets/images/changement-climatique-ouganda.jpg",
  titre:"Acces à l'eau potable",
  text: "Aider la population à avoir un accès universel à l’eau potable."
},

]



function Home() {

  const navigate = useNavigate()
  // const text_title = "kone bonjour".split('')
  // console.log(text_title)
  // useEffect(()=>{

  // //   anime.timeline({loop: true})
  // //   .add({
  // //   targets: '.ml2 .letter',
  // //   scale: [4,1],
  // //   opacity: [0,1],
  // //   translateZ: 0,
  // //   easing: "easeInOutQuad",
  // //   duration: 950,
  // //   delay: (el, i) => 70*i
  // // })
  // // .add({
  // //       targets: '.ml2',
  // //       opacity: 0,
  // //       duration: 2000,
  // //       easing: "easeOutExpo",
  // //       delay: 1000
  // //     });
  // },[])

  return (
    <>
    <div className="home-container">

      <section className="home-carousel-container  ">
        <div className="container">
          <div className="row justify-content-center align-items-center text-center py-md-5 py-sm-3 py-2">
            <div className="col-md-10 col-sm-11 col-11" >
              <div className="home-header-text-container mx-auto">
                  <h1 >
                    Faire un don pour sauver des vies
                    Venez en aide aux personnes Vulnerables
                  </h1>
                  {/* <h1  className="ml2">
                    {text_title.map((item,index)=>{
                      return(
                        <span key={index} className="letter"> {item} </span>
                      )
                    })}
                  </h1> */}
                  <h5 className="mt-md-5" >Informons-nous sur les causes caritatives à travers toute l'Afrique</h5>
                 
              </div>

              <div className="home-carousel-bouton-container ">
                  {/* <button onClick={()=> navigate('/make_donation',{replace:true})} className="home-btn-don text-uppercase"  >
                    <span className="span-icon-heart" >
                      <i className="fa-solid fa-heart icon-heart"></i>
                    </span> 
                    Faites parler votre Générosité
                  </button> */}
                  
                  <Button 
                    className="home-btn-don text-uppercase px-md-5 px-2"
                    size="large"
                    onClick={()=> navigate('/make_donation',{replace:true})} 
                    variant="contained">
                    Faites parler votre Générosité
                  </Button>
                  
                </div>
                
            </div>

            {/* <div className="col-md-6 text-center mx-0  d-none d-md-block">
          
              <div className="header-image-container">
                <CarouselHeader imagesCible={imagesCible} />
              </div>

            </div>   */}
          </div>
            
          
        </div>
      </section>


      <section className="service-don my-5">
        {/* <div className="container py-2">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-9 col-md-10 col-sm-10">

                <div data-aos="zoom-in" className="section-tittle text-center mb-80">
                  <span> Vous pouvez venir en aide au personnes vulnerables de plusieurs façons</span>
                 
              </div>
            </div>
          </div>
        </div> */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-9 col-md-10 col-sm-10">
              <div className="how-give-title text-center mb-5">
                <h2> comment pouvez-vous venir en aides ?</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-around">
            <div  className="col-lg-4 col-md-6 col-sm-6 my-2">
              <div className="single-cat text-center mb-50">
                <div className="cat-icon">
                <span className="flaticon-null-1">
                <i className="fa-solid fa-money-bill"></i></span>
                </div>
                <div className="cat-cap">
                  <h5><span>Dons en Argents</span></h5>
                  <p>
                  les dons en Argents concernent les aides apportées aux personnes vulnerables sous forme d'une somme d'argent.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 my-2">
              <div className="single-cat text-center mb-50">
                <div className="cat-icon">
                <span className="flaticon-null-1">
                <i className="fa-solid fa-shirt"></i>
                </span>
                </div>
                <div className="cat-cap">
                  <h5><span>Dons en Natures</span></h5>
                  <p>
                  les dons en Natures concernent les aides apportées aux personnes vulnerables sous forme d'objets (matelas, bijoux ... ) .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-list-vulnerabilite pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-9 col-md-10 col-sm-10">

                <div  className="section-tittle text-center mb-80">
                  <span>Exprimez votre générosité</span>
                  <h2>Contribuer à l'amelioration des conditions de vie des personnes vulnerables </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto  home-card-cible-container ">
          <OwlCarousel className='owl-theme' responsive= {
               { 0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 3,
                },
            }}  center autoplay lazyLoad loop margin={10}  >
              {imagesCible.map((item,index) =>  <CardsCible2 key={index} {...item} /> )}
          </OwlCarousel>
        </div>
      </section>

   
      {/* <section className="section-info-donation-type bg-white">
        <div className="container">
          <div className="row justify-content-evenly align-items-center mb-md-5 mb-1">
            <div className="col-md-6 col-sm-6 col-11 text-center">
              <img
                className="img-fluid"
                alt="don-nature-section-info"
                src="https://img.freepik.com/free-vector/hand-drawn-clothing-donation-concept_52683-54708.jpg"
                />
            </div>
            <div className="col-md-6 col-sm-6 col-11">
                <h2>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </h2>
              <p className="pt-2" >Lorem ipsum dolor sit amet, consectetur adipisicing elit,mod tempor incididunt ut labore et dolore magna aliqua. Utnixm, quis nostrud exercitation ullamc.</p>
              <p>Lorem ipvsum dolor sit amext, consectetur adipisicing elit, smod tempor incididunt ut labore et dolore.</p>
            </div>
          </div>
          
          <div className="row justify-content-evenly align-items-center mt-md-5 mt-2 pt-5">
            <div className="col-md-6 col-sm-6 col-11">
                <h2>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </h2>
              <p className="pt-2" >Lorem ipsum dolor sit amet, consectetur adipisicing elit,mod tempor incididunt ut labore et dolore magna aliqua. Utnixm, quis nostrud exercitation ullamc.</p>
              <p>Lorem ipvsum dolor sit amext, consectetur adipisicing elit, smod tempor incididunt ut labore et dolore.</p>
            </div>
            <div className="col-md-6 col-sm-6 col-11 text-center">
              <img
                className="img-fluid"
                alt="don-nature-section-info"
                src="https://static.vecteezy.com/system/resources/thumbnails/006/916/149/small_2x/people-are-putting-money-in-the-donation-box-free-vector.jpg"
                />
            </div>
          </div>
        </div>
      </section> */}

      <section className="contact-us-container section-padding2">
        <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-10">
            <div className="about-caption">
              <div className="section-tittle">
                <h2>Notre mission</h2>
              </div>
              <p>
              Notre mission est de venir en aide aux personnes vulnerables en leurs permettant d'avoir acces aux soins médicaux , d'être en sécurité.
              </p>
              <p>L’accès à des soins de santé  et économiquement abordables est un droit fondamental de la personne humaine.</p>
            </div>
            <button>Nous comtacter</button>
          </div>
          <div className="col-lg-6 col-md-12">

          <div  className="contact-us-imgs ">
            <div className="contact-us-img-first mt-5 mt-lg-0">
            <img className="img-fluid" src="https://cdnuploads.aa.com.tr/uploads/Contents/2022/06/09/thumbs_b_c_69902d1a0ac4dfba29a9f29440004375.jpg" alt=""/>
            </div>
            {/* <div className="contact-us-img-second  d-none d-lg-block ">
            <img className="img-fluid" src="https://cdnuploads.aa.com.tr/uploads/Contents/2022/08/13/thumbs_b_c_7dff6d8b9c56857ee2ca4089c9dd0938.jpg" alt="" />
            </div> */}
          </div>
          </div>
        </div>
        </div>
      </section>


        {/* <div className="home-contactus py-5 text-center ">
            <div className="home-contactus-container">
              <div className="">
                <p>
                Vous avez des questions ou preocupations ?
                </p>
              </div>
              <div className="">
                <button className="home-contactus-btn">
                  Nous Contacter
                </button>
              </div>

            </div>
          </div> */}

    </div>
    <FooterApp />
    </>
  );
}

export default Home;

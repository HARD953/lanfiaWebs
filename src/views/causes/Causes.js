import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import OwlCarousel from 'react-owl-carousel';

import CardsCible2 from "../../components/cardsCibles/CardsCible2";
import "./Causes.css"
import { useState } from 'react';



const imagesCibleD = [
    { id:1,
        image:"https://www.scidev.net/afrique-sub-saharienne/wp-content/uploads/sites/2/Items-distribution-for-disabled-people-main-996x567.jpg",
    titre:"VULNERABLE 1",
    text: " Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte."
  },
  {id:2,
    image:"https://img.lemde.fr/2020/05/04/464/0/3500/1750/1440/720/60/0/13e3861_GGG-SIB02_HEALTH-CORONAVIRUS-SAFRICA_0504_11.JPG",
    titre:"Aide financiere",
    text: "Les enfants handicap abandonnés par leurs familles ne trouvant pas de quoi manger vous demandent de l’aide Afin d’améliorer leurs conditions de vie."
   
  },
  { id:3,
    image:"https://information.tv5monde.com/sites/info.tv5monde.com/files/styles/large/public/assets/images/changement-climatique-ouganda.jpg",
    titre:"Acces à l'eau potable",
    text: "Aider la population à avoir un accès universel à l’eau potable."
  },]
  

export default function Causes(){

    const [imagesCible, setImageCibles] = useState(imagesCibleD)
    const [inputSearch, setInputSearch] = useState('')

    const onChangeInputSearch= (e)=>{
        setInputSearch(e.target.value)
        let filterListDon = imagesCible.filter(item=> {
            if(!inputSearch){
                return imagesCibleD;
            }else if( item.titre.toLowerCase().includes(inputSearch.toLowerCase())) {
                return item
            }
    })
        setImageCibles(filterListDon)
    }

    return(
        <div className="causes-container">
            <section className="causes-header-section">
                {/* <OwlCarousel className='owl-theme' responsive= {
                    { 0: {
                            items: 1,
                        },
                        600: {
                            items: 1,
                        },
                        1000: {
                            items: 1,
                        },
                    }}  center autoplay lazyLoad loop margin={10}  > */}
                   <div className="item causes-item1">   
                    <div className="container">
                            <div className="row align-items-center causes-item-row">
                                <div className="col-xl-8 col-lg-8 col-md-9 col-sm-11">
                                    <h1>
                                    les differentes causes à soutenir
                                    </h1>
                                </div>
                            </div>
                        </div>
                   </div>
                   {/* <div className="item causes-item2">   
                    <div className="container">
                            <div className="row align-items-center">
                                <div className="col-xl-7 col-lg-7 col-md-8 col-sm-11">
                                    <h1>
                                        les causes
                                    </h1>
                                </div>
                            </div>
                        </div>
                   </div> 
                   <div className="item causes-item3">   
                    <div className="container">
                            <div className="row align-items-center">
                                <div className="col-xl-7 col-lg-7 col-md-8 col-sm-11">
                                    <h1>
                                        les causes
                                    </h1>
                                </div>
                            </div>
                        </div>
                   </div>
                 
                </OwlCarousel> */}
            </section>
            <section className="causes-recherche-section">
                <div className="container">
                    <div className="row py-md-5 py-3 justify-content-center align-items-center">
                        <div className="col-lg-8 col-md-8 col-sm-10 col-11">
                        <InputGroup 
                            value={inputSearch}
                            onChange={onChangeInputSearch}
                            size='lg'
                            inside >
                            <Input
                             placeholder="Rechercher une causes à soutenir " />
                            <InputGroup.Button>
                            <SearchIcon />
                            </InputGroup.Button>
                        </InputGroup>
                        </div>
                    </div>
                </div>
            </section>
            <section className="causes-liste-section">
                <div className="container">
                    <div className="row justify-content-start">
                        <div className="col-xl-8 col-lg-9 col-md-10 col-sm-11">
                            <h2 className="causes-list-title pt-5" >
                               la liste des causes
                            </h2>
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
        </div>
        );
}
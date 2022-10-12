import {lazy} from 'react'


//import routes
const HomePage = lazy(()=>import('./views/home/Home'));
// const MakeDonation = lazy(()=>import('./views/makeDonation/MakeDonation'));
const MyActions = lazy(()=>import('./views/myActions/MyActions'));
const SignIn = lazy(()=>import('./views/signIn/SignIn'));
const SignUp = lazy(()=>import('./views/signUp/SignUp'));
const Compte = lazy(()=>import('./views/compte/Compte'));
const RedirectAfterSignIn = lazy(()=>import('./components/redirectComponents/RedirectAfterSignIn'));
const TypeDons = lazy(()=>import('./views/makeDonation/TypeDon'));
// const Causes = lazy(()=>import('./views/causes/Causes'));
// const DetailsCauses = lazy(()=>import('./views/detailsCauses/DetailsCauses'));



const routes = [
    { path: '/', exact: true ,element: HomePage  , name: 'Accueil' ,private: false },
    // { path: '/make_donation' ,element: MakeDonation  , name: 'MakeDonation'  },
    { path: '/make_donation' ,element: TypeDons  , name: 'MakeDonation'  },
    // { path: '/causes' ,element: Causes  , name: 'Causes'  },
    // { path: '/causes_details/:idCause' ,element: DetailsCauses  , name: 'Causes Details'  },
    { path: '/my_actions' ,element: MyActions  , name: 'MyActions',private: true },
    { path: '/sign_in' ,element: SignIn  , name: 'SignIn' ,private: false },
    { path: '/sign_up' ,element: SignUp  , name: 'SignUp' ,private: false },
    { path: '/monprofil' ,element: Compte  , name: 'Mon Profil',private: true  },
    { path: '/redirect' ,element: RedirectAfterSignIn  , name: 'Redirection',private: false  }
]

export default routes;
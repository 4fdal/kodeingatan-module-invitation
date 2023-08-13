 <!-- Page loading styles-->
 <style>
     .page-loading {
         position: fixed;
         top: 0;
         right: 0;
         bottom: 0;
         left: 0;
         width: 100%;
         height: 100%;
         -webkit-transition: all .4s .2s ease-in-out;
         transition: all .4s .2s ease-in-out;
         background-color: #fff;
         opacity: 0;
         visibility: hidden;
         z-index: 9999;
     }

     .dark-mode .page-loading {
         background-color: #121519;
     }

     .page-loading.active {
         opacity: 1;
         visibility: visible;
     }

     .page-loading-inner {
         position: absolute;
         top: 50%;
         left: 0;
         width: 100%;
         text-align: center;
         -webkit-transform: translateY(-50%);
         transform: translateY(-50%);
         -webkit-transition: opacity .2s ease-in-out;
         transition: opacity .2s ease-in-out;
         opacity: 0;
     }

     .page-loading.active>.page-loading-inner {
         opacity: 1;
     }

     .page-loading-inner>span {
         display: block;
         font-family: 'Inter', sans-serif;
         font-size: 1rem;
         font-weight: normal;
         color: #6f788b;
     }

     .dark-mode .page-loading-inner>span {
         color: #fff;
         opacity: .6;
     }

     .page-spinner {
         display: inline-block;
         width: 2.75rem;
         height: 2.75rem;
         margin-bottom: .75rem;
         vertical-align: text-bottom;
         background-color: #d7dde2;
         border-radius: 50%;
         opacity: 0;
         -webkit-animation: spinner .75s linear infinite;
         animation: spinner .75s linear infinite;
     }

     .dark-mode .page-spinner {
         background-color: rgba(255, 255, 255, .25);
     }

     @-webkit-keyframes spinner {
         0% {
             -webkit-transform: scale(0);
             transform: scale(0);
         }

         50% {
             opacity: 1;
             -webkit-transform: none;
             transform: none;
         }
     }

     @keyframes spinner {
         0% {
             -webkit-transform: scale(0);
             transform: scale(0);
         }

         50% {
             opacity: 1;
             -webkit-transform: none;
             transform: none;
         }
     }
 </style>

 <!-- Import Google Font-->
 <link rel="preconnect" href="https://fonts.googleapis.com">
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"
     id="google-font">

 <!-- Styles -->
 <link rel="stylesheet" media="screen" href="{{ invitation_asset('landing_page') }}/vendor/swiper/swiper-bundle.min.css" />
 <link rel="stylesheet" media="screen" href="{{ invitation_asset('landing_page') }}/vendor/aos/dist/aos.css" />
 <!-- Main Theme Styles + Bootstrap-->
 <link rel="stylesheet" media="screen" href="{{ invitation_asset('landing_page') }}/css/theme.min.css">
 <!-- Customizer generated styles-->
 <style id="customizer-styles"></style>

 <header class="navbar navbar-expand-lg fixed-top">
     <div class="container"><a class="navbar-brand pe-sm-3" href="index.html"><span class="text-primary flex-shrink-0 me-2">
                 <svg version="1.1" width="35" height="32" viewBox="0 0 36 33" xmlns="http://www.w3.org/2000/svg">
                     <path fill="currentColor"
                         d="M35.6,29c-1.1,3.4-5.4,4.4-7.9,1.9c-2.3-2.2-6.1-3.7-9.4-3.7c-3.1,0-7.5,1.8-10,4.1c-2.2,2-5.8,1.5-7.3-1.1c-1-1.8-1.2-4.1,0-6.2l0.6-1.1l0,0c0.6-0.7,4.4-5.2,12.5-5.7c0.5,1.8,2,3.1,3.9,3.1c2.2,0,4.1-1.9,4.1-4.2s-1.8-4.2-4.1-4.2c-2,0-3.6,1.4-4,3.3H7.7c-0.8,0-1.3-0.9-0.9-1.6l5.6-9.8c2.5-4.5,8.8-4.5,11.3,0L35.1,24C36,25.7,36.1,27.5,35.6,29z">
                     </path>
                 </svg></span>Around</a>
         <div class="form-check form-switch mode-switch order-lg-2 me-3 me-lg-4 ms-auto" data-bs-toggle="mode">
             <input class="form-check-input" type="checkbox" id="theme-mode">
             <label class="form-check-label" for="theme-mode"><i class="ai-sun fs-lg"></i></label>
             <label class="form-check-label" for="theme-mode"><i class="ai-moon fs-lg"></i></label>
         </div>
         <!-- User signed in state. Account dropdown on screens > 576px-->
         <div class="dropdown nav d-none d-sm-block order-lg-3"><a class="nav-link d-flex align-items-center p-0"
                 href="account-settings.html#" data-bs-toggle="dropdown" aria-expanded="false"><img
                     class="border rounded-circle" src="{{ invitation_asset('landing_page') }}/img/avatar/01.jpg"
                     width="48" alt="Isabella Bocouse">
                 <div class="ps-2">
                     <div class="fs-xs lh-1 opacity-60">Hello,</div>
                     <div class="fs-sm dropdown-toggle">Isabella</div>
                 </div>
             </a>
             <div class="dropdown-menu dropdown-menu-end my-1">
                 <h6 class="dropdown-header fs-xs fw-medium text-muted text-uppercase pb-1">Account</h6><a
                     class="dropdown-item" href="account-overview.html"><i
                         class="ai-user-check fs-lg opacity-70 me-2"></i>Overview</a><a class="dropdown-item"
                     href="account-settings.html"><i class="ai-settings fs-lg opacity-70 me-2"></i>Settings</a><a
                     class="dropdown-item" href="account-billing.html"><i
                         class="ai-wallet fs-base opacity-70 me-2 mt-n1"></i>Billing</a>
                 <div class="dropdown-divider"></div>
                 <h6 class="dropdown-header fs-xs fw-medium text-muted text-uppercase pb-1">Dashboard</h6><a
                     class="dropdown-item" href="account-orders.html"><i
                         class="ai-cart fs-lg opacity-70 me-2"></i>Orders</a><a class="dropdown-item"
                     href="account-earnings.html"><i class="ai-activity fs-lg opacity-70 me-2"></i>Earnings</a><a
                     class="dropdown-item d-flex align-items-center" href="account-chat.html"><i
                         class="ai-messages fs-lg opacity-70 me-2"></i>Chat<span
                         class="badge bg-danger ms-auto">4</span></a><a class="dropdown-item"
                     href="account-favorites.html"><i class="ai-heart fs-lg opacity-70 me-2"></i>Favorites</a>
                 <div class="dropdown-divider"></div><a class="dropdown-item" href="account-signin.html"><i
                         class="ai-logout fs-lg opacity-70 me-2"></i>Sign out</a>
             </div>
         </div>
         <button class="navbar-toggler ms-sm-3" type="button" data-bs-toggle="collapse"
             data-bs-target="#navbarNav"><span class="navbar-toggler-icon"></span></button>
         <nav class="collapse navbar-collapse" id="navbarNav">
             <ul class="navbar-nav navbar-nav-scroll me-auto" style="--ar-scroll-height: 520px;">
                 <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="account-settings.html#"
                         data-bs-toggle="dropdown" aria-expanded="false">Landings</a>
                     <div class="dropdown-menu overflow-hidden p-0">
                         <div class="d-lg-flex">
                             <div class="mega-dropdown-column pt-1 pt-lg-3 pb-lg-4">
                                 <ul class="list-unstyled mb-0">
                                     <li><a class="dropdown-item" href="index.html">Template Intro Page</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 rounded-3 rounded-start-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/landings.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-mobile-app-showcase.html">Mobile App
                                             Showcase</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/mobile-app.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-product.html">Product Landing</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/product-landing.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-saas-v1.html">SaaS v.1</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/saas-1.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-saas-v2.html">SaaS v.2</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/saas-2.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-saas-v3.html">SaaS v.3<span
                                                 class="text-danger fs-xs ms-2">New</span></a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/saas-3.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-shop.html">Shop Homepage</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/shop-homepage.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-marketing-agency.html">Marketing
                                             Agency</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/marketing-agency.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-creative-agency.html">Creative
                                             Agency</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/creative-agency.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-conference.html">Conference
                                             (Event)<span class="text-danger fs-xs ms-2">New</span></a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/conference.jpg);"></span>
                                     </li>
                                 </ul>
                             </div>
                             <div class="mega-dropdown-column pb-2 pt-lg-3 pb-lg-4">
                                 <ul class="list-unstyled mb-0">
                                     <li><a class="dropdown-item" href="landing-web-studio.html">Web Studio</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/web-studio.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-corporate.html">Corporate</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/corporate.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-business-consulting.html">Business
                                             Consulting</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/business-consulting.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-coworking-space.html">Coworking
                                             Space</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/coworking.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-yoga-studio.html">Yoga Studio</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/yoga-studio.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-influencer.html">Influencer<span
                                                 class="text-danger fs-xs ms-2">New</span></a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/influencer.jpg);"></span>
                                     </li>
                                     <li><a class="dropdown-item" href="landing-blog.html">Blog Homepage</a><span
                                             class="mega-dropdown-column position-absolute top-0 end-0 h-100 bg-size-cover bg-repeat-0 zindex-2 opacity-0"
                                             style="background-image: url({{ invitation_asset('landing_page') }}/img/megamenu/blog-homepage.jpg);"></span>
                                     </li>
                                 </ul>
                             </div>
                             <div class="mega-dropdown-column position-relative border-start zindex-3"></div>
                         </div>
                     </div>
                 </li>
                 <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="account-settings.html#"
                         data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">Pages</a>
                     <ul class="dropdown-menu">
                         <li class="dropdown"><a class="dropdown-item dropdown-toggle" href="account-settings.html#"
                                 data-bs-toggle="dropdown" aria-expanded="false">Portfolio</a>
                             <ul class="dropdown-menu">
                                 <li><a class="dropdown-item" href="portfolio-list-v1.html">List View v.1</a></li>
                                 <li><a class="dropdown-item" href="portfolio-list-v2.html">List View v.2</a></li>
                                 <li><a class="dropdown-item" href="portfolio-grid-v1.html">Grid View v.1</a></li>
                                 <li><a class="dropdown-item" href="portfolio-grid-v2.html">Grid View v.2</a></li>
                                 <li><a class="dropdown-item" href="portfolio-slider.html">Slider View</a></li>
                                 <li><a class="dropdown-item" href="portfolio-single-v1.html">Single Project v.1</a>
                                 </li>
                                 <li><a class="dropdown-item" href="portfolio-single-v2.html">Single Project v.2</a>
                                 </li>
                             </ul>
                         </li>
                         <li class="dropdown"><a class="dropdown-item dropdown-toggle" href="account-settings.html#"
                                 data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                             <ul class="dropdown-menu">
                                 <li><a class="dropdown-item" href="shop-catalog.html">Catalog (Listing)</a></li>
                                 <li><a class="dropdown-item" href="shop-single.html">Product Page</a></li>
                                 <li><a class="dropdown-item" href="shop-checkout.html">Checkout</a></li>
                             </ul>
                         </li>
                         <li class="dropdown"><a class="dropdown-item dropdown-toggle" href="account-settings.html#"
                                 data-bs-toggle="dropdown" aria-expanded="false">Blog</a>
                             <ul class="dropdown-menu">
                                 <li><a class="dropdown-item" href="blog-grid-sidebar.html">Grid View with Sidebar</a>
                                 </li>
                                 <li><a class="dropdown-item" href="blog-grid.html">Grid View no Sidebar</a></li>
                                 <li><a class="dropdown-item" href="blog-list-sidebar.html">List View with Sidebar</a>
                                 </li>
                                 <li><a class="dropdown-item" href="blog-list.html">List View no Sidebar</a></li>
                                 <li><a class="dropdown-item" href="blog-single-v1.html">Single post v.1</a></li>
                                 <li><a class="dropdown-item" href="blog-single-v2.html">Single post v.2</a></li>
                                 <li><a class="dropdown-item" href="blog-single-v3.html">Single post v.3</a></li>
                             </ul>
                         </li>
                         <li class="dropdown"><a class="dropdown-item dropdown-toggle" href="account-settings.html#"
                                 data-bs-toggle="dropdown" aria-expanded="false">About</a>
                             <ul class="dropdown-menu">
                                 <li><a class="dropdown-item" href="about-agency.html">About - Agency</a></li>
                                 <li><a class="dropdown-item" href="about-product.html">About - Product</a></li>
                             </ul>
                         </li>
                         <li class="dropdown"><a class="dropdown-item dropdown-toggle" href="account-settings.html#"
                                 data-bs-toggle="dropdown" aria-expanded="false">Services</a>
                             <ul class="dropdown-menu">
                                 <li><a class="dropdown-item" href="services-v1.html">Services v.1</a></li>
                                 <li><a class="dropdown-item" href="services-v2.html">Services v.2</a></li>
                                 <li><a class="dropdown-item" href="services-v3.html">Services v.3</a></li>
                             </ul>
                         </li>
                         <li><a class="dropdown-item" href="pricing.html">Pricing</a></li>
                         <li class="dropdown"><a class="dropdown-item dropdown-toggle" href="account-settings.html#"
                                 data-bs-toggle="dropdown" aria-expanded="false">Contacts</a>
                             <ul class="dropdown-menu">
                                 <li><a class="dropdown-item" href="contacts-v1.html">Contacts v.1</a></li>
                                 <li><a class="dropdown-item" href="contacts-v2.html">Contacts v.2</a></li>
                                 <li><a class="dropdown-item" href="contacts-v3.html">Contacts v.3</a></li>
                             </ul>
                         </li>
                         <li class="dropdown"><a class="dropdown-item dropdown-toggle" href="account-settings.html#"
                                 data-bs-toggle="dropdown" aria-expanded="false">Specialty Pages</a>
                             <ul class="dropdown-menu">
                                 <li><a class="dropdown-item" href="404-v1.html">404 Error v.1</a></li>
                                 <li><a class="dropdown-item" href="404-v2.html">404 Error v.2</a></li>
                                 <li><a class="dropdown-item" href="404-v3.html">404 Error v.3</a></li>
                             </ul>
                         </li>
                     </ul>
                 </li>
                 <li class="nav-item dropdown"><a class="nav-link dropdown-toggle active"
                         href="account-settings.html#" data-bs-toggle="dropdown" data-bs-auto-close="outside"
                         aria-expanded="false">Account</a>
                     <ul class="dropdown-menu">
                         <li class="dropdown"><a class="dropdown-item dropdown-toggle" href="account-settings.html#"
                                 data-bs-toggle="dropdown" aria-expanded="false">Auth pages</a>
                             <ul class="dropdown-menu">
                                 <li><a class="dropdown-item" href="account-signin.html">Sign In</a></li>
                                 <li><a class="dropdown-item" href="account-signup.html">Sign Up</a></li>
                                 <li><a class="dropdown-item" href="account-signinup.html">Sign In / Up</a></li>
                                 <li><a class="dropdown-item" href="account-password-recovery.html">Password
                                         Recovery</a></li>
                             </ul>
                         </li>
                         <li><a class="dropdown-item" href="account-overview.html">Overview</a></li>
                         <li><a class="dropdown-item" href="account-settings.html">Settings</a></li>
                         <li><a class="dropdown-item" href="account-billing.html">Billing</a></li>
                         <li><a class="dropdown-item" href="account-orders.html">Orders</a></li>
                         <li><a class="dropdown-item" href="account-earnings.html">Earnings</a></li>
                         <li><a class="dropdown-item" href="account-chat.html">Chat (Messages)</a></li>
                         <li><a class="dropdown-item" href="account-favorites.html">Favorites (Wishlist)</a></li>
                     </ul>
                 </li>
                 <li class="nav-item"><a class="nav-link" href="components/typography.html">UI Kit</a></li>
                 <li class="nav-item"><a class="nav-link" href="docs/getting-started.html">Docs</a></li>
                 <!-- User signed in state. Account dropdown on screens > 576px-->
                 <li class="nav-item dropdown d-sm-none border-top mt-2 pt-2"><a class="nav-link"
                         href="account-settings.html#" data-bs-toggle="dropdown" aria-expanded="false"><img
                             class="border rounded-circle"
                             src="{{ invitation_asset('landing_page') }}/img/avatar/01.jpg" width="48"
                             alt="Isabella Bocouse">
                         <div class="ps-2">
                             <div class="fs-xs lh-1 opacity-60">Hello,</div>
                             <div class="fs-sm dropdown-toggle">Isabella</div>
                         </div>
                     </a>
                     <div class="dropdown-menu">
                         <h6 class="dropdown-header fs-xs fw-medium text-muted text-uppercase pb-1">Account</h6><a
                             class="dropdown-item" href="account-overview.html"><i
                                 class="ai-user-check fs-lg opacity-70 me-2"></i>Overview</a><a class="dropdown-item"
                             href="account-settings.html"><i
                                 class="ai-settings fs-lg opacity-70 me-2"></i>Settings</a><a class="dropdown-item"
                             href="account-billing.html"><i
                                 class="ai-wallet fs-base opacity-70 me-2 mt-n1"></i>Billing</a>
                         <h6 class="dropdown-header fs-xs fw-medium text-muted text-uppercase pt-3 pb-1">Dashboard</h6>
                         <a class="dropdown-item" href="account-orders.html"><i
                                 class="ai-cart fs-lg opacity-70 me-2"></i>Orders</a><a class="dropdown-item"
                             href="account-earnings.html"><i
                                 class="ai-activity fs-lg opacity-70 me-2"></i>Earnings</a><a
                             class="dropdown-item d-flex align-items-center" href="account-chat.html"><i
                                 class="ai-messages fs-lg opacity-70 me-2"></i>Chat<span
                                 class="badge bg-danger ms-3">4</span></a><a class="dropdown-item"
                             href="account-favorites.html"><i class="ai-heart fs-lg opacity-70 me-2"></i>Favorites</a>
                         <div class="dropdown-divider"></div><a class="dropdown-item" href="account-signin.html"><i
                                 class="ai-logout fs-lg opacity-70 me-2"></i>Sign out</a>
                     </div>
                 </li>
             </ul>
         </nav>
     </div>
 </header>

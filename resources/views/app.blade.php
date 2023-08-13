<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title> {{ config('invitation.landing_page.app_name', 'KI Invitation') }} | @yield('title')</title>

    <!-- SEO Meta Tags-->
    @include('invitation::partials.seo')

    <!-- Viewport-->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Favicon and Touch Icons-->
    @include('invitation::partials.favicon')

    <!-- Theme mode & Page Loading-->
    @include('invitation::partials.top-script')

    <!-- Vendor styles-->
    @include('invitation::partials.style')

    <!-- Google Tag Manager-->
    @include('invitation::partials.google-analytics')

</head>
<!-- Body-->

<body class="bg-secondary">
    <!-- Google Tag Manager (noscript)-->
    <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WKV3GT5" height="0" width="0"
            style="display: none; visibility: hidden;"></iframe>
    </noscript>
    <!-- Page loading spinner-->
    <div class="page-loading active">
        <div class="page-loading-inner">
            <div class="page-spinner"></div><span>Loading...</span>
        </div>
    </div>
    <!-- Customizer -->
    @include('invitation::partials.customize')

    <!-- Page wrapper-->
    <main class="page-wrapper">
        <!-- Navbar. Remove 'fixed-top' class to make the navigation bar scrollable with the page-->
        @include('invitation::partials.navbar')
        <!-- Page content-->
        @yield('content')

    </main>
    <!-- Footer-->
    @include('invitation::partials.footer')

    <!-- Back to top button--><a class="btn-scroll-top" href="landing-marketing-agency.html#top" data-scroll>
        <svg viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" stroke-width="1.5"
                stroke-miterlimit="10"></circle>
        </svg><i class="ai-arrow-up"></i></a>

    @include('invitation::partials.bottom-script')
</body>

</html>

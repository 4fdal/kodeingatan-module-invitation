@extends('invitation::app')

@section('title')
    Welcome
@endsection

@section('content')
    <!-- Hero-->
    @include('invitation::partials.hero')
    <!-- Services-->
    @include('invitation::partials.service')
    <!-- Tools-->
    @include('invitation::partials.tools')
    <!-- Benefits-->
    @include('invitation::partials.benefits')
    <!-- About-->
    @include('invitation::partials.about')
    <!-- Testimonials (Slider)-->
    @include('invitation::partials.testimonials')
    <!-- Case studies-->
    @include('invitation::partials.case-studies')
    <!-- Team-->
    @include('invitation::partials.team')
    <!-- Resources (Blog)-->
    @include('invitation::partials.blog')
@endsection

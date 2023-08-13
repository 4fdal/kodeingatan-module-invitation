@extends('invitation::app')

@section('title')
    Buat undangan
@endsection

@section('content')
    <div class="container py-5 mt-4 mt-lg-5 mb-lg-4 my-xl-5">
        <div class="row pt-sm-2 pt-lg-0">
            <!-- Page content-->
            <div class="col-lg-12 pt-4 pb-2 pb-sm-4">
                <!-- Home icon -->
                <nav aria-label="breadcrumb my-0">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="#"><i class="ai-home fs-base"></i></a>
                        </li>
                        <li class="breadcrumb-item"><a href="#">Account</a></li>
                        <li class="breadcrumb-item"><a href="#">Invitation</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Create</li>
                    </ol>
                </nav>
                <h1 class="h2 mb-4">Undangan Online</h1>

                <!-- Basic info-->
                <section class="card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
                    <div class="card-body">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-primary btn-sm rounded-pill position-fixed">
                                <i class="ai-play"></i>
                            </button>
                        </div>
                        <div class="d-flex align-items-center mt-sm-n1 pb-4 mb-0 mb-lg-1 mb-xl-3">
                            <i class="ai-dashboard text-primary lead pe-1 me-2"></i>
                            <h2 class="h4 mb-0">Content undangan</h2>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="dropdown"><a
                                    class="d-flex flex-column justify-content-end position-relative overflow-hidden rounded-circle bg-size-cover bg-position-center flex-shrink-0"
                                    href="account-settings.html#" data-bs-toggle="dropdown" aria-expanded="false"
                                    style="width: 80px; height: 80px; background-image: url({{ invitation_asset('landing_page') }}/img/avatar/02.jpg);"><span
                                        class="d-block text-light text-center lh-1 pb-1"
                                        style="background-color: rgba(0,0,0,.5)"><i class="ai-camera"></i></span></a>
                                <div class="dropdown-menu my-1"><a class="dropdown-item fw-normal"
                                        href="account-settings.html#"><i
                                            class="ai-camera fs-base opacity-70 me-2"></i>Upload new photo</a><a
                                        class="dropdown-item text-danger fw-normal" href="account-settings.html#"><i
                                            class="ai-trash fs-base me-2"></i>Delete photo</a></div>
                            </div>
                            <div class="ps-3">
                                <h3 class="h6 mb-1">Profile picture</h3>
                                <p class="fs-sm text-muted mb-0">PNG or JPG no bigger than 1000px wide and tall.</p>
                            </div>
                        </div>
                        <div class="row g-3 g-sm-4 mt-0 mt-lg-2">
                            <div class="col-sm-6">
                                <label class="form-label" for="fn">First name</label>
                                <input class="form-control" type="text" value="Isabella" id="fn">
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label" for="ln">Last name</label>
                                <input class="form-control" type="text" value="Bocouse" id="ln">
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label" for="email">Email address</label>
                                <input class="form-control" type="email" value="bocouse@example.com" id="email">
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label" for="phone">Phone <span
                                        class='text-muted'>(optional)</span></label>
                                <input class="form-control" type="tel"
                                    data-format="{&quot;numericOnly&quot;: true, &quot;delimiters&quot;: [&quot;+1 &quot;, &quot; &quot;, &quot; &quot;], &quot;blocks&quot;: [0, 3, 3, 2]}"
                                    placeholder="+1 ___ ___ __" id="phone">
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label" for="country">Country</label>
                                <select class="form-select" id="country">
                                    <option value="" selected disabled>Select country</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="USA">USA</option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label" for="language">Language</label>
                                <select class="form-select" id="language">
                                    <option value="" selected disabled>Select language</option>
                                    <option value="English">English</option>
                                    <option value="Français">Français</option>
                                    <option value="Deutsch">Deutsch</option>
                                    <option value="Italiano">Italiano</option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label" for="timezone">Time zone</label>
                                <select class="form-select" id="timezone">
                                    <option value="" selected disabled>Select time zone</option>
                                    <option value="AST">Atlantic Standard Time (AST)</option>
                                    <option value="EST">Eastern Standard Time (EST)</option>
                                    <option value="CST">Central Standard Time (CST)</option>
                                    <option value="MST">Mountain Standard Time (MST)</option>
                                    <option value="PST">Pacific Standard Time (PST)</option>
                                    <option value="AKST">Alaskan Standard Time (AKST)</option>
                                    <option value="HST">Hawaii-Aleutian Standard Time (HST)</option>
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label" for="currency">Currency</label>
                                <select class="form-select" id="currency">
                                    <option value="" selected disabled>Select currency</option>
                                    <option value="usd">$ USD</option>
                                    <option value="eur">€ EUR</option>
                                    <option value="ukp">£ UKP</option>
                                    <option value="jpy">¥ JPY</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label class="form-label" for="bio">Bio</label>
                                <textarea class="form-control" rows="5" placeholder="Add a bio" id="bio"></textarea>
                            </div>
                            <div class="col-12 d-sm-flex align-items-center pt-sm-2 pt-md-3">
                                <div class="form-label text-muted mb-2 mb-sm-0 me-sm-4">Gender:</div>
                                <div class="form-check form-check-inline mb-0">
                                    <input class="form-check-input" type="radio" name="gender" value="Male"
                                        id="male">
                                    <label class="form-check-label" for="male">Male</label>
                                </div>
                                <div class="form-check form-check-inline mb-0">
                                    <input class="form-check-input" type="radio" name="gender" value="Female" checked
                                        id="female">
                                    <label class="form-check-label" for="female">Female</label>
                                </div>
                                <div class="form-check form-check-inline mb-0">
                                    <input class="form-check-input" type="radio" name="gender" value="Other"
                                        id="other">
                                    <label class="form-check-label" for="other">Other</label>
                                </div>
                            </div>
                            <div class="col-12 d-sm-flex align-items-center">
                                <div class="form-label text-muted mb-2 mb-sm-0 me-sm-4">Communication:</div>
                                <div class="form-check form-check-inline mb-0">
                                    <input class="form-check-input" type="checkbox" name="communication" value="Email"
                                        checked id="c-email">
                                    <label class="form-check-label" for="c-email">Email</label>
                                </div>
                                <div class="form-check form-check-inline mb-0">
                                    <input class="form-check-input" type="checkbox" name="communication" value="Phone"
                                        id="c-phone">
                                    <label class="form-check-label" for="c-phone">Phone</label>
                                </div>
                            </div>
                            <div class="col-12 d-flex justify-content-end pt-3">
                                <button class="btn btn-secondary" type="button">Cancel</button>
                                <button class="btn btn-primary ms-3" type="button">Save changes</button>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- Password-->
                <section class="card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
                    <div class="card-body">
                        <div class="d-flex align-items-center pb-4 mt-sm-n1 mb-0 mb-lg-1 mb-xl-3"><i
                                class="ai-lock-closed text-primary lead pe-1 me-2"></i>
                            <h2 class="h4 mb-0">Password change</h2>
                        </div>
                        <div class="row align-items-center g-3 g-sm-4 pb-3">
                            <div class="col-sm-6">
                                <label class="form-label" for="current-pass">Current password</label>
                                <div class="password-toggle">
                                    <input class="form-control" type="password" value="hidden@password"
                                        id="current-pass">
                                    <label class="password-toggle-btn" aria-label="Show/hide password">
                                        <input class="password-toggle-check" type="checkbox"><span
                                            class="password-toggle-indicator"></span>
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-6"><a class="d-inline-block fs-sm fw-semibold text-decoration-none mt-sm-4"
                                    href="account-password-recovery.html">Forgot password?</a></div>
                            <div class="col-sm-6">
                                <label class="form-label" for="new-pass">New password</label>
                                <div class="password-toggle">
                                    <input class="form-control" type="password" id="new-pass">
                                    <label class="password-toggle-btn" aria-label="Show/hide password">
                                        <input class="password-toggle-check" type="checkbox"><span
                                            class="password-toggle-indicator"></span>
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label" for="confirm-pass">Confirm new password</label>
                                <div class="password-toggle">
                                    <input class="form-control" type="password" id="confirm-pass">
                                    <label class="password-toggle-btn" aria-label="Show/hide password">
                                        <input class="password-toggle-check" type="checkbox"><span
                                            class="password-toggle-indicator"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="alert alert-info d-flex my-3 my-sm-4"><i class="ai-circle-info fs-xl me-2"></i>
                            <p class="mb-0">Password must be minimum 8 characters long - the more, the better.</p>
                        </div>
                        <div class="d-flex justify-content-end pt-3">
                            <button class="btn btn-secondary" type="button">Cancel</button>
                            <button class="btn btn-primary ms-3" type="button">Save changes</button>
                        </div>
                    </div>
                </section>
                <!-- Notifications-->
                <section class="card border-0 py-1 p-md-2 p-xl-3 p-xxl-4 mb-4">
                    <div class="card-body">
                        <div class="d-flex align-items-center pb-4 mt-sm-n1 mb-0 mb-lg-1 mb-xl-3"><i
                                class="ai-bell text-primary lead pe-1 me-2"></i>
                            <h2 class="h4 mb-0">Notifications</h2>
                            <button class="btn btn-sm btn-outline-secondary ms-auto" type="button"
                                data-bs-toggle="checkbox" data-bs-target="#checkboxList">Toggle all</button>
                        </div>
                        <div id="checkboxList">
                            <div class="form-check form-switch d-flex pb-md-2 mb-4">
                                <input class="form-check-input flex-shrink-0" type="checkbox" checked id="product-sold">
                                <label class="form-check-label ps-3 ps-sm-4" for="product-sold"><span
                                        class="h6 d-block mb-2">Product sold notifications</span><span
                                        class="fs-sm text-muted">Send an email when someone purchased one of my
                                        products</span></label>
                            </div>
                            <div class="form-check form-switch d-flex pb-md-2 mb-4">
                                <input class="form-check-input flex-shrink-0" type="checkbox" checked
                                    id="product-update">
                                <label class="form-check-label ps-3 ps-sm-4" for="product-update"><span
                                        class="h6 d-block mb-2">Product update notifications</span><span
                                        class="fs-sm text-muted">Send an email when a product I've purchased is
                                        updated</span></label>
                            </div>
                            <div class="form-check form-switch d-flex pb-md-2 mb-4">
                                <input class="form-check-input flex-shrink-0" type="checkbox" id="product-comment">
                                <label class="form-check-label ps-3 ps-sm-4" for="product-comment"><span
                                        class="h6 d-block mb-2">Product comment notifications</span><span
                                        class="fs-sm text-muted">Send an email when someone comments on one of my
                                        products</span></label>
                            </div>
                            <div class="form-check form-switch d-flex pb-md-2 mb-4">
                                <input class="form-check-input flex-shrink-0" type="checkbox" checked
                                    id="product-review">
                                <label class="form-check-label ps-3 ps-sm-4" for="product-review"><span
                                        class="h6 d-block mb-2">Product review notifications</span><span
                                        class="fs-sm text-muted">Send an email when someone leaves a review with his/her
                                        rating</span></label>
                            </div>
                        </div>
                        <div class="form-check form-switch d-flex">
                            <input class="form-check-input flex-shrink-0" type="checkbox" disabled id="daily-summary">
                            <label class="form-check-label opacity-100 ps-3 ps-sm-4" for="daily-summary"><span
                                    class="h6 text-muted d-block mb-2">Daily summary emails<span
                                        class="badge bg-faded-danger text-danger ms-3">Only for premium</span></span><span
                                    class="fs-sm text-muted">Send an email when someone leaves a review with his/her
                                    rating</span></label>
                        </div>
                    </div>
                </section>
                <!-- Delete account-->
                <section class="card border-0 py-1 p-md-2 p-xl-3 p-xxl-4">
                    <div class="card-body">
                        <div class="d-flex align-items-center pb-4 mt-sm-n1 mb-0 mb-lg-1 mb-xl-3"><i
                                class="ai-trash text-primary lead pe-1 me-2"></i>
                            <h2 class="h4 mb-0">Delete account</h2>
                        </div>
                        <div class="alert alert-warning d-flex mb-4"><i class="ai-triangle-alert fs-xl me-2"></i>
                            <p class="mb-0">When you delete your account, your public profile will be deactivated
                                immediately. If you change your mind before the 14 days are up, sign in with your email and
                                password, and we'll send a link to reactivate account. <a href='account-settings.html#'
                                    class='alert-link'>Learn more</a></p>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="confirm">
                            <label class="form-check-label text-dark fw-medium" for="confirm">Yes, I want to delete my
                                account</label>
                        </div>
                        <div class="d-flex flex-column flex-sm-row justify-content-end pt-4 mt-sm-2 mt-md-3">
                            <button class="btn btn-danger" type="button"><i class="ai-trash ms-n1 me-2"></i>Delete
                                account</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
@endsection

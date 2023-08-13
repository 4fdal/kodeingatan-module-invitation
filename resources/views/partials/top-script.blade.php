<!-- Theme mode-->
<script>
    let mode = window.localStorage.getItem('mode'),
        root = document.getElementsByTagName('html')[0];
    if (mode !== undefined && mode === 'dark') {
        root.classList.add('dark-mode');
    } else {
        root.classList.remove('dark-mode');
    }
</script>

<!-- Page loading scripts-->
<script>
    (function() {
        window.onload = function() {
            const preloader = document.querySelector('.page-loading');
            preloader.classList.remove('active');
            setTimeout(function() {
                preloader.remove();
            }, 1500);
        };
    })();
</script>

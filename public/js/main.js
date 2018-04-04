let side_nav = document.querySelector('.sidenav');
M.Sidenav.init(side_nav, {});

let dismiss_btns = document.querySelectorAll('.dismiss_button');

if (dismiss_btns.length > 0) {
    dismiss_btns.forEach(function (dismiss_btn) {
        dismiss_btn.addEventListener('click', function (evt) {
            evt.target.closest('.dismiss_target').style.display = 'none';
        });
    });
}

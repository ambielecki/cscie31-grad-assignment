let date_picker = document.querySelector('.datepicker');
M.Datepicker.init(date_picker, {
    minDate : new Date(2001, 8, 1),
    maxDate : new Date(2014, 7, 31),
    defaultDate : new Date(2011, 0, 1),
    format: 'yyyy-mm-dd',
});

let delete_btn = document.querySelector('#delete_btn');
if (delete_btn) {
    delete_btn.addEventListener('click', function (evt) {
        let player_id = evt.target.dataset.player_id;
        document.querySelector('#player_form').setAttribute('action', '/players/delete/' + player_id);
    });
}
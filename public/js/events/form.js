let date_picker = document.querySelector('.datepicker');
M.Datepicker.init(date_picker, {
    format: 'yyyy-mm-dd',
});

let time_picker = document.querySelector('.timepicker');
M.Timepicker.init(time_picker, {});

let form_select = document.querySelector('select');
M.FormSelect.init(form_select, {});

let delete_btn = document.querySelector('#delete_btn');
if (delete_btn) {
    delete_btn.addEventListener('click', function (evt) {
        let event_id = evt.target.dataset.event_id;
        document.querySelector('#event_form').setAttribute('action', '/events/delete/' + event_id);
    });
}

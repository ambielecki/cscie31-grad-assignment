let form_select = document.querySelector('select');
M.FormSelect.init(form_select, {});

let delete_btn = document.querySelector('#delete_btn');
if (delete_btn) {
    delete_btn.addEventListener('click', function (evt) {
        let user_id = evt.target.dataset.user_id;
        document.querySelector('#event_form').setAttribute('action', '/users/delete/' + user_id);
    });
}
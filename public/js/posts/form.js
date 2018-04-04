tinymce.init({
    selector : '#content'
});

let delete_btn = document.querySelector('#delete_btn');
if (delete_btn) {
    delete_btn.addEventListener('click', function (evt) {
        let post_id = evt.target.dataset.post_id;
        document.querySelector('#post_form').setAttribute('action', '/posts/delete/' + post_id);
    });
}
$(function() {
    $('#btn-save').click(function(e) {
        var editor = $(".editor-markdown")[0].contentWindow.editor;
        console.log(editor.session.getValue());
    });
});
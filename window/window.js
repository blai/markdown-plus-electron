$(function() {
    $('#saveButton').click(function(e) {
        var editor = $(".editor")[0].contentWindow.editor;
        console.log(editor.session.getValue());
    });
});
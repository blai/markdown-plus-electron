$(function() {
    $('#saveButton').click(function(e) {
        $('.ace_line').each(function(i, element) {
            console.log($(element).text());
        });
    });
});
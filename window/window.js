var remote = require('electron').remote;
var dialog = remote.dialog;
var browserWindow = remote.BrowserWindow;
var fs = require('fs');

var editor;
$(() => {
    $('.editor-markdown').on('load', () => {
        editor = $('.editor-markdown')[0].contentWindow.editor;
    });

    $('.btn-save').click((event) => {
        saveAsFile();
    });

    resizeEditor();
});

$(window).resize(function() {
    resizeEditor();
});

const resizeEditor = () => {
    $('.editor-markdown').css('height', String($(window).height() - $('.editor-controll').height()) + 'px');
}

const saveAsFile = () => {
    var fwin = browserWindow.getFocusedWindow();
    dialog.showSaveDialog(
        fwin, {
            properties: ['openFile'],
            filters: [{
                name: 'markdownファイル',
                extensions: ['md']
            }]
        },
        // セーブ用ダイアログが閉じられた後のコールバック関数
        (fileName) => {
            if (fileName) {
                var data = editor.session.getValue();
                writeFile(fileName, data);
            }
        }
    );
}

const writeFile = (path, data) => {
    fs.writeFile(path, data, (error) => {
        if (error != null) {
            alert('error: ' + error);
            return;
        }
    });
}
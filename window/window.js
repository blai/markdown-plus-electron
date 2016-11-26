const remote = require('electron').remote;
const dialog = remote.dialog;
const browserWindow = remote.BrowserWindow;
const fs = require('fs');

class EditorWindow {
    constructor() {
        this.editor = null;
        $(() => {
            this.fileManager = new FileManager();

            $('.editor-markdown').on('load', () => {
                this.editor = $('.editor-markdown')[0].contentWindow.editor;
            });

            $('.btn-save').click((event) => {
                this.fileManager.saveAsFile(this.editor.session.getValue());
            });

            this.resizeEditor();
        });

        $(window).resize(() => {
            this.resizeEditor();
        });
    }

    resizeEditor() {
        $('.editor-markdown').css('height', String($(window).height() - $('.editor-controll').height()) + 'px');
    }
}

const editorWindow = new EditorWindow();
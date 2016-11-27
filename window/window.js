const electron = require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer;
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
                this.fileManager.saveAsFile(this.getEditorText());
            });

            this.resizeEditor();
            this.registerGlobalMessage();
        });

        $(window).resize(() => {
            this.resizeEditor();
        });
    }

    registerGlobalMessage() {
        // 非同期でメインプロセスからのメッセージを受信する
        ipc.on('global-shortcut-message', (sender, message) => {
            switch (message) {
                case 'save-as':
                    {
                        this.fileManager.saveAsFile(this.getEditorText());
                        break;
                    }
            }
        });
    }

    resizeEditor() {
        $('.editor-markdown').css('height', String($(window).height() - $('.editor-controll').height()) + 'px');
    }

    getEditorText() {
        return this.editor.session.getValue();
    }
}

const editorWindow = new EditorWindow();
const electron = require('electron');
const remote = electron.remote;
const ipc = electron.ipcRenderer;
const dialog = remote.dialog;
const browserWindow = remote.BrowserWindow;
const fs = require('fs');

class EditorWindow {
    constructor() {
        this.filePath = null;
        this.editor = null;
        $(() => {
            this.fileManager = new FileManager();

            $('.editor-markdown').on('load', () => {
                this.editor = $('.editor-markdown')[0].contentWindow.editor;
            });

            $('.btn-save').click((event) => {
                this.save();
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
                    this.save();
                    break;
            }
        });
    }

    resizeEditor() {
        $('.editor-markdown').css('height', String($(window).height() - $('.editor-controll').height()) + 'px');
    }

    save() {
        if (this.fileManager.lastSaveFilePath == null) {
            this.fileManager.saveAsFile(this.getEditorText());
        } else {
            this.fileManager.writeFile(this.fileManager.lastSaveFilePath, this.getEditorText());
        }
    }

    getEditorText() {
        return this.editor.session.getValue();
    }
}

const editorWindow = new EditorWindow();
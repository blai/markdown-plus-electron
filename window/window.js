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

            $('#editor-controll-chart-line').click(event, () => {
                this.editor.insert('```chart\n{\n  "type": "line",\n  "data": {\n    "labels": [\n      "January",\n      "February",\n      "March",\n      "April",\n      "May",\n      "June",\n      "July"\n    ],\n    "datasets": [\n      {\n        "label": "# of bugs",\n        "fill": false,\n        "lineTension": 0.1,\n        "backgroundColor": "rgba(75,192,192,0.4)",\n        "borderColor": "rgba(75,192,192,1)",\n        "borderCapStyle": "butt",\n        "borderDash": [],\n        "borderDashOffset": 0,\n        "borderJoinStyle": "miter",\n        "pointBorderColor": "rgba(75,192,192,1)",\n        "pointBackgroundColor": "#fff",\n        "pointBorderWidth": 1,\n        "pointHoverRadius": 5,\n        "pointHoverBackgroundColor": "rgba(75,192,192,1)",\n        "pointHoverBorderColor": "rgba(220,220,220,1)",\n        "pointHoverBorderWidth": 2,\n        "pointRadius": 1,\n        "pointHitRadius": 10,\n        "data": [\n          65,\n          59,\n          80,\n          81,\n          56,\n          55,\n          40\n        ],\n        "spanGaps": false\n      }\n    ]\n  },\n  "options": {}\n}\n```');
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
                case 'open':
                    this.open();
                    break;
                case 'save-as':
                    this.save();
                    break;
            }
        });
    }

    resizeEditor() {
        $('.editor-markdown').css('height', String($(window).height() - $('.editor-controll').height()) + 'px');
    }

    open() {
        this.fileManager.openFile()
            .then((text) => {
                this.editor.session.setValue(text);
            });
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
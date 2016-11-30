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

            this.resizeEditor();
            this.setButtonClick();
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

    setButtonClick() {
        $('#editor-controll-chart-line').click(event, () => {
            this.editor.insert('```chart\n{\n  "type": "line",\n  "data": {\n    "labels": [\n      "January",\n      "February",\n      "March",\n      "April",\n      "May",\n      "June",\n      "July"\n    ],\n    "datasets": [\n      {\n        "label": "# of bugs",\n        "fill": false,\n        "lineTension": 0.1,\n        "backgroundColor": "rgba(75,192,192,0.4)",\n        "borderColor": "rgba(75,192,192,1)",\n        "borderCapStyle": "butt",\n        "borderDash": [],\n        "borderDashOffset": 0,\n        "borderJoinStyle": "miter",\n        "pointBorderColor": "rgba(75,192,192,1)",\n        "pointBackgroundColor": "#fff",\n        "pointBorderWidth": 1,\n        "pointHoverRadius": 5,\n        "pointHoverBackgroundColor": "rgba(75,192,192,1)",\n        "pointHoverBorderColor": "rgba(220,220,220,1)",\n        "pointHoverBorderWidth": 2,\n        "pointRadius": 1,\n        "pointHitRadius": 10,\n        "data": [\n          65,\n          59,\n          80,\n          81,\n          56,\n          55,\n          40\n        ],\n        "spanGaps": false\n      }\n    ]\n  },\n  "options": {}\n}\n```');
        });

        $('#editor-controll-chart-bar').click(event, () => {
            this.editor.insert('```chart\n{\n  "type": "bar",\n  "data": {\n  "labels": [\n    "Red",\n    "Blue",\n    "Yellow",\n    "Green",\n    "Purple",\n    "Orange"\n  ],\n  "datasets": [\n    {\n    "label": "# of Votes",\n    "data": [\n      12,\n      19,\n      3,\n      5,\n      2,\n      3\n    ],\n    "backgroundColor": [\n      "rgba(255, 99, 132, 0.2)",\n      "rgba(54, 162, 235, 0.2)",\n      "rgba(255, 206, 86, 0.2)",\n      "rgba(75, 192, 192, 0.2)",\n      "rgba(153, 102, 255, 0.2)",\n      "rgba(255, 159, 64, 0.2)"\n    ],\n    "borderColor": [\n      "rgba(255,99,132,1)",\n      "rgba(54, 162, 235, 1)",\n      "rgba(255, 206, 86, 1)",\n      "rgba(75, 192, 192, 1)",\n      "rgba(153, 102, 255, 1)",\n      "rgba(255, 159, 64, 1)"\n    ],\n    "borderWidth": 1\n    }\n  ]\n  },\n  "options": {}\n}\n```');
        });

        $('#editor-controll-chart-rader').click(event, () => {
            this.editor.insert('```chart\n{\n  "type": "radar",\n  "data": {\n    "labels": [\n      "Eating",\n      "Drinking",\n      "Sleeping",\n      "Designing",\n      "Coding",\n      "Cycling",\n      "Running"\n    ],\n    "datasets": [\n      {\n        "label": "My First dataset",\n        "backgroundColor": "rgba(179,181,198,0.2)",\n        "borderColor": "rgba(179,181,198,1)",\n        "pointBackgroundColor": "rgba(179,181,198,1)",\n        "pointBorderColor": "#fff",\n        "pointHoverBackgroundColor": "#fff",\n        "pointHoverBorderColor": "rgba(179,181,198,1)",\n        "data": [\n          65,\n          59,\n          90,\n          81,\n          56,\n          55,\n          40\n        ]\n      },\n      {\n        "label": "My Second dataset",\n        "backgroundColor": "rgba(255,99,132,0.2)",\n        "borderColor": "rgba(255,99,132,1)",\n        "pointBackgroundColor": "rgba(255,99,132,1)",\n        "pointBorderColor": "#fff",\n        "pointHoverBackgroundColor": "#fff",\n        "pointHoverBorderColor": "rgba(255,99,132,1)",\n        "data": [\n          28,\n          48,\n          40,\n          19,\n          96,\n          27,\n          100\n        ]\n      }\n    ]\n  },\n  "options": {}\n}\n```');
        });

        $('#editor-controll-chart-polar').click(event, () => {
            this.editor.insert('```chart\n{\n  "type": "polarArea",\n  "data": {\n    "datasets": [\n      {\n        "data": [\n          11,\n          16,\n          7,\n          3,\n          14\n        ],\n        "backgroundColor": [\n          "#FF6384",\n          "#4BC0C0",\n          "#FFCE56",\n          "#E7E9ED",\n          "#36A2EB"\n        ],\n        "label": "My dataset"\n      }\n    ],\n    "labels": [\n      "Red",\n      "Green",\n      "Yellow",\n      "Grey",\n      "Blue"\n    ]\n  },\n  "options": {}\n}\n```');
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
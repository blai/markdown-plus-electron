class FileManager {
    constructor() {

    }

    saveAsFile(text) {
        var fwin = browserWindow.getFocusedWindow();
        dialog.showSaveDialog(
            fwin, {
                properties: ['openFile'],
                filters: [{
                    name: 'markdownファイル',
                    extensions: ['md']
                }]
            },
            // 保存ダイアログが閉じられた後のコールバック関数
            (filePath) => {
                if (filePath) {
                    this.writeFile(filePath, text);
                }
            }
        );
    }

    writeFile(filepath, data) {
        fs.writeFile(filepath, data, (error) => {
            if (error != null) {
                alert('書き込み中にエラーが発生: ' + error);
                return;
            }
        });
    }
}
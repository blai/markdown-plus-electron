class FileManager {
    constructor() {
        this.lastSaveFilePath = null;
    }

    openFile() {
        return new Promise((resolve, reject) => {
            let fwin = browserWindow.getFocusedWindow();
            dialog.showSaveDialog(
                fwin, {
                    properties: ['openFile'],
                    filters: [{
                        name: 'markdownファイル',
                        extensions: ['md']
                    }]
                },
                // 開くダイアログが閉じられた後のコールバック関数
                (filePath) => {
                    if (filePath) {
                        // TODO: 書き込みモードでダイアログが起動してしまう
                        fs.open(filePath, 'a+', (err, fd) => {
                            if (error != null) {
                                reject(err);
                                return;
                            }

                            console.log(fd);
                            resolve();
                        });
                    } else {
                        reject('file not found');
                    }
                }
            );
        });
    }

    saveAsFile(text) {
        let fwin = browserWindow.getFocusedWindow();
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
                    this.lastSaveFilePath = filePath;
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
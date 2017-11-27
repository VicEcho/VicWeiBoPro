var id,editor;
$(document).ready(function () {
    var E = window.wangEditor;
    editor = new E('#editor');
    // editor.customConfig.pasteFilterStyle = false;
    // editor.customConfig.uploadImgShowBase64 = true ;  // 使用 base64 保存图片
    editor.create();
});

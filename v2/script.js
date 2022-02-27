/*
Cublium v2 beta
変数型_temp_変数名
*/
var blank = function blank() {

}

var lastof = function lastof(arg1) {
    return arg1[arg1.length - 1]
}

var siblingof = function siblingof(arg2) {
    return arg2.parentNode.children()
}

document.onmousedown = function(event) {

    status_isclicking = true
    dom_mousedown_target = event.target

    //cubliumイベントを実行
    run('trigger_mousedown');

    if (dom_mousedown_target.classList.contains('class_codeblock_source_mono')) { //右側のコピー元からコピーする時

        dom_dragging = dom_mousedown_target.cloneNode(true) //子要素もcloneするからdeep=trues
        dom_dragging.classList.remove('class_codeblock_source_mono')
        dom_codingspace.appendChild(dom_dragging)
        
        status_isdragging_codeblock_mono = true

        dom_dragging.style.left = dom_mousedown_target.style.left //初期位置の設定
        dom_dragging.style.top = dom_mousedown_target.style.top
        dom_dragging.style.zIndex = -1

        int_mousedown_offsetX = dom_dragging.style.left-event.pageX //相対位置の測定
        int_mousedown_offsetY = dom_dragging.style.up-event.pageY
    } //ここまで"右側のコピー元からコピーする時"

    //ここはonmousedownです

    if (dom_mousedown_target.classList.contains('class_codeblock_source_trigger')) { //右側のコピー元からトリガーをコピーする時

        dom_dragging = dom_mousedown_target.cloneNode(true) //子要素もcloneするからdeep=true
        dom_dragging.classList.remove('class_codeblock_source_trigger')
        dom_codingspace.appendChild(dom_dragging)
        
        status_isdragging_codeblock_mono = true

        dom_dragging.style.left = dom_mousedown_target.style.left //初期位置の設定
        dom_dragging.style.top = dom_mousedown_target.style.top
        dom_dragging.style.zIndex = -1

        int_mousedown_offsetX = dom_dragging.style.left-event.pageX //相対位置の測定
        int_mousedown_offsetY = dom_dragging.style.up-event.pageY
    } //ここまで"右側のコピー元からコピーする時"

    //ここはonmousedownです

    if (dom_mousedown_target.classList.contains('class_codeblock_mono')) { //ブロックを移動する時


        dom_dragging = dom_mousedown_target.cloneNode(true) //クローン
        dom_dragging.classList.remove('class_codeblock_mono')
        dom_dragging.removeEventListener('mouseenter', blank)
        dom_dragging.removeEventListener('mouseleave', blank)
        dom_codingspace.appendChild(dom_dragging)
        
        status_isdragging_codeblock_mono = true

        dom_dragging.style.left = dom_mousedown_target.style.left //初期位置の設定
        dom_dragging.style.top = dom_mousedown_target.style.top
        dom_dragging.style.zIndex = -1

        if (siblingof(array_dom_mousedown_target).length==0) { //掃除
            dom_mousedown_target.parentNode.remove()
        }else {
            lastof(siblingof(dom_mousedown_target)).classList.add('class_codeblock_connectable') //末っ子に結着を戻す。この機構は今後改善したい。
        }
        dom_mousedown_target.remove()
    } //ここまで"ブロックを移動する時"
}





document.onmousemove = function() {
    //cubliumイベントを実行
    run('trigger_mousemove');

    if (status_isclicking && ! status_ready2connect) { //ドラッグ中の位置移動(位置固定がない場合)
        dom_dragging.style.left = event.pageX - int_mousedown_offsetX
        dom_dragging.style.up = event.pageY - int_mousedown_offsetY
    }
}





document.onmouseup = function() {

    status_isclicking = false

    //cubliumイベントを実行
    run('trigger_mouseup');

    if (status_isdragging_codeblock_mono) { //ドラッグの終了
        dom_stopdragging = dom_dragging.cloneNode()
        dom_stopdragging.addEventListener('mouseenter', mouseenterfunction)
        dom_stopdragging.addEventListener('mouseleave', mouseleavefunction)
        dom_stopdragging.classList.add('class_codeblock_mono')

        if (status_ready2connect) {

            dom_codeblock_toconnect.classList.remove('class_codeblock_connectable')
            dom_stopdragging.classList.add('class_codeblock_connectable')
            dom_codeblock_toconnect.parentNode.appendChild(dom_stopdragging) //末っ子として追加

        }else {
            work.appendChild(dom_stopdragging);
        }
    } //ここまでドラッグの終了

    if (status_isdragging_codeblock_trigger) { //トリガードラッグの終了
        dom_stopdragging = dom_dragging.cloneNode()
        dom_stopdragging.addEventListener('mouseenter', mouseenterfunction)
        dom_stopdragging.addEventListener('mouseleave', mouseleavefunction)
        dom_stopdragging.classList.add('class_codeblock_trigger')
        dom_stopdragging.classList.add('class_codeblock_connectable')

        var dom_runninggroup = document.createElement('div')
        dom_runninggroup.name = dom_stopdragging.name //トリガーの継承を行う必要がある。
        dom_runninggroup.classList.remove('block')
        
        dom_runninggroup.appendChild(dom_stopdragging)
        work.appendChild(dom_runninggroup)
    } //ここまでドラッグの終了

}

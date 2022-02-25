/*
Cublium v2 beta
変数型_temp_変数名
*/
var blank = function blank() {

}

document.onmousedown = function(event) {

    status_isclicking = true
    dom_mousedown_target = event.target

    //cubliumイベントを実行
    run('trigger_mousedown');

    if (dom_mousedown_target.classList.contains('class_codeblock_source')) { //右側のコピー元からコピーする時

        dom_dragging = dom_mousedown_target.cloneNode(true) //子要素もcloneするからdeep=true
        dom_dragging.id = 'id_temp_movingdom'
        dom_dragging.classList.remove('class_codeblock_source')
        dom_codingspace.appendChild(dom_dragging)
        
        status_isdragging_codeblock_mono = true

        dom_dragging = document.getElementById("id_temp_movingdom") //再定義
        put.removeAttribute("id");

        dom_dragging.style.left = dom_mousedown_target.style.left //初期位置の設定
        dom_dragging.style.top = dom_mousedown_target.style.top
        dom_dragging.style.zIndex = -1

        int_mousedown_offsetX = dom_dragging.style.left-event.pageX //相対位置の測定
        int_mousedown_offsetY = dom_dragging.style.up-event.pageY
    } //ここまで"右側のコピー元からコピーする時"

    //ここはonmousedownです

    if (dom_mousedown_target.classList.contains('class_codeblock_mono')) { //ブロックを移動する時


        dom_dragging = dom_mousedown_target.cloneNode(true) //クローン
        dom_dragging.id = 'id_temp_movingdom'
        dom_dragging.classList.remove('class_codeblock_mono')
        dom_dragging.removeEventListener('mouseenter', blank)
        dom_dragging.removeEventListener('mouseleave', blank)
        dom_codingspace.appendChild(dom_dragging)
        
        status_isdragging_codeblock_mono = true

        dom_dragging = document.getElementById("id_temp_movingdom") //再定義
        put.removeAttribute("id");

        dom_dragging.style.left = dom_mousedown_target.style.left //初期位置の設定
        dom_dragging.style.top = dom_mousedown_target.style.top
        dom_dragging.style.zIndex = -1

        array_dom_mousedown_target_siblings = dom_mousedown_target.parentNode.children //掃除
        if (array_dom_mousedown_target_siblings.length==0) {
            dom_mousedown_target.parentNode.remove()
        }
        dom_mousedown_target.remove()
    } //ここまで"ブロックを移動する時"
}





document.onmousemove = function() {
    //cubliumイベントを実行
    run('trigger_mousemove');

    if (status_isclicking && ! status_connectready) { //ドラッグ中の位置移動(位置固定がない場合)
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
        dom_stopdragging.addEventListener('mouseenter', mouseenterfunction);
        dom_stopdragging.addEventListener('mouseleave', mouseleavefunction);
        dom_stopdragging.classList.add('class_codeblock_mono');

        
    } //ここまでドラッグの終了

}
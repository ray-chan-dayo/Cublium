/*
Cublium v2 beta
変数型_temp_変数名
*/

let status_isclicking = false
let status_isdragging_codeblock_mono = false
let status_isdragging_codeblock_trigger = false
let status_ready2connect = false


let int_mousedown_offsetX
let int_mousedown_offsetY

let dom_dragging
let dom_mousedown_target
let dom_stopdragging
let dom_runninggroup

const dom_codingspace = getElementByID('work')

const blank = function blank() {

}

const lastof = function lastof(arg1) {
    return arg1[arg1.length - 1]
}

const siblingof = function siblingof(arg2) {
    return arg2.parentNode.children()
}

document.onmousedown = function(event) {

    status_isclicking = true
    dom_mousedown_target = event.target

    int_mousedown_offsetX = dom_mousedown_target.style.left-event.pageX //相対位置の測定
    int_mousedown_offsetY = dom_mousedown_target.style.up-event.pageY

    dom_dragging = dom_mousedown_target.cloneNode(true) //子要素もcloneするからdeep=trues
    dom_dragging.style.zIndex = -1

    //cubliumイベントを実行
    run('trigger_mousedown');

    if (dom_mousedown_target.classList.contains('class_codeblock_source_mono')) { //右側のコピー元からコピーする時
        
        status_isdragging_codeblock_mono = true

        dom_dragging.classList.remove('class_codeblock_source_mono')
        dom_codingspace.appendChild(dom_dragging)

        dom_dragging.style.left = dom_mousedown_target.style.left //初期位置の設定
        dom_dragging.style.top = dom_mousedown_target.style.top

    } //ここまで"右側のコピー元からコピーする時"

    //ここはonmousedownです

    if (dom_mousedown_target.classList.contains('class_codeblock_source_trigger')) { //右側からトリガーをコピーする時
        
        status_isdragging_codeblock_trigger = true

        dom_dragging.classList.remove('class_codeblock_source_trigger')
        dom_codingspace.appendChild(dom_dragging)

        dom_dragging.style.left = dom_mousedown_target.style.left //初期位置の設定
        dom_dragging.style.top = dom_mousedown_target.style.top
    } //ここまで"右側からトリガーをコピーする時"

    //ここはonmousedownです

    if (dom_mousedown_target.classList.contains('class_codeblock_mono')) { //ブロックを移動する時
        
        status_isdragging_codeblock_mono = true

        dom_dragging.classList.remove('class_codeblock_mono')
        dom_dragging.removeEventListener('mouseenter', blank)
        dom_dragging.removeEventListener('mouseleave', blank)
        dom_codingspace.appendChild(dom_dragging)

        lastof(siblingof(dom_mousedown_target)).classList.add('class_codeblock_connectable') //末っ子に結着を戻す。この機構は今後改善したい。

        dom_mousedown_target.remove()
    } //ここまで"ブロックを移動する時"

    //ここはonmousedownです

    if (dom_mousedown_target.classList.contains('class_codeblock_trigger')) { //トリガーを移動する時
        
        status_isdragging_codeblock_trigger = true

        dom_dragging.classList.remove('class_codeblock_trigger')
        dom_dragging.removeEventListener('mouseenter', blank)
        dom_dragging.removeEventListener('mouseleave', blank)
        dom_codingspace.appendChild(dom_dragging)

        dom_mousedown_target.parentNode.remove() //必要なくなったrunninggroupを削除
    } //ここまで"トリガーを移動する時"
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
            dom_codingspace.appendChild(dom_stopdragging);
        }
    } //ここまでドラッグの終了

    if (status_isdragging_codeblock_trigger) { //トリガードラッグの終了
        dom_stopdragging = dom_dragging.cloneNode()
        dom_stopdragging.addEventListener('mouseenter', mouseenterfunction)
        dom_stopdragging.addEventListener('mouseleave', mouseleavefunction)
        dom_stopdragging.classList.add('class_codeblock_trigger')
        dom_stopdragging.classList.add('class_codeblock_connectable')

        dom_runninggroup = document.createElement('div')
        dom_runninggroup.classList.add(dom_stopdragging.name) //トリガーの継承を行う必要がある。
        dom_runninggroup.classList.remove('block')
        
        dom_runninggroup.appendChild(dom_stopdragging)
        dom_codingspace.appendChild(dom_runninggroup)
    } //ここまでドラッグの終了
}

var keydetect = function keydetect(dom) {
    document.addEventListener('keydown', logKey);
    console.log(dom.value);
    var keydetect_class = "trigger_keydown_" + dom.value;
    console.log(keydetect_class);
    eval("dom.parentNode.classList.remove('"+keydetect_class+"');");
    eval("dom.parentNode.parentNode.classList.remove('"+keydetect_class+"');");
    function logKey(event) {
        console.log(event.code);
        dom.value = event.code;
        document.removeEventListener('keydown', logKey);
        var keydetect_class = "trigger_keydown_" + event.code;
        eval("dom.parentNode.classList.add('"+keydetect_class+"');");
        eval("dom.parentNode.parentNode.classList.add('"+keydetect_class+"');");
    }
}

document.onkeydown = function kyples(event) {
    eval("run('trigger_keydown_"+event.code+"')");
}

//runはv1を流用
var run = function run(trigger) {
    var run_triggered_array = Array.prototype.slice.call(document.getElementsByClassName(trigger));
    run_triggered_array.forEach(run_triggered => {
        if (run_triggered.nodeName == 'DIV') {
            var run_triggered_child_array = Array.prototype.slice.call(run_triggered.children);
            run_triggered_child_array.forEach(run_triggered_child => {
                if (run_triggered_child.classList.contains('debug')) {
                    console.log('hello');
                };
                if (run_triggered_child.classList.contains('setimg')) {
                    var effect_setimg_element = document.createElement('img');
                    effect_setimg_element.src = run_triggered_child.name;
                    display.appendChild(effect_setimg_element);
                };
                /*
                if (run_triggered_child.classList.contains('log')) {
                    console.log(run_triggered_child.name); 
                };
                */
                if (run_triggered_child.classList.contains('editablelog')) {
                    Array.prototype.slice.call(run_triggered_child.children).forEach(inside_editablelog => {
                        console.log(inside_editablelog.textContent); 
                    });
                };
                if (run_triggered_child.classList.contains('set')) {
                    Array.prototype.slice.call(run_triggered_child.children).forEach(inside_set => {
                        if (inside_set.classList.contains('var')) {
                            set_var = inside_set.textContent;
                        };
                        if (inside_set.classList.contains('content')) {
                            set_content = inside_set.textContent;
                        };
                    });
                    eval (set_var + "='" + set_content + "';");
                };
                if (run_triggered_child.classList.contains('classlist')) {
                    Array.prototype.slice.call(run_triggered_child.children).forEach(inside_set => {
                        if (inside_set.classList.contains('mother')) {
                            set_mother = inside_set.textContent;
                        };
                        if (inside_set.classList.contains('operation')) {
                                set_operation = inside_set.value;
                        };
                        if (inside_set.classList.contains('content')) {
                            set_content = inside_set.textContent;
                        };
                    eval (set_mother + '.' + set_operation + '(' + set_content + ');');
                    });
                };
                if (run_triggered_child.classList.contains('eval')) {
                    //console.log("aaa")
                    Array.prototype.slice.call(run_triggered_child.children).forEach(inside_eval => {
                        //console.log(inside_eval)
                        eval(inside_eval.textContent);
                    });
                };
                if (run_triggered_child.classList.contains('alert')) {
                    Array.prototype.slice.call(run_triggered_child.children).forEach(inside_editablelog => {
                        alert(inside_editablelog.textContent);
                    });
                };
                //not in HTML
                if (run_triggered_child.classList.contains('appendchild')) {
                    Array.prototype.slice.call(run_triggered_child.children).forEach(inside_set => {
                        if (inside_set.classList.contains('parent')) {
                            set_parent = inside_set.value;
                        };
                        if (inside_set.classList.contains('child')) {
                            set_child = inside_set.value;
                        };
                    });
                    eval (set_parent + '.appendchild(' + set_child + ');');
                };

                if (run_triggered_child.classList.contains('custom')) {
                    eval(run_triggered_child.name);
                };
                
                if (run_triggered_child.classList.contains('a')) {
                    eval(run_triggered_child.name);
                };
            });
        };
    });
};

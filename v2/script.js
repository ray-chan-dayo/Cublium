/*
Cublium v2 beta
変数型_temp_変数名
todo:over
*/
const block_height = 25;

let status_isclicking = false
let status_isdragging_codeblock_mono = false
let status_isdragging_codeblock_trigger = false
let status_connectready = false


let int_mousedown_offsetX
let int_mousedown_offsetY

let dom_dragging
let dom_mousedown_target
let dom_stopdragging
let dom_runninggroup

const dom_codingspace = document.getElementById('work')
const dom_exportspace = document.getElementById('display')

const blank = function blank() {

}
//未整備
var mouseenterfunction = function(event) {
    if (status_isclicking && status_isdragging_codeblock_mono && event.target.classList.contains("class_codeblock_connectable")) {
        status_connectready = true;
        dom_codeblock_toconnect = this;
        dom_dragging.style.offsetLeft = event.target.offsetLeft;
        dom_dragging.style.top = event.target.offsetTop + block_height;
    };
};

var mouseleavefunction = function mouseleavefunction() {
    using = false;
    over = null;
    deling = false;
}

const lastof = function lastof(arg1) {
    return arg1[arg1.length - 1]
}

const siblingof = function siblingof(arg2) {
    return arg2.parentNode.children()
}

const html2array = function html2array(arg3) {
    return Array.prototype.slice.call(arg3)
}



document.onmousedown = function(event) {

    status_isclicking = true
    dom_mousedown_target = event.target

    int_mousedown_offsetX = event.target.offsetLeft-event.pageX //相対位置の測定
    int_mousedown_offsetY = event.target.offsetTop-event.pageY

    console.log(event.pageX+" x event y "+event.pageY)
    console.log(dom_mousedown_target.style.left+" x style y "+dom_mousedown_target.style.top)
    console.log(int_mousedown_offsetX+" x offset y "+int_mousedown_offsetY)

    //cubliumイベントを実行
    run('trigger_mousedown');

    if (dom_mousedown_target.classList.contains('class_codeblock_source_mono')) { //右側のコピー元からコピーする時
        dom_dragging = dom_mousedown_target.cloneNode(true) //子要素もcloneするからdeep=trues
        
        status_isdragging_codeblock_mono = true

        dom_dragging.classList.remove('class_codeblock_source_mono')

        dom_codingspace.appendChild(dom_dragging)

        dom_dragging.offsetLeft = dom_mousedown_target.style.left //初期位置の設定
        dom_dragging.style.top = dom_mousedown_target.style.top

    } //ここまで"右側のコピー元からコピーする時"

    if (dom_mousedown_target.classList.contains('class_codeblock_mono')) { //ブロックを移動する時
        dom_dragging = dom_mousedown_target.cloneNode(true) //子要素もcloneするからdeep=trues
        
        status_isdragging_codeblock_mono = true

        dom_dragging.classList.remove('class_codeblock_mono')
        dom_dragging.classList.remove('class_codeblock_connectable')
        dom_dragging.removeEventListener('mouseenter', blank)
        dom_dragging.removeEventListener('mouseleave', blank)
        dom_codingspace.appendChild(dom_dragging)

        lastof(siblingof(dom_mousedown_target)).classList.add('class_codeblock_connectable') //末っ子に結着を戻す。この機構は今後改善したい。

        dom_mousedown_target.remove()
    } //ここまで"ブロックを移動する時"


    //ここはonmousedownです

    
    if (dom_mousedown_target.classList.contains('class_codeblock_source_trigger')) { //右側からトリガーをコピーする時
        dom_dragging = dom_mousedown_target.cloneNode(true) //子要素もcloneするからdeep=trues
        
        status_isdragging_codeblock_trigger = true

        dom_dragging.classList.remove('class_codeblock_source_trigger')
        dom_codingspace.appendChild(dom_dragging)

        dom_dragging.style.left = dom_mousedown_target.style.left //初期位置の設定
        dom_dragging.style.top = dom_mousedown_target.style.top
    } //ここまで"トリガーをコピーする時"


    //ここはonmousedownです


    if (dom_mousedown_target.classList.contains('class_codeblock_trigger')) { //トリガーを移動する時
        dom_dragging = dom_mousedown_target.cloneNode(true) //子要素もcloneするからdeep=trues
        dom_mousedown_target.parentNode.remove() //必要なくなったrunninggroupを削除
        
        status_isdragging_codeblock_trigger = true

        dom_dragging.classList.remove('class_codeblock_trigger')
        dom_dragging.classList.remove('class_codeblock_connectable')
        dom_dragging.removeEventListener('mouseenter', blank)
        dom_dragging.removeEventListener('mouseleave', blank)
        dom_codingspace.appendChild(dom_dragging)

    } //ここまで"トリガーを移動する時"


    //ここはonmousedownです


    if (dom_mousedown_target.classList.contains('class_codeblock_source_quart')) { //右側のコピー元からifやforをコピーする時
        dom_dragging = dom_mousedown_target.cloneNode(true) //子要素もcloneするからdeep=trues
        
        status_isdragging_codeblock_mono = true

        if (!dom_dragging.classList.remove('class_codeblock_source_mono')) {
            
        }
        dom_codingspace.appendChild(dom_dragging)

        dom_dragging.style.left = dom_mousedown_target.style.left //初期位置の設定
        dom_dragging.style.top = dom_mousedown_target.style.top

    } //ifやforをコピーする時"

    if (dom_mousedown_target.classList.contains('class_codeblock_quart')) { //ifやforを移動する時
        dom_dragging = dom_mousedown_target.cloneNode(true) //子要素もcloneするからdeep=trues
        
        status_isdragging_codeblock_mono = true

        dom_dragging.classList.remove('class_codeblock_quart')
        dom_dragging.classList.remove('class_codeblock_connectable')
        dom_dragging.removeEventListener('mouseenter', blank)
        dom_dragging.removeEventListener('mouseleave', blank)
        dom_codingspace.appendChild(dom_dragging)

        lastof(siblingof(dom_mousedown_target)).classList.add('class_codeblock_connectable') //末っ子に結着を戻す。この機構は今後改善したい。

        dom_mousedown_target.remove()
    } //ここまで"ifやforを移動する時"


    //ここはonmousedownです

/*
    if (dom_mousedown_target.classList.contains('class_codeblock_source_')) { //右側のコピー元から変数とかコピーする時
        dom_dragging = dom_mousedown_target.cloneNode(true) //子要素もcloneするからdeep=trues
        
        status_isdragging_codeblock_mono = true

        if (!dom_dragging.classList.remove('class_codeblock_source_')) {

        }
        dom_codingspace.appendChild(dom_dragging)

        dom_dragging.style.left = dom_mousedown_target.style.left //初期位置の設定
        dom_dragging.style.top = dom_mousedown_target.style.top

    } //ここまで"変数とかコピーする時"

    if (dom_mousedown_target.classList.contains('class_codeblock_')) { //ブロックを移動する時
        dom_dragging = dom_mousedown_target.cloneNode(true) //子要素もcloneするからdeep=trues
        
        status_isdragging_codeblock_mono = true

        dom_dragging.classList.remove('class_codeblock_')
        dom_dragging.removeEventListener('mouseenter', blank)
        dom_dragging.removeEventListener('mouseleave', blank)
        dom_codingspace.appendChild(dom_dragging)

        //lastof(siblingof(dom_mousedown_target)).classList.add('class_codeblock_connectable') //末っ子に結着を戻す。この機構は今後改善したい。
        //ここ変える

        dom_mousedown_target.remove()
    } //ここまで"変数とかを移動する時"*/
}





document.onmousemove = function() {
    //cubliumイベントを実行
    run('trigger_mousemove');

    if (status_isclicking && ! status_connectready) { //ドラッグ中の位置移動(位置固定がない場合)
        dom_dragging.style.left = event.pageX - int_mousedown_offsetX
        dom_dragging.style.top = event.pageY - int_mousedown_offsetY
    }
}





document.onmouseup = function() {

    status_isclicking = false

    //cubliumイベントを実行
    run('trigger_mouseup');

    if (status_isdragging_codeblock_mono) { //ドラッグの終了
        dom_stopdragging = dom_dragging.cloneNode(true)
        dom_dragging.remove()
        dom_stopdragging.addEventListener('mouseenter', mouseenterfunction)
        dom_stopdragging.addEventListener('mouseleave', mouseleavefunction)
        dom_stopdragging.classList.add('class_codeblock_mono')

        if (status_connectready) {

            dom_codeblock_toconnect.classList.remove('class_codeblock_connectable')
            dom_stopdragging.classList.add('class_codeblock_connectable')
            dom_codeblock_toconnect.parentNode.appendChild(dom_stopdragging) //末っ子として追加

        }else {
            dom_codingspace.appendChild(dom_stopdragging);
        }
    } //ここまでドラッグの終了

    if (status_isdragging_codeblock_trigger) { //トリガードラッグの終了
        dom_stopdragging = dom_dragging.cloneNode(true)
        dom_dragging.remove()
        dom_stopdragging.addEventListener('mouseenter', mouseenterfunction)
        dom_stopdragging.addEventListener('mouseleave', mouseleavefunction)

        dom_runninggroup = document.createElement('div')
        dom_runninggroup.classList = dom_stopdragging.classList //トリガーの継承を行う必要がある。
        dom_runninggroup.appendChild(dom_stopdragging)

        dom_stopdragging.classList.add('class_codeblock_trigger')
        dom_stopdragging.classList.add('class_codeblock_connectable')
        
        dom_codingspace.appendChild(dom_runninggroup)
    } //ここまでドラッグの終了
}





//キーの設定。未整備
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

document.onkeydown = function keypress(event) {
    eval("run('trigger_keydown_"+event.code+"')");
}





//runはv1を流用
var run = function run(trigger) {
    var run_triggered_array = Array.prototype.slice.call(document.getElementsByClassName(trigger));
    run_triggered_array.forEach(run_triggered => {
        if (run_triggered.nodeName == 'DIV') {
            function_run(run_triggered)
        };
    });
};

//未整備
var function_run = function function_run(dom_div_torun) {
    html2array(dom_div_torun.children).forEach(dom_runningblock => { //子要素のそれぞれについて実行

        //整備済み

        if (dom_runningblock.classList.contains('class_monocodeblock_consolelog')) {
            html2array(dom_runningblock.children).forEach(dom_temp_consolelog_run_children => {

                console.log(dom_temp_consolelog_run_children.textContent)

            })
        }
        
        if (dom_runningblock.classList.contains('class_monocodeblock_alart')) {
            html2array(dom_runningblock.children).forEach(dom_temp_alart_run_children => {

                alert(dom_temp_alart_run_children.textContent)

            })
        }
        
        if (dom_runningblock.classList.contains('class_monocodeblock_eval')) {
            html2array(dom_runningblock.children).forEach(dom_temp_eval_run_children => {

                eval(dom_temp_eval_run_children.textContent)

            })
        }

        //未実装(整備はした)

        if (dom_runningblock.classList.contains('class_monocodeblock_debug')) {
            console.log('Hello, World!')
        }
        
        if (dom_runningblock.classList.contains('class_monocodeblock_changebackgroundcolor')) {
            html2array(dom_runningblock.children).forEach(dom_temp_changebackgroundcolor_run_children => {

                dom_exportspace.style.backgroundColor = dom_temp_changebackgroundcolor_run_children.value

            })
        }

        if (dom_runningblock.classList.contains('class_monocodeblock_custom')) {
            eval(dom_runningblock.name)
        }
        
        if (dom_runningblock.classList.contains('class_quartcodeblock_if')) {

            html2array(dom_runningblock.children).forEach(dom_temp_if_run_children => {
                if (dom_temp_if_run_children.classList.contains('class_insideif_condition')) {
                    dom_temp_if_run_condition = eval(dom_temp_if_run_children.name)
                }
            })

            html2array(dom_runningblock.children).forEach(dom_temp_if_run_children => {
                if (dom_temp_if_run_condition && dom_temp_if_run_children.classList.contains('class_insideif_codetorun')) {
                    function_run(dom_temp_if_run_children);
                }
            })

        }

        //未整備

       if (dom_runningblock.classList.contains('set')) {
            Array.prototype.slice.call(dom_runningblock.children).forEach(inside_set => {
                if (inside_set.classList.contains('var')) {
                    set_var = inside_set.textContent;
                };
                if (inside_set.classList.contains('content')) {
                    set_content = inside_set.textContent;
                };
            });
            eval (set_var + "='" + set_content + "';");
        };

        if (dom_runningblock.classList.contains('classlist')) {
            Array.prototype.slice.call(dom_runningblock.children).forEach(inside_set => {
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

        //not in HTML
        if (dom_runningblock.classList.contains('appendchild')) {
            Array.prototype.slice.call(dom_runningblock.children).forEach(inside_set => {
                if (inside_set.classList.contains('parent')) {
                    set_parent = inside_set.value;
                };
                if (inside_set.classList.contains('child')) {
                    set_child = inside_set.value;
                };
            });
            eval (set_parent + '.appendchild(' + set_child + ');');
        };

        

    });
};

//背景色を追加 <input type="color" name="example" value="#ff0000">

const block_height = 25;




let x,
    y,
    isDragging,
    isConnectable,
    domConnectTo = null,
    trush = false;



const mouseleavefunction = function mouseleavefunction() {
    isConnectable = false;
    domConnectTo = null;
    trush = false;
}

function getargs(arg_parent, arg_classname) {
    const tempArray = arg_parent.getElementsByClassName(arg_classname)
    for ( let i = 0; i < tempArray.length; i++ ) {
        if ( tempArray[i].parentNode === arg_parent ) {
            return tempArray[i];
        }
    }
}

function set() {

};



const mouseenterfunction = function(event) {
    const dom_mouseover = event.target;

    if (dom_mouseover.classList.contains('block') && !domDragging.classList.contains('event') && isDragging) {
        isConnectable = true;
        domConnectTo = this;
        domDragging.style.left = event.target.offsetLeft + "px";
        domDragging.style.top = event.target.offsetTop + block_height + "px";
    };

    /*//未使用
    if (dom_mouseover.classList.contains('insertable') && !domDragging.classList.contains('event') && liumisDragging) {
        liumisConnectable = true;
        domConnectTo = this;
        domDragging.style.left = event.target.offsetLeft + "px";
        domDragging.style.top = event.target.offsetTop + block_height + "px";
    };

    //未使用
    if (dom_mouseover.contains('trashcan') && isDragging) {
        trush = true;
        console.log("tetete");
    };*/
};





document.onmousedown = function(event) {
    
    //Cubliumコード側のマウスダウンイベントを発火
    run('trigger_mousedown');

    //init
    isConnectable = false;


    if (event.target.classList.contains('block')) {

        const domCopying = event.target.cloneNode(true);

        //不要なものを削除
        if (domCopying.removeEventListener('mouseenter', mouseenterfunction)) {
            domCopying.removeEventListener('mouseleave', mouseleavefunction);
        };
        domCopying.classList.remove('block');

        domCopying.id = 'move';
        work.appendChild(domCopying);
        domDragging = document.getElementById("move");
        domDragging.style.zIndex = 1;
        
        isDragging = true;


        //位置の調整
        x = event.pageX - event.target.offsetLeft;
        y = event.pageY - event.target.offsetTop;
        if (event.target.id == 'movegen'){
            x = x + 300;
            domDragging.style.left = event.pageX - x + "px";
            domDragging.style.top = event.pageY - y + "px";

        }else{
            //もう使わないdivの削除
		    const dom_temp_clickparent = event.target.parentNode;
		    event.target.remove();
		    if (dom_temp_clickparent.children.length==0) {
		        dom_temp_clickparent.remove();
		    };
        };
    };
    

    //未実装
    if (event.target.classList.contains('lium')) {
        var domCopying = event.target.cloneNode(true);
        if (domCopying.removeEventListener('mouseenter', mouseenterfunction)) {
            domCopying.removeEventListener('mouseleave', mouseleavefunction);
        };
        domCopying.classList.remove('block');
        domCopying.id = 'move';
        work.appendChild(domCopying);
        domDragging = document.getElementById("move");
        x = event.pageX - event.target.offsetLeft;
        y = event.pageY - event.target.offsetTop;
        liumisDragging = true;
        domDragging.style.zIndex = -1;
        if (event.target.id != 'movegen'){
            event.target.remove();
        };
    };
};



document.onmousemove = function (event) {
    run('trigger_mousemove');
	if (isDragging == true) {
        if (isConnectable != true) {
            domDragging.style.left = event.pageX - x + "px";
            domDragging.style.top = event.pageY - y + "px";
        };
    };
};



//
document.onmouseup = function () {

    run('trigger_mouseup');

    if (isDragging == true) {

        let domPlacing = domDragging.cloneNode(true);
        domPlacing.addEventListener('mouseenter', mouseenterfunction);
        domPlacing.addEventListener('mouseleave', mouseleavefunction);
        domPlacing.alt = 'move';
        domPlacing.id = 'id_domput';
        domPlacing.classList.add('block');

        if (isConnectable) {

            domConnectTo.parentElement.appendChild(domPlacing);

        }else if(domPlacing.classList.contains("event")) {

            let domTriggerGroup = document.createElement('div');
            domTriggerGroup.classList = domPlacing.classList;
            domTriggerGroup.classList.remove('block');
            domTriggerGroup.classList.remove('event');
            domTriggerGroup.appendChild(domPlacing);

            work.appendChild(domTriggerGroup);

        }else{
            work.appendChild(domPlacing);
        }
        dragclass = [];
        var dom_put = document.getElementById('id_domput');
        dom_put.removeAttribute("id");
        dom_put.style.left = domDragging.style.left;
        dom_put.style.top = domDragging.style.top;
        dom_put.style.zIndex = 2;
        if (trush) {
            dom_put.remove();
        }
    };
    isConnectable = false;
    isDragging = false;
    domDragging.remove();
    domConnectTo = null;
};

function run(trigger) {
    const array = document.getElementsByClassName(trigger);
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.nodeName == 'DIV') {
            function_run(element)
        };
    };
};

function function_run(groupToRun) {
    for (let linenum = 0; linenum < groupToRun.children.length; linenum++) {
        
        const blockActive = groupToRun.children[linenum];

        //ログにcontentを出力する。
        if (blockActive.classList.contains('editablelog')) {

            const content = getargs(blockActive, "content").textContent;

            console.log(content);
        };

        if (blockActive.classList.contains('set')) {

            const name = getargs(blockActive, "name").textContent,
                content = getargs(blockActive, "content").textContent;

            eval( name + "='" + content + "';");
        };

        if (blockActive.classList.contains('array')) {

            const parent = getargs(blockActive, "parent").textContent,
                operation = getargs(blockActive, "operation").value,
                content = getargs(blockActive, "content").textContent;

            eval(parent + '.' + operation + '(' + content + ');');
        };

        if (blockActive.classList.contains('alert')) {

            const content = getargs(blockActive, "content").textContent;

            alert(content);
        };

        if (blockActive.classList.contains('changebackgroundcolor')) {

            const color = getargs(blockActive, "condition").value;

            document.getElementById("debug").style.backgroundColor = color;
        };
        
        if (blockActive.classList.contains('callevent')) {

            const name = getargs(blockActive, "name").textContent;

            run("trigger_custom_" + name);
        };
        
        if (blockActive.classList.contains('if_legacy')) {

            const condition = eval(getargs(blockActive, "condition").textContent),
                eventname = getargs(blockActive, "eventname").textContent;

            if (condition) {
                run('trigger_custom_' + eventname);
            };
        };

        //=== unavailable blocks from here ===
        if (blockActive.classList.contains('appendchild')) {
            toarray(blockActive.children).forEach(inside_set => {
                if (inside_set.classList.contains('parent')) {
                    set_parent = inside_set.value;
                };
                if (inside_set.classList.contains('child')) {
                    set_child = inside_set.value;
                };
            });
            eval (set_parent + '.appendchild(' + set_child + ');');
        };

        if (blockActive.classList.contains('custom')) {
            eval(blockActive.name);
        };

        if (blockActive.classList.contains('eval')) {
            blockActive.getElementById('')
            toarray(blockActive.children).forEach(inside_eval => {
                eval(inside_eval.textContent);
            });
        };
        
        if (blockActive.classList.contains('debug')) { //disabled
            console.log('Hello, world!');
        };
        
        if (blockActive.classList.contains('setimg')) { //temporary disabled
            var effect_setimg_element = document.createElement('img');
            effect_setimg_element.src = blockActive.name;
            display.appendChild(effect_setimg_element);
        };

        if (blockActive.classList.contains('log_legacy')) { //disabled
            console.log(blockActive.name);
        };
        
        if (blockActive.classList.contains('if')) {
            toarray(blockActive.children).forEach(dom_temp_if => {
                if (dom_temp_if.classList.contains('condition')) {
                    bool_temp_ifcondition = eval(dom_temp_if.value)
                }
                if (dom_temp_if.classList.contains('flow')) {
                    dom_temp_ifflow = dom_temp_if
                }
                if (dom_temp_if.classList.contains('else')) {
                    dom_temp_ifelse = dom_temp_if
                }
                if (dom_temp_if.classList.contains('endif')) {
                    dom_temp_ifendif = dom_temp_if
                }
            })
        }

    }
}

function keydetect(dom) {
    document.addEventListener('keydown', logKey);
    var keydetect_class = "trigger_" + dom.value;
    eval("dom.parentNode.classList.remove('"+keydetect_class+"');");
    eval("dom.parentNode.parentNode.classList.remove('"+keydetect_class+"');");
    function logKey(event) {
        dom.value = event.code;
        document.removeEventListener('keydown', logKey);
        var keydetect_class = "trigger_" + event.code;
        eval("dom.parentNode.classList.add('"+keydetect_class+"');");
        eval("dom.parentNode.parentNode.classList.add('"+keydetect_class+"');");
        dom.parentNode.className = ""+keydetect_class
        dom.parentNode.parentNode.className = ""+keydetect_class
    }
}

document.onkeydown = function keypress(event) {
    eval("run('trigger_"+event.code+"')");
}




let eventchange = function eventchange(dom) {
    dom.parentNode.className = "block event css_block trigger_custom_ " + dom.textContent
    dom.parentNode.parentNode.className = "trigger_custom_" + dom.textContent
}

//unused
const gencode = function gencode(trigger) {
    var run_triggered_array = toarray(document.getElementsByClassName(trigger));
    run_triggered_array.forEach(run_triggered => {
        if (run_triggered.nodeName == 'DIV') {
            var blockActive_array = toarray(run_triggered.children);
            blockActive_array.forEach(blockActive => {
                /*
                if (blockActive.classList.contains('debug')) {
                    console.log("console.log('hello');");
                };
                */
                if (blockActive.classList.contains('setimg')) {
                    var effect_setimg_element = document.createElement('img');
                    effect_setimg_element.src = blockActive.name;
                    display.appendChild(effect_setimg_element);
                };
                /*
                if (blockActive.classList.contains('log')) {
                    console.log("console.log('" + blockActive.name + "');");
                };
                */
                if (blockActive.classList.contains('editablelog')) {
                    toarray(blockActive.children).forEach(inside_editablelog => {
                        if (inside_editablelog.classList.contains('content')){
                            console.log("console.log('" + inside_editablelog.value + "');"); 
                        }
                    });
                };
                if (blockActive.classList.contains('set')) {
                    toarray(blockActive.children).forEach(inside_set => {
                        if (inside_set.classList.contains('var')) {
                            set_var = inside_set.value;
                        };
                        if (inside_set.classList.contains('contents')) {
                            set_content = inside_set.value;
                        };
                    });
                    console.log(set_var + "=" + set_content + ";");
                };
            });
        };
    });
    console.log("end of line");
};


//var inputFile = document.getElementById('inputfiles');
//inputFile.addEventListener("change", function(event) {
//    if (event.target.file.type == 'javascript') {
//        var reader = new FileReader();
//        reader.readAsText(event.target.file);
//        reader.onload = function() {
//            se = "/*" + reader.result.replace("console.log('hello')", "*/ gen('debug'); /*").replace("setimg()", "*/gen('setimg');/*").replace(";", ";/*") + "*/".replace("}", "};/*") + "*/";
//            eval(se);
//        };
//    }else {
//        var reader = new FileReader();
//        reader.readAsText(event.target.file);
//        reader.onload = function() {
//            eval("var FILE_" + event.target.file.name + " = event.target.file;");
//        };
//    };
//},false);
/*
var namesetimg_element = document.createElement('img');
namesetimg_element.src = "pic.png"
namesetimg_element.classList.add('block');
namesetimg_element.classList.add('setimg');
var namesetimg = function namesetimg() {
    namesetimg_element.name = document.getElementById("setimgtxt").value;
    work.appendChild(namesetimg_element);
};
/*
var log_element = document.createElement('img');
log_element.src = "log.png";
log_element.classList.add('block');
log_element.classList.add('log');
var namesettxt = function namesettxt() {
    log_element.name = document.getElementById("log").value;
    work.appendChild(log_element);
};
*/

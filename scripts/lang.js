const block_height = 25;




let x;
let y;
let status_dragging;
let status_connectready;
let dom_codeblock_toconnect = null;
let trush = false;
const grop = document.createElement('div');


function toarray(arg) {
    return Array.prototype.slice.call(arg);
}

const mouseleavefunction = function mouseleavefunction() {
    status_connectready = false;
    dom_codeblock_toconnect = null;
    trush = false;
}

function getargs(arg_parent, arg_classname) {
    const temp_classElem = arg_parent.getElementsByClassName(arg_classname)
    for ( let i = 0; i < temp_classElem.length; i++ ) {
        if ( temp_classElem[i].parentNode === arg_parent ) {
            return temp_classElem[i];
        }
    }
}

function set() {

};



const mouseenterfunction = function(event) {
    const dom_mouseover = event.target;

    if (dom_mouseover.classList.contains('block') && !dom_dragging.classList.contains('event') && status_dragging) {
        status_connectready = true;
        dom_codeblock_toconnect = this;
        dom_dragging.style.left = event.target.offsetLeft + "px";
        dom_dragging.style.top = event.target.offsetTop + block_height + "px";
    };

    //未使用
    if (dom_mouseover.classList.contains('insertable') && !dom_dragging.classList.contains('event') && liumstatus_dragging) {
        liumstatus_connectready = true;
        dom_codeblock_toconnect = this;
        dom_dragging.style.left = event.target.offsetLeft + "px";
        dom_dragging.style.top = event.target.offsetTop + block_height + "px";
    };

    //未使用
    if (dom_mouseover.contains('trashcan') && status_dragging) {
        trush = true;
        console.log("tetete");
    };
};





document.onmousedown = function(event) {
    
    //Cubliumコード側のマウスダウンイベントを発火
    run('trigger_mousedown');

    //init
    status_connectready = false;


    if (event.target.classList.contains('block')) {

        const dom_temp_clickcopy = event.target.cloneNode(true);

        //不要なものを削除
        if (dom_temp_clickcopy.removeEventListener('mouseenter', mouseenterfunction)) {
            dom_temp_clickcopy.removeEventListener('mouseleave', mouseleavefunction);
        };
        dom_temp_clickcopy.classList.remove('block');

        dom_temp_clickcopy.id = 'move';
        work.appendChild(dom_temp_clickcopy);
        dom_dragging = document.getElementById("move");
        dom_dragging.style.zIndex = 1;
        
        status_dragging = true;


        //位置の調整
        x = event.pageX - event.target.offsetLeft;
        y = event.pageY - event.target.offsetTop;
        if (event.target.id == 'movegen'){
            x = x + 300;
            dom_dragging.style.left = event.pageX - x + "px";
            dom_dragging.style.top = event.pageY - y + "px";

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
        var dom_temp_clickcopy = event.target.cloneNode(true);
        if (dom_temp_clickcopy.removeEventListener('mouseenter', mouseenterfunction)) {
            dom_temp_clickcopy.removeEventListener('mouseleave', mouseleavefunction);
        };
        dom_temp_clickcopy.classList.remove('block');
        dom_temp_clickcopy.id = 'move';
        work.appendChild(dom_temp_clickcopy);
        dom_dragging = document.getElementById("move");
        x = event.pageX - event.target.offsetLeft;
        y = event.pageY - event.target.offsetTop;
        liumstatus_dragging = true;
        dom_dragging.style.zIndex = -1;
        if (event.target.id != 'movegen'){
            event.target.remove();
        };
    };
};



document.onmousemove = function (event) {
    run('trigger_mousemove');
	if (status_dragging == true) {
        if (status_connectready != true) {
            dom_dragging.style.left = event.pageX - x + "px";
            dom_dragging.style.top = event.pageY - y + "px";
        };
    };
};



//
document.onmouseup = function () {
    run('trigger_mouseup');
    if (status_dragging == true) {
        var movesetdom = dom_dragging.cloneNode(true);
        movesetdom.addEventListener('mouseenter', mouseenterfunction);
        movesetdom.addEventListener('mouseleave', mouseleavefunction);
        movesetdom.alt = 'move';
        movesetdom.id = 'id_domput';
        movesetdom.classList.add('block');
        if (status_connectready) {
            dom_codeblock_toconnect.parentElement.appendChild(movesetdom);
        }else if(movesetdom.classList.contains("event")) {
            let dom_runninggroup = document.createElement('div');
            dom_runninggroup.classList = movesetdom.classList;
            dom_runninggroup.classList.remove('block');
            dom_runninggroup.classList.remove('event');
            dom_runninggroup.appendChild(movesetdom);
            work.appendChild(dom_runninggroup);
        }else{
            work.appendChild(movesetdom);
        }
        dragclass = [];
        var dom_put = document.getElementById('id_domput');
        dom_put.removeAttribute("id");
        dom_put.style.left = dom_dragging.style.left;
        dom_put.style.top = dom_dragging.style.top;
        dom_put.style.zIndex = 2;
        if (trush) {
            dom_put.remove();
        }
    };
    status_connectready = false;
    status_dragging = false;
    dom_dragging.remove();
    dom_codeblock_toconnect = null;
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

function function_run(dom_div_torun) {
    for (let linenum = 0; linenum < dom_div_torun.children.length; linenum++) {
        
        const dom_runningblock = dom_div_torun.children[linenum];

        if (dom_runningblock.classList.contains('editablelog')) {

            const content = getargs(dom_runningblock, "content").textContent;

            console.log(content.textContent);
        };

        if (dom_runningblock.classList.contains('set')) {

            const name = getargs(dom_runningblock, "name").textContent;
            const content = getargs(dom_runningblock, "content").textContent;

            eval( name + "='" + content + "';");
        };

        if (dom_runningblock.classList.contains('array')) {

            const parent = getargs(dom_runningblock, "parent").textContent;
            const operation = getargs(dom_runningblock, "operation").textContent;
            const content = getargs(dom_runningblock, "content").textContent;

            eval(parent + '.' + operation + '(' + content + ');');
        };

        if (dom_runningblock.classList.contains('alert')) {

            const content = getargs(dom_runningblock, "content").textContent;

            alert(content);
        };

        if (dom_runningblock.classList.contains('changebackgroundcolor')) {

            const color = getargs(dom_runningblock, "condition").value;

            document.getElementById("debug").style.backgroundColor = color;
        };
        
        if (dom_runningblock.classList.contains('callevent')) {

            const name = getargs(dom_runningblock, "name").textContent;

            run("trigger_custom_" + name);
        };
        
        if (dom_runningblock.classList.contains('if_legacy')) {

            const condition = eval(getargs(dom_runningblock, "condition").textContent);
            const eventname = getargs(dom_runningblock, "eventname").textContent;

            if (condition) {
                run('trigger_custom_' + eventname);
            };
        };

        //=== unavailable blocks from here ===
        if (dom_runningblock.classList.contains('appendchild')) {
            toarray(dom_runningblock.children).forEach(inside_set => {
                if (inside_set.classList.contains('parent')) {
                    set_parent = inside_set.value;
                };
                if (inside_set.classList.contains('child')) {
                    set_child = inside_set.value;
                };
            });
            eval (set_parent + '.appendchild(' + set_child + ');');
        };

        if (dom_runningblock.classList.contains('custom')) {
            eval(dom_runningblock.name);
        };

        if (dom_runningblock.classList.contains('eval')) {
            dom_runningblock.getElementById('')
            toarray(dom_runningblock.children).forEach(inside_eval => {
                eval(inside_eval.textContent);
            });
        };
        
        if (dom_runningblock.classList.contains('debug')) { //disabled
            console.log('Hello, world!');
        };
        
        if (dom_runningblock.classList.contains('setimg')) { //temporary disabled
            var effect_setimg_element = document.createElement('img');
            effect_setimg_element.src = dom_runningblock.name;
            display.appendChild(effect_setimg_element);
        };

        if (dom_runningblock.classList.contains('log_legacy')) { //disabled
            console.log(dom_runningblock.name);
        };
        
        if (dom_runningblock.classList.contains('if')) {
            toarray(dom_runningblock.children).forEach(dom_temp_if => {
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
            var dom_runningblock_array = toarray(run_triggered.children);
            dom_runningblock_array.forEach(dom_runningblock => {
                /*
                if (dom_runningblock.classList.contains('debug')) {
                    console.log("console.log('hello');");
                };
                */
                if (dom_runningblock.classList.contains('setimg')) {
                    var effect_setimg_element = document.createElement('img');
                    effect_setimg_element.src = dom_runningblock.name;
                    display.appendChild(effect_setimg_element);
                };
                /*
                if (dom_runningblock.classList.contains('log')) {
                    console.log("console.log('" + dom_runningblock.name + "');");
                };
                */
                if (dom_runningblock.classList.contains('editablelog')) {
                    toarray(dom_runningblock.children).forEach(inside_editablelog => {
                        if (inside_editablelog.classList.contains('content')){
                            console.log("console.log('" + inside_editablelog.value + "');"); 
                        }
                    });
                };
                if (dom_runningblock.classList.contains('set')) {
                    toarray(dom_runningblock.children).forEach(inside_set => {
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

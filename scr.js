
/*CONFIG

CCCC OOOO N  N FFFF III GGGG
C    O  O NN N F     I  G
C    O  O N NN FFF   I  G GG
C    O  O N  N F     I  G  G
CCCC OOOO N  N F    III GGGG

*/
const block_height = 25;




var x;
var y;
var status_dragging;
var status_connectready;
var dom_codeblock_toconnect = null;
var dom_dragging = null;
var deling = false;
const grop = document.createElement('div');
var set_var
var set_content


const toarray = function toarray(arg3) {
    return Array.prototype.slice.call(arg3)
}


/*

CCCC L    OOOO N  N EEEE
C    L    O  O NN N E
C    L    O  O N NN EEE
C    L    O  O N  N E
CCCC LLLL OOOO N  N EEEE

*/
/*
var set = function set() {
    let smove = document.createElement('img');
    //<event>
    smove.addEventListener('mouseenter', function (event) {
        //console.log ("dom_codeblock_toconnect");
        //console.log (event.target);
        //console.log (event.target.classList);
        if (event.target.classList.contains('block')) {
            if (!dom_dragging.classList.contains('event')) {
                status_connectready = true;
                dom_codeblock_toconnect = this;
                dom_dragging.style.left = event.target.offsetLeft + "px";
                dom_dragging.style.top = event.target.offsetTop + 100 + "px";
                //console.log ("dom_codeblock_toconnectcollect");
            };
        };
    });
    smove.addEventListener('mouseleave', function(event) {
        //console.log ("dom_codeblock_toconnectend");
        status_connectready = false;
        dom_codeblock_toconnect = null;
    });
    //</event>
    smove.src = dom_dragging.src;
    smove.name = dom_dragging.name;
    smove.alt = 'move';
    smove.id = 'put'
    var dragclass = toarray(dom_dragging.classList);
    dragclass.forEach(dom_draggingc => {
        if (dom_draggingc != 'event') {
            smove.classList.add(dom_draggingc);
        };
    });
    smove.classList.add('block')
    dom_dragging.classList = [];
    if (!status_connectready) {
        let dom_runninggroup = document.createElement('div');
        if (dragclass.includes('event')) {
            dragclass.forEach(dom_draggingdivc => {
                if (dom_draggingdivc != 'event') {
                    if (dom_draggingdivc != 'block') {
                        dom_runninggroup.classList.add(dom_draggingdivc);
                    };
                };
            });
        };
        dom_runninggroup.appendChild(smove);
        work.appendChild(dom_runninggroup);
    }else {
        dom_codeblock_toconnect.parentElement.appendChild(smove);
    };
    dragclass = [];
};*/
var mouseleavefunction = function mouseleavefunction() {
    status_connectready = false;
    dom_codeblock_toconnect = null;
    deling = false;
}
var set = function set() {
    var movesetdom = dom_dragging.cloneNode(true);
    movesetdom.addEventListener('mouseenter', mouseenterfunction);
    movesetdom.addEventListener('mouseleave', mouseleavefunction);
    movesetdom.alt = 'move';
    movesetdom.id = 'put'
    movesetdom.classList.add('block');
    if (status_connectready) {
        dom_codeblock_toconnect.parentElement.appendChild(movesetdom);
    }else {
        let dom_runninggroup = document.createElement('div');
        dom_runninggroup.classList = movesetdom.classList;
        dom_runninggroup.classList.remove('block');
        dom_runninggroup.classList.remove('event');
        dom_runninggroup.appendChild(movesetdom);
        work.appendChild(dom_runninggroup);
    };
    dragclass = [];
};

document.getElementById("css_gen").addEventListener('mouseenter', mouseenterfunction);
document.getElementById("css_gen").addEventListener('mouseleave', mouseleavefunction);

var mouseenterfunction = function(event) {
    if (event.target.classList.contains('block') && !dom_dragging.classList.contains('event') && status_dragging) {
        status_connectready = true;
        dom_codeblock_toconnect = this;
        dom_dragging.style.left = event.target.offsetLeft + "px";
        dom_dragging.style.top = event.target.offsetTop + block_height + "px";
    };
    if (event.target.classList.contains('insertable') && !dom_dragging.classList.contains('event') && liumstatus_dragging) {
        liumstatus_connectready = true;
        dom_codeblock_toconnect = this;
        dom_dragging.style.left = event.target.offsetLeft + "px";
        dom_dragging.style.top = event.target.offsetTop + block_height + "px";
    };
    if (event.target.classList.contains('deleteblocks')) {
        deling = true;
        dom_codeblock_toconnect = this;
    };
};



document.onmousedown = function(event) {
    run('trigger_mousedown');

    status_connectready = false;
    if (event.target.classList.contains('block')) {
        var movecopydom = event.target.cloneNode(true);
        if (movecopydom.removeEventListener('mouseenter', mouseenterfunction)) {
            movecopydom.removeEventListener('mouseleave', mouseleavefunction)
        };
        movecopydom.classList.remove('block');
        movecopydom.id = 'move';
        work.appendChild(movecopydom);
        dom_dragging = document.getElementById("move");
        x = event.pageX - event.target.offsetLeft;
        y = event.pageY - event.target.offsetTop;
        status_dragging = true;
        dom_dragging.style.zIndex = -1;
        //もう使わないdivの削除
        if (event.target.id != 'movegen'){
		    var ray_cub_clone_parent=event.target.parentNode;
		    event.target.remove()
		    if (ray_cub_clone_parent.children.length==0) {
		        ray_cub_clone_parent.remove();
		    };
        };
    };
    if (event.target.classList.contains('lium')) {
        var movecopydom = event.target.cloneNode(true);
        if (movecopydom.removeEventListener('mouseenter', mouseenterfunction)) {
            movecopydom.removeEventListener('mouseleave', mouseleavefunction)
        };
        movecopydom.classList.remove('block');
        movecopydom.id = 'move';
        work.appendChild(movecopydom);
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



document.onmousemove = function reload(event){
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
        set();
        var put = document.getElementById('put');
        put.removeAttribute("id");
        put.style.left = dom_dragging.style.left;
        put.style.top = dom_dragging.style.top;
        put.style.zIndex = 0;
        if (deling) {
            put.remove()
        }
    };
    status_connectready = false;
    status_dragging = false;
    dom_dragging.remove();
    dom_codeblock_toconnect = null;
};
/*
var testrun = function testrun() {
    var runner = toarray(document.getElementsByClassName('testtrigger'));
    console.log (runner);
    runner.forEach(sprunner => {
        if (sprunner.nodeName == 'DIV') {
            console.log(sprunner);
            var inrunner = toarray(sprunner.children);
            inrunner.forEach(insiderunner => {
                console.log (insiderunner.classList);
                if (insiderunner.classList.contains('debug')) {
                    console.log ("debug");
                };
                if (insiderunner.classList.contains('move')) {
                    console.log ("move");
                };
                if (insiderunner.classList.contains('setimg')) {
                    console.log ("setimg");
                };
                if (insiderunner.classList.contains('blos')) {
                    console.log ("blos");
                };
            });
        };
    });
};
*/

var gencode = function gencode(trigger) {
    var run_triggered_array = toarray(document.getElementsByClassName(trigger));
    run_triggered_array.forEach(run_triggered => {
        if (run_triggered.nodeName == 'DIV') {
            var run_triggered_child_array = toarray(run_triggered.children);
            run_triggered_child_array.forEach(run_triggered_child => {
                /*
                if (run_triggered_child.classList.contains('debug')) {
                    console.log("console.log('hello');");
                };
                */
                if (run_triggered_child.classList.contains('setimg')) {
                    var effect_setimg_element = document.createElement('img');
                    effect_setimg_element.src = run_triggered_child.name;
                    display.appendChild(effect_setimg_element);
                };
                /*
                if (run_triggered_child.classList.contains('log')) {
                    console.log("console.log('" + run_triggered_child.name + "');");
                };
                */
                if (run_triggered_child.classList.contains('editablelog')) {
                    toarray(run_triggered_child.children).forEach(inside_editablelog => {
                        if (inside_editablelog.classList.contains('content'))
                    console.log("console.log('" + inside_editablelog.value + "');"); 
                    });
                };
                if (run_triggered_child.classList.contains('set')) {
                    toarray(run_triggered_child.children).forEach(inside_set => {
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

var run = function run(trigger) {
    var run_triggered_array = toarray(document.getElementsByClassName(trigger));
    run_triggered_array.forEach(run_triggered => {
        if (run_triggered.nodeName == 'DIV') {
            var run_triggered_child_array = toarray(run_triggered.children);
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
                    toarray(run_triggered_child.children).forEach(inside_editablelog => {
                        console.log(inside_editablelog.textContent); 
                    });
                };
                if (run_triggered_child.classList.contains('set')) {
                    toarray(run_triggered_child.children).forEach(inside_set => {
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
                    toarray(run_triggered_child.children).forEach(inside_set => {
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
                    toarray(run_triggered_child.children).forEach(inside_eval => {
                        //console.log(inside_eval)
                        eval(inside_eval.textContent);
                    });
                };
                if (run_triggered_child.classList.contains('alert')) {
                    toarray(run_triggered_child.children).forEach(inside_editablelog => {
                        alert(inside_editablelog.textContent);
                    });
                };
                if (run_triggered_child.classList.contains('changebackgroundcolor')) {
                    toarray(run_triggered_child.children).forEach(inside_editablelog => {
                        document.getElementById("display").style.backgroundColor=inside_editablelog.value;
                    });
                };
                //no in HTML
                if (run_triggered_child.classList.contains('appendchild')) {
                    toarray(run_triggered_child.children).forEach(inside_set => {
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

var keydetect = function keydetect(dom) {
    document.addEventListener('keydown', logKey);
    console.log(dom.value);
    var keydetect_class = "trigger_" + dom.value;
    console.log(keydetect_class);
    eval("dom.parentNode.classList.remove('"+keydetect_class+"');");
    eval("dom.parentNode.parentNode.classList.remove('"+keydetect_class+"');");
    function logKey(event) {
        console.log(event.code);
        dom.value = event.code;
        document.removeEventListener('keydown', logKey);
        var keydetect_class = "trigger_" + event.code;
        eval("dom.parentNode.classList.add('"+keydetect_class+"');");
        eval("dom.parentNode.parentNode.classList.add('"+keydetect_class+"');");
    }
}

document.onkeydown = function keypress(event) {
    eval("run('trigger_"+event.code+"')");
}

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

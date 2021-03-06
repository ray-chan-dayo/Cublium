//javascriptです
//画像を複製し移動できるようにするコードです
//HTML:id=movegenの要素(なんでもok)
//    <div id=work></div>
var x;
var y;
var clicking;
var using;
var over = null;
var drag = null;
const grop = document.createElement('div');
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
        //console.log ("over");
        //console.log (event.target);
        //console.log (event.target.classList);
        if (event.target.classList.contains('block')) {
            if (!drag.classList.contains('event')) {
                using = true;
                over = this;
                drag.style.left = event.target.offsetLeft + "px";
                drag.style.top = event.target.offsetTop + 100 + "px";
                //console.log ("overcollect");
            };
        };
    });
    smove.addEventListener('mouseleave', function(event) {
        //console.log ("overend");
        using = false;
        over = null;
    });
    //</event>
    smove.src = drag.src;
    smove.name = drag.name;
    smove.alt = 'move';
    smove.id = 'put'
    var dragclass = Array.prototype.slice.call(drag.classList);
    dragclass.forEach(dragc => {
        if (dragc != 'event') {
            smove.classList.add(dragc);
        };
    });
    smove.classList.add('block')
    drag.classList = [];
    if (!using) {
        let emove = document.createElement('div');
        if (dragclass.includes('event')) {
            dragclass.forEach(dragdivc => {
                if (dragdivc != 'event') {
                    if (dragdivc != 'block') {
                        emove.classList.add(dragdivc);
                    };
                };
            });
        };
        emove.appendChild(smove);
        work.appendChild(emove);
    }else {
        over.parentElement.appendChild(smove);
    };
    dragclass = [];
};*/
var mouseenterfunction = function(event) {
    if (event.target.classList.contains('block') && !drag.classList.contains('event')) {
        using = true;
        over = this;
        drag.style.left = event.target.offsetLeft + "px";
        drag.style.top = event.target.offsetTop + 100 + "px";
    };
}
var set = function set() {
    var movesetdom = drag.cloneNode(true);
    movesetdom.addEventListener('mouseenter', mouseenterfunction);
    movesetdom.addEventListener('mouseleave', function mouseleavefunction() {
        using = false;
        over = null;
    });
    movesetdom.alt = 'move';
    movesetdom.id = 'put'
    movesetdom.classList.add('block');
    if (!using) {
        let emove = document.createElement('div');
        emove.classList = movesetdom.classList;
        emove.classList.remove('block');
        emove.classList.remove('event');
        emove.appendChild(movesetdom);
        work.appendChild(emove);
    }else {
        over.parentElement.appendChild(movesetdom);
    };
    dragclass = [];
};



document.onmousedown = function(event) {
    run('trigger_mousedown');

    using = false;
    if (event.target.classList.contains('block')) {
        var movecopydom = event.target.cloneNode(true);
        if (movecopydom.removeEventListener('mouseenter', mouseenterfunction)) {
            movecopydom.removeEventListener('mouseleave', mouseleavefunction)
        };
        movecopydom.classList.remove('block');
        movecopydom.id = 'move';
        work.appendChild(movecopydom);
        drag = document.getElementById("move");
        x = event.pageX - event.target.offsetLeft;
        y = event.pageY - event.target.offsetTop;
        clicking = true;
        drag.style.zIndex = -1;
        if (event.target.id != 'movegen'){
            event.target.remove();
        };
    };
};



document.onmousemove = function (event){
    run('trigger_mousemove');
	if (clicking == true) {
        if (using == true) {
        }else{
            drag.style.left = event.pageX - x + "px";
            drag.style.top = event.pageY - y + "px";
        };
    };
};



//
document.onmouseup = function () {
    if (clicking == true) {
        run('trigger_mouseup');
        set();
        var put = document.getElementById('put');
        put.removeAttribute("id");
        put.style.left = drag.style.left;
        put.style.top = drag.style.top;
        put.style.zIndex = 0;
    };
    using = false;
    clicking = false;
    drag.remove();
    over = null;
};
/*
var testrun = function testrun() {
    var runner = Array.prototype.slice.call(document.getElementsByClassName('testtrigger'));
    console.log (runner);
    runner.forEach(sprunner => {
        if (sprunner.nodeName == 'DIV') {
            console.log(sprunner);
            var inrunner = Array.prototype.slice.call(sprunner.children);
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
    var run_triggered_array = Array.prototype.slice.call(document.getElementsByClassName(trigger));
    run_triggered_array.forEach(run_triggered => {
        if (run_triggered.nodeName == 'DIV') {
            var run_triggered_child_array = Array.prototype.slice.call(run_triggered.children);
            run_triggered_child_array.forEach(run_triggered_child => {
                if (run_triggered_child.classList.contains('debug')) {
                    console.log("console.log('hello');");
                };
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
                    Array.prototype.slice.call(run_triggered_child.children).forEach(inside_editablelog => {
                        if (inside_editablelog.classList.contains('content'))
                    console.log("console.log('" + inside_editablelog.value + "');"); 
                    });
                };
            });
        };
    });
};

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
                    console.log(inside_editablelog.value); 
                    });
                };
            });
        };
    });
};
var inputFile = document.getElementById('inputfiles');
inputFile.addEventListener("change", function(event) {
    if (event.target.file.type == 'javascript') {
        var reader = new FileReader();
        reader.readAsText(event.target.file);
        reader.onload = function() {
            se = "/*" + reader.result.replace("console.log('hello')", "*/ gen('debug'); /*").replace("setimg()", "*/gen('setimg');/*").replace(";", ";/*") + "*/".replace("}", "};/*") + "*/";
            eval(se);
        };
    }else {
        var reader = new FileReader();
        reader.readAsText(event.target.file);
        reader.onload = function() {
            eval("var FILE_" + event.target.file.name + " = event.target.file;");
        };
    };
},false);
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

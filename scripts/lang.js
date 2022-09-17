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

function getargs(parent, classname) {
    const tempArray = parent.getElementsByClassName(classname)
    for ( let i = 0; i < tempArray.length; i++ ) {
        if ( tempArray[i].parentNode === parent ) {
            return tempArray[i];
        }
    }
}

const mouseenterfunction = function(event) {
    const dom_mouseover = event.target;

    if (dom_mouseover.classList.contains('block') && !domDragging.classList.contains('event') && isDragging) {
        isConnectable = true;
        domConnectTo = this;
        domDragging.style.left = event.target.offsetLeft + "px";
        domDragging.style.top = event.target.offsetTop + block_height + "px";
    };
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
		    const domParentTemp = event.target.parentNode;
		    event.target.remove();
		    if (domParentTemp.children.length==0) {
		        domParentTemp.remove();
		    };
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
    }
}

function keydetect(dom) {
    document.addEventListener('keydown', logKey);
    var keydetect_class = "trigger_" + dom.value;

    dom.parentNode.classList.remove(keydetect_class);
    dom.parentNode.parentNode.classList.remove(keydetect_class);

    function logKey(event) {
        dom.value = event.code;
        document.removeEventListener('keydown', logKey);
        var keydetect_class = "trigger_" + event.code;

        dom.parentNode.classList.add(keydetect_class);
        dom.parentNode.parentNode.classList.add(keydetect_class);
    }
}

document.onkeydown = function keypress(event) {
    eval("run('trigger_"+event.code+"')");
}




let eventchange = function eventchange(dom) {
    dom.parentNode.className = "block event css_block trigger_custom_ " + dom.textContent
    dom.parentNode.parentNode.className = "trigger_custom_" + dom.textContent
}

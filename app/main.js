require('./style.css');


// 根据id来get DOM元素
const $ = (id) =>{return document.getElementById(id)};

let killCube = {
    clock : null,
    speed : 4,
    start : $('start'),
    score : $('score')
};

// 让黑块动起来
killCube.move = () => {
    let con = $('con'),
        top = parseInt(window.getComputedStyle(con, null)['top']);

    (killCube.speed + top > 0) ? (top = 0) : ( top += killCube.speed );
    con.style.top = top + 'px';

    if(top === 0){
        killCube.createRow();
        con.style.top = '-100px';
        killCube.delRow();
    }else if(top === (-100 + killCube.speed)){
        let rows = con.childNodes;
        if((rows.length === 5) && (rows[rows.length-1].pass !== 1) ){
            killCube.fail();
        }
    }
};

/*
 *    初始化 init
 */
killCube.init = () => {
    killCube.score.innerHTML = 0;
    killCube.speed = 4;
    for(let i=0; i<4; i++){
        killCube.createRow();
    }

    // 添加onclick事件
    $('main').onclick = (ev) =>{ killCube.judge(ev) };

    // 定时器 每30毫秒调用一次killCube.move()
    // 这里是不是可以generator 进行异步编程重写
    killCube.clock = window.setInterval( () => {killCube.move()}, 30);
};

// 判断是否点击黑块
killCube.judge = (ev) => {
    if(ev.target.className.indexOf('black') === -1){
        // ev.target.className = 'cell red';
        // fail();
        // pass;
    }else{
        ev.target.className = 'cell';
        ev.target.parentNode.pass = 1; //定义属性pass，表明此行row的黑块已经被点击
        killCube.scoreAdd();
    }
};

// 游戏结束
killCube.fail = () => {
    clearInterval(killCube.clock);
    let main = $('main'),
         con = $('con');
    main.removeChild(con);
    confirm('你的最终得分为 ' + parseInt(killCube.score.innerHTML) );

    let div = document.createElement('div');
    div.setAttribute("id",'con');
    main.appendChild(div);
};


// 创建div, className是其类名
killCube.createDiv = (className) =>{
    let div = document.createElement('div');
    div.className = className;
    return div;
};

// 创造一个<div class="row">并且有四个子节点<div class="cell">
killCube.createRow = () =>{
    let con = $('con'),
        row = killCube.createDiv('row'), //创建div className=row
        arr = killCube.createCell(); //定义div cell的类名,其中一个为cell black

    con.appendChild(row); // 添加row为con的子节点

    for(let i = 0; i < 4; i++){
        row.appendChild(killCube.createDiv(arr[i])); //添加row的子节点 cell
    }

    if(con.firstChild === null){
        con.appendChild(row);
    }else{
        con.insertBefore(row, con.firstChild);
    }
};


// 创建一个类名的数组，其中一个为cell black, 其余为cell
killCube.createCell = () =>{
    let temp = ['cell', 'cell', 'cell', 'cell'],
           i = Math.floor(Math.random()*4);
    temp[i] = 'cell black';
    return temp;
};

// 加速函数
killCube.speedUp = () =>{
    killCube.speed += 2;
    if(killCube.speed === 20){
        window.alert('你超神了');
    }
};

// 删除行
killCube.delRow = () =>{
    let con = $('con');
    if(con.childNodes.length === 6) {
        con.removeChild(con.lastChild);
    }
};

killCube.scoreAdd = () => {
    let newScore = parseInt(killCube.score.innerHTML) + 1;
    killCube.score.innerHTML = newScore;
    if(newScore % 10 === 0){
        killCube.speedUp();
    }
};

killCube.start.onclick = () => {killCube.init()};
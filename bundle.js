/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _music = __webpack_require__(1);

__webpack_require__(2);


// 根据id来get DOM元素
var $ = function $(id) {
    return document.getElementById(id);
};

var killCube = {
    clock: null,
    speed: 2,
    start: $('start'),
    score: $('score'),
    flag: false
};

// 让黑块动起来
killCube.move = function () {
    var con = $('con'),
        top = parseInt(window.getComputedStyle(con, null)['top']);

    killCube.speed + top > 0 ? top = 0 : top += killCube.speed;
    con.style.top = top + 'px';

    if (top === 0) {
        killCube.createRow();
        con.style.top = '-100px';
        killCube.delRow();
    } else if (top === -100 + killCube.speed) {
        var rows = con.childNodes;
        if (rows.length === 5 && rows[rows.length - 1].pass !== 1) {
            killCube.fail();
        }
    }
};
//
/*
 *    初始化 init
 */
killCube.init = function () {
    killCube.flag = true;
    killCube.score.innerHTML = 0;
    killCube.speed = 2;
    for (var i = 0; i < 4; i++) {
        killCube.createRow();
    }

    // 添加onclick事件
    $('main').onclick = function (ev) {
        killCube.judge(ev);
    };

    killCube.clock = requestAnimationFrame(function moveALL() {
        killCube.move();
        if (killCube.flag === true) {
            killCube.clock = requestAnimationFrame(moveALL);
        }
    });
};

// 判断是否点击黑块
killCube.judge = function (ev) {
    if (ev.target.className.indexOf('black') === -1) {
        // ev.target.className = 'cell red';
        // fail();
        // pass;
    } else {
        var songsIndex = killCube.score.innerHTML % 44;
        var audio = new Audio('data:audio/mpeg;base64,' + _music.music[songsIndex]);
        audio.play();
        ev.target.className = 'cell';
        ev.target.parentNode.pass = 1; //定义属性pass，表明此行row的黑块已经被点击
        killCube.scoreAdd();
    }
};

// 游戏结束
killCube.fail = function () {
    killCube.flag = false;
    cancelAnimationFrame(killCube.clock);
    var main = $('main'),
        con = $('con');
    main.removeChild(con);
    confirm('你的最终得分为 ' + parseInt(killCube.score.innerHTML));

    var div = document.createElement('div');
    div.setAttribute("id", 'con');
    main.appendChild(div);
};

// 创建div, className是其类名
killCube.createDiv = function (className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
};

// 创造一个<div class="row">并且有四个子节点<div class="cell">
killCube.createRow = function () {
    var con = $('con'),
        row = killCube.createDiv('row'),
        //创建div className=row
    arr = killCube.createCell(); //定义div cell的类名,其中一个为cell black

    con.appendChild(row); // 添加row为con的子节点

    for (var i = 0; i < 4; i++) {
        row.appendChild(killCube.createDiv(arr[i])); //添加row的子节点 cell
    }

    if (con.firstChild === null) {
        con.appendChild(row);
    } else {
        con.insertBefore(row, con.firstChild);
    }
};

// 创建一个类名的数组，其中一个为cell black, 其余为cell
killCube.createCell = function () {
    var temp = ['cell', 'cell', 'cell', 'cell'],
        i = Math.floor(Math.random() * 4);
    temp[i] = 'cell black';
    return temp;
};

// 加速函数
killCube.speedUp = function () {
    killCube.speed += .6;
};

// 删除行
killCube.delRow = function () {
    var con = $('con');
    if (con.childNodes.length === 6) {
        con.removeChild(con.lastChild);
    }
};

killCube.scoreAdd = function () {
    var newScore = parseInt(killCube.score.innerHTML) + 1;
    killCube.score.innerHTML = newScore;
    if (newScore % 10 === 0) {
        killCube.speedUp();
    }
};

killCube.start.onclick = function () {
    killCube.init();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
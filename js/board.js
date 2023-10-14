(function(w){
  var basicCell = {
    size: 50
  }

  var board = w.document.getElementById('board');
  board.style.width = basicCell.size * 13 + 'px'
  board.style.height = basicCell.size * 13 + 'px'
  var info = w.document.createElement('div')
  info.className = 'popup';


  var COLORS = [
    'rgb(255 255 0)',
    'rgb(51 51 204)',
    'rgb(255 204 102)',
    'rgb(0 204 153)',
    'rgb(255 51 0)'
  ]
  var NAMES = ["P","O","A","D","TJ"];

  var cells = [];

  function addCell(dir, count=1) {
    var lastCell = cells[cells.length - 1];
    
    var newCell = {
      left: lastCell.left,
      top: lastCell.top,
      color: COLORS[cells.length % COLORS.length],
      name: NAMES[cells.length % COLORS.length]
    }
    if (dir == 'right') {
      newCell.left += basicCell.size
    } else if (dir == 'left') {
      newCell.left -= basicCell.size
    } else if (dir == 'up') {
      newCell.top -= basicCell.size;
    } else if (dir == 'down') {
      newCell.top += basicCell.size;
    } 

    cells.push(newCell);
    if (count > 1) {
      addCell(dir, count - 1);
    }
  }

  const DOWN = 'down';
  const UP = 'up';
  const LEFT = 'left';
  const RIGHT = 'right';
  
  const BOARDS = {
    original: {
      firstCell: {left: 5, top: 9},
      cells: [
      [DOWN, 2], [LEFT, 4], [UP, 4], [RIGHT, 2], [UP, 2],
      [LEFT, 2], [UP, 4], [RIGHT, 4], [DOWN, 2], [RIGHT, 2],
      [UP, 2], [RIGHT, 4], [DOWN, 4], [LEFT, 2], [DOWN, 2],
      [RIGHT, 2], [DOWN, 4], [LEFT, 4], [UP, 2]
    ]},
    snake:{
      firstCell: {left: 1, top: 1},
      cells: [
        [RIGHT, 10], [DOWN, 2], 
        [LEFT, 10], [DOWN, 2],
        [RIGHT, 10], [DOWN, 2], 
        [LEFT, 10], [DOWN, 2],
        [RIGHT, 6]
      ]
    }
  }

  function create(type = 'original') {
    const board = BOARDS[type];
    if (!board) throw new Error(`Do not know how to create board ${type}`);

    const firstCell = {
      left: basicCell.size * board.firstCell.left,
      top: basicCell.size * board.firstCell.top,
      color: COLORS[0],
      name: NAMES[0],
    }
    cells.push(firstCell);
    board.cells.forEach(([dir, count])=>addCell(dir, count));

  }

  function render() {
    board.innerHTML = ''
    board.appendChild(info);

    cells.forEach((cell, i) => {
      var div = w.document.createElement('div');
      var contentDiv = w.document.createElement('div');
      var txtDiv = w.document.createElement('div');
      var txt = w.document.createTextNode(cell.name);
      txtDiv.appendChild(txt);
      div.appendChild(txtDiv);
      txtDiv.className = 'cellText';
      div.appendChild(contentDiv);
      contentDiv.className = 'cellContent';
      cell.contentDiv = contentDiv;

      div.className = 'cell';
      div.style.left = cell.left + 'px';
      div.style.top = cell.top + 'px';
      div.style.width = basicCell.size + 'px';
      div.style.height = basicCell.size + 'px';
      div.style.backgroundColor = cell.color;
      board.appendChild(div)
    });
  }
  var players = [];

  function addPlayer({id, icon, color, atCell, name} = {}) {
    var icons = ["cat", "dog", "fish", "car", "tree", "home", "star", "smile", "heart", "rocket"];
    var colors = ['#58c545', '#f06f38', '#51140b']
    var index = players.length;
    var player = {
      id: id || index,
      atCell: atCell || 0,
      icon: icon || icons[index],
      color: color || colors[index % colors.length],
    }
    player.name = name || player.icon
    var div = w.document.createElement('div');

    div.style.zIndex = 1;
    div.onmouseenter = (e)=>{
      player.div.appendChild(info);
      info.innerHTML = player.name;
      info.style.visibility = 'visible';
    }
    div.onmouseleave = (e)=>{
      info.style.visibility = 'hidden';
    }
    div.className = 'player';
    div.innerHTML = '<i class="fas fa-' + player.icon + '" style="color: '+ player.color + '"></i>';
    player.div = div;

    cells[player.atCell].contentDiv.appendChild(div);

    players.push(player)
    return player;
  }

  function movePlayer(idx, count) {
    if (idx > players.length) {
      console.error("No such player " + idx);
      return;
    }
    var player = players[idx];
    player.atCell += count;

    var currentCell = cells[player.atCell]
    currentCell.contentDiv.appendChild(player.div);
    return currentCell;
  }
  function cellOfPlayer(id) {
    return cells[players[id].atCell];
  }

  function reset() {
    players.forEach(p=>{
      p.div.parentElement.removeChild(p.div);
    })
    players.length = 0;
  }

  create();

  w.pictionaryBoard = {
    reset,
    render,
    addPlayer,
    movePlayer,
    cellOfPlayer,
    players
  }


})(window)
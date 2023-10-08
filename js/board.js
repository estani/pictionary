(function(w){
  var basicCell = {
    size: 50
  }

  var board = w.document.getElementById('board');
  board.style.width = basicCell.size * 13 + 'px'
  board.style.height = basicCell.size * 13 + 'px'
  var info = w.document.createElement('div')
  info.style.backgroundColor = 'red';

  var COLORS = [
    'rgb(255 255 0)',
    'rgb(51 51 204)',
    'rgb(255 204 102)',
    'rgb(0 204 153)',
    'rgb(255 51 0)'
  ]
  var NAMES = ["P","O","A","D","TJ"];

  var cells = [{
    left: basicCell.size * 5,
    top: basicCell.size * 9,
    color: COLORS[0],
    name: NAMES[0],
  }];

  function addCell(dir) {
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
  }

  function init() {
    addCell('down');
    addCell('down');
    addCell('left');
    addCell('left');
    addCell('left');
    addCell('left');
    addCell('up');
    addCell('up');
    addCell('up');
    addCell('up');
    addCell('right');
    addCell('right');
    addCell('up');
    addCell('up');
    addCell('left');
    addCell('left');
    addCell('up');
    addCell('up');
    addCell('up');
    addCell('up');
    addCell('right');
    addCell('right');
    addCell('right');
    addCell('right');
    addCell('down');
    addCell('down');
    addCell('right');
    addCell('right');
    addCell('up');
    addCell('up');
    addCell('right');
    addCell('right');
    addCell('right');
    addCell('right');
    addCell('down');
    addCell('down');
    addCell('down');
    addCell('down');
    addCell('left');
    addCell('left');

    addCell('down');
    addCell('down');
    addCell('right');
    addCell('right');
    addCell('down');
    addCell('down');
    addCell('down');
    addCell('down');
    addCell('left');
    addCell('left');
    addCell('left');
    addCell('left');
    addCell('up');
    addCell('up');
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

  function addPlayer() {
    var icons = ["cat", "dog", "fish", "car", "tree", "home", "star", "smile", "heart", "rocket"];
    var colors = ['#58c545', '#f06f38', '#51140b']
    var index = players.length;
    var player = {
      id: index,
      atCell: 0,
      icon: icons[index],
      color: colors[index % colors.length]
    }
    var div = w.document.createElement('div');
    div.style.zIndex = 1;
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
  init();
  w.pictionaryBoard = {
    render,
    addPlayer,
    movePlayer,
    cellOfPlayer,
    players
  }


})(window)
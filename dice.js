function diceFace(struct, color, justifyContent, alignContent) {
  if (!struct instanceof Array)
    return false;
  this.struct = struct;
  this.color = color || '#333';
  this.justifyContent = justifyContent || 'center';
  this.alignContent = alignContent || 'center';
}

var diceFaces = [
  '',
  new diceFace([1], '#ea2000'),
  new diceFace([2], null, 'space-between'),
  new diceFace([3], null, 'space-between'),
  new diceFace([2, 2], '#ea2000', 'space-between', 'space-between'),
  new diceFace([2, 1, 2], null, ['space-between', 'center', 'space-between'], 'space-between'),
  new diceFace([2, 2, 2], null, 'space-between', 'space-between')
]

function drawDice(obj, number) {
  var dice = diceFaces[number];
  obj.style.justifyContent = dice.alignContent;
  obj.innerHTML = '';
  for (var i = 0; i < dice.struct.length; i++) {
    var column = document.createElement('div');

    if (dice.justifyContent instanceof Array)
      column.style.justifyContent = dice.justifyContent[i];
    else
      column.style.justifyContent = dice.justifyContent;

    for (var j = 0; j < dice.struct[i]; j++)
      $(column).append($('<div></div>').css('background-color', dice.color))
    $(obj).append(column);
  }
}

function getDice(obj) {
  var diceSequence = [];
  while (diceSequence.length < 50) {
    var temp = Math.round(Math.random() * 6);
    if (temp < 1 || temp > 6) continue;
    diceSequence.push(temp);
  }
  i = 0;
  $(obj).addClass('dice-running');
  var counter = setInterval(function() {
    drawDice(obj, diceSequence[i]);
    i++;
    if (i == 50) {
      clearInterval(counter);
      $(obj).removeClass('dice-running');
      $('.btn').removeClass('btn-disable');
      $('.btn').removeAttr('disabled');
    }
  }, 50)
  return true;
}

$(document).ready(function() {
  $('.btn').click(function() {
    getDice(document.querySelector('.dice'));
    $(this).addClass('btn-disable');
    $(this).attr('disabled', "true");
  })
});

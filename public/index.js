//materialize init
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false,
  });
});

const soundBoard = new Grid(4, 4, document.getElementById('padOutput'));
soundBoard.getAudio();

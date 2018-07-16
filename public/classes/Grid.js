function Grid(colCount, rowCount, outputElement) {
  this.colCount = colCount;
  this.rowCount = rowCount;
  this.outputElement = outputElement;

  this.boundClickEvent.bind(this);
}

Grid.prototype = {
  createCells: function() {
    this.cellArray = [];
    for (let _colIndex = 0; _colIndex < this.colCount; _colIndex++) {
      const colElement = document.createElement('div');
      this.outputElement.appendChild(colElement);
      colElement.classList.add('row');
      this.cellArray.push([]);
      for (let colIndex = 0; colIndex < this.rowCount; colIndex++) {
        const cell = new Cell(_colIndex, colIndex);
        colElement.appendChild(cell.element);
        this.cellArray[_colIndex].push(cell);
        if (this.audioArray.length) {
          cell.bindAudio(this.audioArray.pop());
          cell.element.addEventListener('click', this.boundClickEvent);
        }
      }
    }
  },
  getAudio: function() {
    fetch('http://localhost:3000/public/audio', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async function(response) {
        if (response.ok) {
          return response.json();
        } else throw await response.json();
      })
      .then(data => {
        this.audioArray = data;
        console.log('Success:', data);
      })
      .then(() => this.createCells())
      .catch(error => console.log('Error:', error.message));
  },

  boundClickEvent: function(event) {
    event.target.audio.play();
  },
};

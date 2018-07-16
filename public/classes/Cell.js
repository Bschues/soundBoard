function Cell(columnIndex, rowIndex) {
  this.rowIndex = rowIndex;
  this.columnIndex = columnIndex;
  this.addElement();
}

Cell.prototype = {
  addElement: function() {
    this.element = document.createElement('div');
    this.addMultipleClasses(['cell', 'valign-wrapper', 'playSound']);
    this.element.dataset.rowIndex = this.rowIndex;
    this.element.dataset.columnIndex = this.columnIndex;
    return this.element;
  },
  bindAudio: function(url) {
    const audio = document.createElement('AUDIO');
    const text = document.createElement('h6');
    audio.src = `./audio/${url}`;
    // audio.style.visibility = 'hidden';
    this.element.audio = audio;
    this.element.appendChild(audio);
    this.element.appendChild(text);
    // text.classList.add('truncate');
    text.classList.add('center');

    text.textContent = url.split('.')[0];
  },

  updateElementContent: function(content) {
    this.outputElement.textContent = content;
    return this.element;
  },
  changeSize: function(width, height) {
    this.element.style.height = height;
    this.element.style.width = width;
  },
  addClass: function(newClass) {
    this.element.classList.add(newClass);
    return this.element;
  },
  swapClasses: function(oldClass, newClass) {
    this.element.classList.remove(oldClass);
    this.element.classList.add(newClass);
    return this.element;
  },
  addStyle: function(propertyName, value) {
    this.element.style[propertyName] = value;
    return this.element;
  },
  appendCellChild: function(childElement) {
    this.element.appendChild(childElement);
  },
  addMultipleClasses: function(array) {
    for (let i = 0; i < array.length; i++) {
      this.element.classList.add(array[i]);
    }
  },
  constructor: Cell,
};

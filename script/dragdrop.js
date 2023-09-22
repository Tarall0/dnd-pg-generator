function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev, targetId) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var targetElement = document.getElementById(targetId);
    var draggedElement = document.getElementById(data);

    // Swap the positions of the dragged element and the target element
    var temp = targetElement.innerHTML;
    targetElement.innerHTML = draggedElement.innerHTML;
    draggedElement.innerHTML = temp;
  }
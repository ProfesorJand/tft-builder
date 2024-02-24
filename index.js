function allowDrop(ev){
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data=ev.dataTransfer.getData("text/html");
    /* Within a Mouse event you can even check the status of some Keyboard-Buttons
       such as CTRL, ALT, SHIFT. */
    if (ev.ctrlKey)
    {
      var nodeCopy = document.getElementById(data).cloneNode(true);
      nodeCopy.id = "newId"; /* We cannot use the same ID */
      ev.target.appendChild(nodeCopy);
    }
    else
      ev.target.appendChild(document.getElementById(data));
  }

function allowDrop(ev){
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data=ev.dataTransfer.getData("text");
    console.log("data",data);
    console.log("document",document.getElementById(data))
    const championNode = document.getElementById(data);
    const targetNode = ev.target;
    console.log("championNode.dataset.fromBoard",championNode.dataset.fromBoard)

    /* Within a Mouse event you can even check the status of some Keyboard-Buttons
       such as CTRL, ALT, SHIFT. */
    if (championNode.dataset.fromBoard === "true")
    {
      var nodeCopy = championNode.cloneNode(true);
      nodeCopy.id = targetNode.id + "-" + data; /* We cannot use the same ID */;
      nodeCopy.dataset.fromBoard = false;
      nodeCopy.addEventListener("dragstart",(ev)=>{
        console.log(ev.target.id)
        ev.dataTransfer.setData("text", ev.target.id);
    });


      ev.target.appendChild(nodeCopy);
    }
    else{
      ev.target.appendChild(document.getElementById(data));
    }
  }

  function drag(ev) {
    console.log(ev.target.id)
    ev.dataTransfer.setData("text", ev.target.id);
  }


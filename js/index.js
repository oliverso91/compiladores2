$(document).ready(function () {

idSel =1;

});

function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido) {

  editor.setValue(contenido);
}

/////contador columnas y filas
$("#file-input").css('visible','false');

$("#select_logo").click(function(e){
   e.preventDefault();
   $("#file-input").trigger('click');
});

document.getElementById('file-input')
  .addEventListener('change', leerArchivo, false);

  var editor = $("#contenido-archivo1");

  function getSelected()
  {
    var u     = editor.val();
    var start = editor.get(0).selectionStart;
    var end   = editor.get(0).selectionEnd;



    document.getElementById("cont").innerHTML= "C: "+start;

    return [u.substring(0, start), u.substring(end), u.substring(start, end)];


  }

document.getElementById("contenido-archivo1").onclick = function() {getSelected();};



//////////Guardar

function saveTextAsFile()
{
// grab the content of the form field and place it into a variable
      var texto = editor.getValue();
//  create a new Blob (html5 magic) that conatins the data from your form feild
    var textFileAsBlob = new Blob([texto], {type:'text/plain'});
// Specify the name of the file to be saved
    var fileNameToSaveAs = "myNewFile.txt";

// Optionally allow the user to choose a file name by providing
// an imput field in the HTML and using the collected data here
// var fileNameToSaveAs = txtFileName.text;

// create a link for our script to 'click'
    var downloadLink = document.createElement("a");
//  supply the name of the file (from the var above).
// you could create the name here but using a var
// allows more flexability later.
    downloadLink.download = fileNameToSaveAs;
// provide text for the link. This will be hidden so you
// can actually use anything you want.
    downloadLink.innerHTML = "My Hidden Link";

// allow our code to work in webkit & Gecko based browsers
// without the need for a if / else block.
    window.URL = window.URL || window.webkitURL;

// Create the link Object.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
// when link is clicked call a function to remove it from
// the DOM in case user wants to save a second file.
    downloadLink.onclick = destroyClickedElement;
// make sure the link is hidden.
    downloadLink.style.display = "none";
// add the link to the DOM
    document.body.appendChild(downloadLink);

// click the new linkyy
    downloadLink.click();
}

function destroyClickedElement(event)
{
// remove the link from the DOM
    document.body.removeChild(event.target);
}

//////save as
$(document).ready(function(){
	//code here...
//  id = document.getElementById("contenido-archivo1");
 tabSel = 'contenido-archivo'+idSel;
  console.log(tabSel);
editor = CodeMirror.fromTextArea(document.getElementById(tabSel), {
   mode: "javascript",
      lineNumbers: true,
      matchBrackets: true
  });
  editor.save();
});

////////parser



$('#compila').click(function() {

  var texto = editor.getValue();

  alert( "Handler for .click() called." + gramatica.parse(texto));

});



$(document).ready(function() {
  $('body').on('click','#create_me',function(){
      index = $('.nav-tabs li').length+1;
      $('.nav-tabs').append('<li><a href="#tab'+index+'" id="tabP'+index+'">Editor '+index+'</a></li>');
    $('.ui-page').append('<div class="container"><section id="tab'+index+'"  class="tab-content active"><div class="col-md-12"><h3>Contenido del archivo:</h3></div><div class="col-md-12"><div class="col-md-12"><textarea class="form-control codemirror-textarea" rows="25" id="contenido-archivo'+index+'"></textarea><label id="cont'+index+'" style="font-size:20px;"></label></div><div class="col-md-12"><h3>Consola:</h3><textarea class="form-control" rows="10" id="contenido-consola'+index+'"></textarea></div></div></section></div>');

    $( "#popupLogin" ).popup( "close" );
    $('a[href="#tab'+index+'"]').click();
  })

  $('.nav-tabs').on('click','li > a',function(event){
    event.preventDefault();//stop browser to take action for clicked anchor

    //get displaying tab content jQuery selector
    var active_tab_selector = $('.nav-tabs > li.active > a').attr('href');

    //find actived navigation and remove 'active' css
    var actived_nav = $('.nav-tabs > li.active');
    actived_nav.removeClass('active');

    //add 'active' css into clicked navigation
    $(this).parents('li').addClass('active');
    console.log($(this).attr('id'));

    idSel = $(this).attr('id');


    //hide displaying tab content
    $(active_tab_selector).removeClass('active');
    $(active_tab_selector).addClass('hide');

    //show target tab content
    var target_tab_selector = $(this).attr('href');

    $(target_tab_selector).removeClass('hide');
    $(target_tab_selector).addClass('active');
  });
});

//////obtener // IDEA:

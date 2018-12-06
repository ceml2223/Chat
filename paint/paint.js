var started = false;
var canvas, context;
var stampId = '';
var lastColor = 'black';
var lastStampId = '';

function init() {
    canvas = $('#imageView').get(0);
    context = canvas.getContext('2d');

    //Auto ajustamos el tamaño de la pantalla
    canvas.width  = window.innerWidth - 75;
    canvas.height = window.innerHeight - 75;

    //$('#container').get(0).addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('click', onClick, false);

    // Add events for toolbar buttons.
    $('#red').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
    $('#pink').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
    $('#fuchsia').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
    $('#orange').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
    $('#yellow').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
    $('#lime').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
    $('#green').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
    $('#blue').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
    $('#purple').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
    $('#black').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
    $('#white').get(0).addEventListener('click', function(e) { onColorClick(e.target.id); }, false);
    $('#cat').get(0).addEventListener('click', function(e) { onStamp(e.target.id); }, false);
    $('#dragonfly').get(0).addEventListener('click', function(e) { onStamp(e.target.id); }, false);
    $('#ladybug').get(0).addEventListener('click', function(e) { onStamp(e.target.id); }, false);
    $('#heart').get(0).addEventListener('click', function(e) { onStamp(e.target.id); }, false);
    $('#dog').get(0).addEventListener('click', function(e) { onStamp(e.target.id); }, false);
    $('#fill').get(0).addEventListener('click', function(e) { onFill(); }, false);
    $('#save').get(0).addEventListener('click', function(e) { onSave(); }, false);
}

function onMouseMove(ev) {
    var x, y;
    //Obtenemos la posicion del Mouse
    if (ev.layerX >= 0) {
        // Firefox
        x = ev.layerX - 50;
        y = ev.layerY - 5;
    } else if (ev.offsetX >= 0) {
        // Opera
        x = ev.offsetX - 50;
        y = ev.offsetY - 5;
    }

    if (!started) {
        started = true;

        context.beginPath();
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
    $('#stats').text(x + ', ' + y);
}

function onClick(e) {
    if (stampId.length > 0) {
        context.drawImage($(stampId).get(0), e.pageX - 90, e.pageY - 60, 80, 80);
    }
}

function onColorClick(color) {
    context.closePath();
    context.beginPath();

    //Seleccionamos el nuevo colos
    context.strokeStyle = color;

    //Resaltamos el nuevo colors
    var borderColor = 'white';
    if (color == 'white' || color == 'yellow') {
        borderColor = 'black';
    }

    $('#' + lastColor).css("border", "0px dashed white");
    $('#' + color).css("border", "1px dashed " + borderColor);

    //Guarda el ultimo color usado, para ser usado
    lastColor = color;
}

function onFill() {

    context.closePath();
    context.beginPath();

    context.fillStyle = context.strokeStyle;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

//Funcion para las imagenes
function onStamp(id) {
    stampId = '#' + id;

    if (lastStampId == stampId) {
        //Doble click para des-seleccionar la img
        stampId = '';
    }

    $(lastStampId).css("border", "0px dashed white");
    $(stampId).css("border", "1px dashed black");

    lastStampId = stampId;
}

//Funcion que guarda la imagen
function onSave() {
    var img = canvas.toDataURL("image/png");
    document.write('<img src="' + img + '"/>');
}
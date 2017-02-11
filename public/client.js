var socket = io();

$('form').submit(function() {
    var data = $('#m').val();
    socket.emit('chat message', data);
    $('#m').val('');
    return false;
});

socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
});

var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: '3000',
    path: '/produtos',
    method: 'post',
    headers: {
        'Accept' : 'application/json',
        'Content-type' : 'application/json'
    }
}

var client = http.request(configuracoes, function(resposta) {

    console.log(resposta.statusCode);

    resposta.on('data', function(body) {
        console.log('Corpo: ' + body);
    })
})

var produto = {
    titulo: '',
    descricao: 'Node Javascript',
    preco: 100
}

client.end(JSON.stringify(produto))

module.exports = function(app) {

  var listaProdutos = function(request, response) {

      var connection = app.infra.connectionFactory();
      var produtosDAO = new app.infra.ProdutosDAO(connection);

      produtosDAO.lista(function(err, results) {
          response.format({
              html: function() {
                    response.render('produtos/lista',{lista:results});
              },
              json: function() {
                    response.json(results);
              }
          })
      })
      connection.end();
  };


  app.get('/produtos', listaProdutos);

  app.get('/produtos/form', function(request, response) {
      response.render('produtos/form', {errosValidacao : {}, produto : {}})
  })

  app.post('/produtos', function(request, response) {

      request.assert('titulo', 'Titulo é obrigatório').notEmpty()
      request.assert('preco', 'Formato inválido').isFloat();

      var produto = request.body;
      var erros = request.validationErrors();

      if (erros) {
          response.format({
                html: function() {
                    response.status(400).render('produtos/form', {errosValidacao : erros, produto : produto})
                },
                json: function() {
                    response.status(400).json(erros)

                }
          })
          return
      }

      var connection = app.infra.connectionFactory();
      var produtosDAO = new app.infra.ProdutosDAO(connection);

      produtosDAO.salva(produto, function(erros, resultados) {
          console.log(erros);
          response.redirect('/produtos');
      })
  })
}

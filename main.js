$("#call").on("click", function(){
  var pokemon = $("#title").val();

  $.ajax({
    url: 'http://pokeapi.co/api/v1/pokemon/'+pokemon+'/',
    method: 'GET',
  }).done(function(response) {
    console.log(response);
    $("#results").html('  ');
      $("#results").append("<h2>"+response.name+"</h2>");
      $("#results").append("<h3>Type: "+response.types[0].name+"</h3>");
      $("#results").append("<h4>Abilities: "+response.abilities[0].name+", "+response.abilities[1].name+"</h4>");
      $("#title").val('');
  }); $.ajax({
    url: 'http://pokeapi.co/api/v1/sprite/'+pokemon+'/',
    method: 'GET',
  }).done(function(response) {
    console.log(response);
    $("#results").append("<img src=http://pokeapi.co/sprite"+response.image+">");
  })

});

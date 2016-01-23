$("#call").on("click", function(){
  var pokemon = $("#title").val();
  // var pokemon2 = $("#title").val();

  $.ajax({
    url: 'http://pokeapi.co/api/v1/pokemon/'+pokemon+'/',
    method: 'GET',
  }).done(function(response) {
    console.log(response);
    $.ajax({
      url: 'http://pokeapi.co/api/v1/sprite/'+(+pokemon+1)+'/',
      method: 'GET',
    }).done(function(response2) {
      console.log(response2)
    $("#results").html('  ');
      $("#results").append("<h2>"+response.name+"</h2>");
      //loop
      $("#results").append("<h3>Type: "+response.types[0].name+"</h3>");
      //loop
      // $("#results").append("<h4>Abilities: "+response.abilities[0].name+", "+response.abilities[1].name+"</h4>");
      $("#results").append('<img src=http://pokeapi.co'+response2.image+'/>');
      $("#title").val('');
  });
  })

});

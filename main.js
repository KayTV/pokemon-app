$("#call").on("click", function(){
  var pokemon = $("#title").val();
  // var pokemon2 = $("#title").val();

  userPokemon(pokemon);
  enemyPokemon();
});

function userPokemon(pokemon) {
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
      $("#results").append("<h3>"+response.name+"</h3>");
      $("#results").append("<p> Pokedex Number: "+response.pkdx_id+"</p>")
      //loop
      $("#results").append("<p id=\"types\">Type: </p>");
      response.types.forEach(function(val, index, array) {
        if(index !== array.length-1){
          $("#types").append(val.name+", ");
        } else {
          $("#types").append(val.name);
        }
      });
      $("#results").append("<h4>Attack: "+response.attack+", Defense: "+response.defense+", HP: "+response.hp+"</h4>");
      $("#results").append('<img src=http://pokeapi.co'+response2.image+'/>');
      $("#title").val('');
  });
  })
}

function enemyPokemon() {
  var pokemon = Math.floor(Math.random()*718) +1;
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
    $("#enemy").html('  ');
      $("#enemy").append("<h3>"+response.name+"</h3>");
      $("#enemy").append("<p> Pokedex Number: "+response.pkdx_id+"</p>")
      //loop
      $("#enemy").append("<p id=\"enemyTypes\">Type: </p>");
      response.types.forEach(function(val, index, array) {
        if(index !== array.length-1){
          $("#enemyTypes").append(val.name+", ");
        } else {
          $("#enemyTypes").append(val.name);
        }
      });
      $("#enemy").append("<h4>Attack: "+response.attack+", Defense: "+response.defense+", HP: "+response.hp+"</h4>");
      $("#enemy").append('<img src=http://pokeapi.co'+response2.image+'/>');
      $("#title").val('');
  });
  })
}

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
      $("#results").append("<h2>"+response.name+"</h2>");
      $("#results").append("<h4> Pokedex Number: "+response.pkdx_id+"</h4>")
      //loop
      $("#results").append("<h3 id=\"types\">Type: </h3>");
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
      $("#enemy").append("<h2>"+response.name+"</h2>");
      $("#enemy").append("<h4> Pokedex Number: "+response.pkdx_id+"</h4>")
      //loop
      $("#enemy").append("<h3 id=\"enemyTypes\">Type: </h3>");
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

$(document).ready( function() {
  var player;
  var enemy;

  $("#call").on("click", function(){
    var pokemon = $("#title").val();

    userPokemon(pokemon);
    enemyPokemon();
  });

  $("#battle").on("click", function(){
    battle();
  });

  function userPokemon(pokemon) {
    $.ajax({
      url: 'http://pokeapi.co/api/v1/pokemon/'+pokemon+'/',
      method: 'GET',
    }).done(function(response) {
      console.log(response);
      player = response;
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
    });
  }

  function enemyPokemon() {
    var pokemon = Math.floor(Math.random()*718) +1;
    $.ajax({
      url: 'http://pokeapi.co/api/v1/pokemon/'+pokemon+'/',
      method: 'GET',
    }).done(function(response) {
      console.log(response);
      enemy = response;
      $.ajax({
        url: 'http://pokeapi.co/api/v1/sprite/'+(+pokemon+1)+'/',
        method: 'GET',
      }).done(function(response2) {
        console.log(response2)
        $("#enemy").html('  ');
          $("#enemy").append("<h3>"+response.name+"</h3>");
          $("#enemy").append("<p> Pokedex Number: "+response.pkdx_id+"</p>")
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
    });
  }

  function battle () {
    console.log(player);
    console.log(enemy);
    while (true) {
      if (player.attack > enemy.defense) {
        enemy.hp -= 20;
        // player.hp -= 10;
      } else if (player.defense < enemy.attack) {
        player.hp -= 20;
        // enemy.hp -= 10;
      } else if (player.attack === enemy.defense || player.defense === enemy.attack) {
          player.hp -= 20;
          enemy.hp -= 20;
          prompt("Your pokemon are evenly matched!");
      }
      if (player.hp <=0 && enemy.hp <= 0) {
        prompt("Pokemon are equally matched, both fainted.");
        break;
      }
      else if (player.hp <= 0 ) {
        prompt("Your Pokemon Fainted! Battle Lost");
        break;
      }
      else if (enemy.hp <= 0) {
        prompt("Your opponent's Pokemon fainted! Battle Won!!!");
        break;
      }
      prompt("Your opponent's pokemon has " +enemy.hp+ " hit points left, while you have "
        +player.hp+ " hit points left.");
    }
  }
});

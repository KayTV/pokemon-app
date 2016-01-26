$(document).ready( function() {
  var player;
  var enemy;

  $("#call").on("click", function(){
    var pokemon = $("#title").val();

    userPokemon(pokemon);
    enemyPokemon();
  });

  $("#battle").on("click", function(){
    console.log('Battle!!!');
    battle2();
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

//   function battle () {
//     console.log(player);
//     console.log(enemy);
//     while (true) {
//       if (player.attack > enemy.defense) {
//         enemy.hp -= 20;
//         // player.hp -= 10;
//       } else if (player.defense < enemy.attack) {
//         player.hp -= 20;
//         // enemy.hp -= 10;
//       } else if (player.attack === enemy.defense || player.defense === enemy.attack) {
//           player.hp -= 20;
//           enemy.hp -= 20;
//           prompt("Your pokemon are evenly matched!");
//       }
//       if (player.hp <=0 && enemy.hp <= 0) {
//         prompt("Pokemon are equally matched, both fainted.");
//         break;
//       }
//       else if (player.hp <= 0 ) {
//         prompt("Your Pokemon Fainted! Battle Lost");
//         break;
//       }
//       else if (enemy.hp <= 0) {
//         prompt("Your opponent's Pokemon fainted! Battle Won!!!");
//         break;
//       }
//       prompt("Your opponent's pokemon has " +enemy.hp+ " hit points left, while you have "
//         +player.hp+ " hit points left.");
//     }
//   }
// });

function battle2 () {
  if (player.attack > enemy.defense) {
    enemy.hp -= 20;
  } else if (player.defense < enemy.attack) {
    player.hp -= 20;
  }
  $(".modal-body").html("<p>Your opponent's pokemon has " +enemy.hp+ " hit points left, while you have "
    +player.hp+ " hit points left. Keep Battling??</p>");
  $(".modal-body").append('<img src=http://www.toonbarn.com/wordpress/wp-content/uploads/2011/07/Pokemon-Black-White-Battling-for-the-Love-of-Bug-Types.jpg>');
    $modal = $('#resultsModal');
    console.log($modal);
    $modal.modal('show');
  if (player.attack === enemy.defense || player.defense === enemy.attack) {
      player.hp -= 20;
      enemy.hp -= 20;
      $(".modal-body").html("<p>Your pokemon are evenly matched!</p>");
      $(".modal-body").append("<img src=http://www.vizzed.com/boards/userimages/postattachments/223596-1359002011.jpg>")
      $modal.modal('show');
  } else if (player.hp <=0 && enemy.hp <= 0) {
      $(".modal-body").html("<p>Pokemon are equally matched, both fainted.</p>");
      $(".modal-body").append("<img src=http://2.bp.blogspot.com/-oMKi1odYqAA/TtnLMZTLq5I/AAAAAAAABM0/S3ppJU_zijQ/s1600/vlcsnap-1473307.png>")
      $modal.modal('show');
  } else if (player.hp <= 0 ) {
      $(".modal-body").html("<p>Your Pokemon Fainted! Battle Lost</p>");
      $(".modal-body").append("<img src=http://media.animevice.com/uploads/0/3695/287706-319.jpg>")
      $modal.modal('show');
  } else if (enemy.hp <= 0) {
      $(".modal-body").html("<p>Your opponent's Pokemon fainted! Battle Won!!!</p>");
      //image
      $(".modal-body").append("<img src=https://themoonmedia.files.wordpress.com/2014/09/1916921-ash_ketchum_friend_pikachu_kanto_johto.png>")
      $modal.modal('show');
  }
};
});

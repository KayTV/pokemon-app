$(document).ready( function() {
  var player;
  var enemy;

  $("#call").on("click", function(){
    var pokemon = $("#title").val();

    userPokemon(pokemon);
    enemyPokemon();
  });

  $("#battle").on("click", function(){
    $('#hits').html('');
    $("#fade").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#keepBattling").hide();
    $("#battleModal").show();
    battle();
  });

  $("#battleModal").on("click", function(){
    $("#keepBattling").show();
    $("#battleModal").hide();
    battleResponse();
  });

  $("#keepBattling").on("click", function(){
    $("#hits").append("<img src=http://www.clipartbest.com/cliparts/bTy/E66/bTyE66gbc.png>");
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

  function battle () {
    $(".modal-body").html('<img src=assets/red_vs_blue.jpg>');
    $(".modal-body").append("<p>Opponent wants to battle!!</p>");
    $(".modal-body").append('<img src=assets/bottom.jpg>');
      $modal = $('#resultsModal');
      $modal.modal('show');
  }

  function battleResponse () {
    $(".modal-body").html('<img src=assets/player_vs_pokemon.jpg>');
    $(".modal-body").append("<p>Opponent sent out "+enemy.name+". Go "+player.name+"!!</p>");
    $(".modal-body").append('<img src=assets/bottom.jpg>');
      $modal = $('#resultsModal');
      $modal.modal('show');
  }

function battle2 () {
  if (player.attack >= enemy.defense) {
    enemy.hp -= 20;
    player.hp -= 10;
    $(".modal-body").html('<img src=assets/Battle.jpg>');
    $(".modal-body").append("<p>Critical Hit! Your opponent has <span id='enemyhp'>" +enemy.hp+ "</span> HP left. Opponent attacked, You have <span id='playerhp'>"
      +player.hp+ "</span> HP left. Keep Battling??</p>");
    $(".modal-body").append('<img src=assets/bottom.jpg>');
      $modal = $('#resultsModal');
      console.log($modal);
      $modal.modal('show');
  } else if (player.defense <= enemy.attack) {
    player.hp -= 20;
    enemy.hp -= 10;
    $(".modal-body").html('<img src=assets/Battle.jpg>');
    $(".modal-body").append("<p>Opponent's pokemon is strong! You have <span id='playerhp'>" +player.hp+ "</span> HP left. Your pokemon attacks. Opponent has <span id='enemyhp'>"
      +enemy.hp+ "</span> HP left. Keep Battling??</p>");
    $(".modal-body").append('<img src=assets/bottom.jpg>');
      $modal = $('#resultsModal');
      console.log($modal);
      $modal.modal('show');
  } else {
      if (player.attack > enemy.attack) {
        enemy.hp -= 10;
        player.hp -= 5;
        $(".modal-body").html('<img src=assets/Battle.jpg>');
        $(".modal-body").append("<p>Pokemon are closely matched! Your opponent has <span id='enemyhp'>" +enemy.hp+ "</span> HP left. Opponent attacked, You have <span id='playerhp'>"
          +player.hp+ "</span> HP left. Keep Battling??</p>");
        $(".modal-body").append('<img src=assets/bottom.jpg>');
          $modal = $('#resultsModal');
          console.log($modal);
          $modal.modal('show');
      } else if (player.attack < enemy.attack) {
        player.hp -= 10;
        enemy.hp -= 5;
        $(".modal-body").html('<img src=assets/Battle.jpg>');
        $(".modal-body").append("<p>Pokemon are closely matched! Your opponent has <span id='enemyhp'>" +enemy.hp+ "</span> HP left. Opponent attacked, You have <span id='playerhp'>"
          +player.hp+ "</span> HP left. Keep Battling??</p>");
        $(".modal-body").append('<img src=assets/bottom.jpg>');
          $modal = $('#resultsModal');
          console.log($modal);
          $modal.modal('show');
      }

  }  $("#playerhp").css("color", "red");
     $("#enemyhp").css("color", "blue");

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
      $(".modal-body").html("<img src=assets/opponent_win.jpg>")
      $(".modal-body").append("<p>Your Pokemon Fainted! Battle Lost. Player is out of available Pokemon, Player backed away.</p>");
      $(".modal-body").append('<img src=assets/bottom.jpg>');
      $modal.modal('show');
  } else if (enemy.hp <= 0) {
      $(".modal-body").html("<img src=assets/player_win.jpg>")
      $(".modal-body").append("<p>Your opponent's Pokemon fainted! Battle Won!!!</p>");
      $(".modal-body").append('<img src=assets/bottom.jpg>');
      $modal.modal('show');
  }
};
});

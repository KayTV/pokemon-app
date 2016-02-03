$(document).ready( function() {
  var player;
  var enemy;
  var mainMusic = document.getElementById("mainMusic");
  var battleMusic = document.getElementById("battleMusic");
  var victoryMusic = document.getElementById("victoryMusic");
  var loseMusic = document.getElementById("loseMusic");

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
    playAudio();
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
          $("#results").append("<h4>Attack: "+response.attack+", Defense: "
            +response.defense+", HP: "+response.hp+"</h4>");
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
    $("#1").animate({ opacity: 1}, 200);
    $("#context").html("<p>Opponent wants to battle!!</p>");
      $modal = $('#resultsModal');
      $modal.modal('show');
  }

  function battleResponse () {
    $("#2").animate({ opacity: 1}, 200);
    $("#context").html("<p>Opponent sent out "+enemy.name+". Go "+player.name+"!!</p>");
    setTimeout(function(){
      $("#3").animate({ opacity: 1}, 200);
      $("#context").html("<p>"+enemy.name+" has <span id='enemyhp'>" +enemy.hp+
      "</span> HP and "+player.name+ " has <span id='playerhp'>" +player.hp+ "</span> HP. Battle!</p>")
      $("#playerhp").css("color", "red");
      $("#enemyhp").css("color", "blue");
    }, 700)
  }

  function playAudio() {
      battleMusic.play();
      mainMusic.pause();
      battleMusic.currentTime =1;
  }

  function winMusic(){
    battleMusic.pause();
    victoryMusic.play();
    victoryMusic.currentTime =0.5;
  }

  function lostMusic(){
    battleMusic.pause();
    loseMusic.play();
    loseMusic.currentTime =0.5;
  }

  $('body').on('hidden.bs.modal', '.modal', function () {
    mainMusic.play();
    battleMusic.pause();
    victoryMusic.pause();
    loseMusic.pause();
    battleMusic.currentTime =0;
    victoryMusic.currentTime =0;
    mainMusic.currentTime =0;
    loseMusic.currentTime =0;
    for (var i=2; i<=5; i++) {
      $("#"+i).animate({opacity: 0}, 200);
    }
    $("#1").animate({ opacity: 1}, 200);
  });

function battle2 () {
  if (player.attack >= enemy.defense && player.attack >= enemy.attack) {
    enemy.hp -= 30;
    player.hp -= 10;
    $("#context").html("<p>Critical Hit! Your opponent has <span id='enemyhp'>" +enemy.hp+
      "</span> HP left. Opponent attacked, You have <span id='playerhp'>"
      +player.hp+ "</span> HP left. Keep Battling??</p>");
  } else if (player.defense <= enemy.attack && player.attack <= enemy.attack) {
    player.hp -= 30;
    enemy.hp -= 10;
    $("#context").html("<p>Opponent's pokemon is strong! You have <span id='playerhp'>"
      +player.hp+ "</span> HP left. Your pokemon attacks. Opponent has <span id='enemyhp'>"
      +enemy.hp+ "</span> HP left. Keep Battling??</p>");
  } else {
    $("#3").animate({ opacity: 1}, 200);
      if (player.attack > enemy.attack) {
        enemy.hp -= 10;
        player.hp -= 5;
        $("#context").html("<p>Pokemon are closely matched! Your opponent has <span id='enemyhp'>"
          +enemy.hp+ "</span> HP left. Opponent attacked, You have <span id='playerhp'>"
          +player.hp+ "</span> HP left. Keep Battling??</p>");
      } else if (player.attack < enemy.attack) {
        player.hp -= 10;
        enemy.hp -= 5;
        $("#context").html("<p>Pokemon are closely matched! Your opponent has <span id='enemyhp'>"
          +enemy.hp+ "</span> HP left. Opponent attacked, You have <span id='playerhp'>"
          +player.hp+ "</span> HP left. Keep Battling??</p>");
      }

  }  $("#playerhp").css("color", "red");
     $("#enemyhp").css("color", "blue");

   if (player.hp <= 0 ) {
    $("#5").animate({ opacity: 1}, 200);
      $("#context").html("<p>Your Pokemon Fainted! Battle Lost. Player is out of available Pokemon, Player backed away.</p>");
      lostMusic();
  } else if (enemy.hp <= 0) {
    $("#4").animate({ opacity: 1}, 200);
      $("#context").html("<p>Your opponent's Pokemon fainted! Battle Won!!!</p>");
      winMusic();
  }
};
});

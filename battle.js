function battle1 () {
  $("#3").animate({ opacity: 1}, 200);
  if(player.types[0].name === "water" && enemy.types[0].name === "fire") {
    enemy.hp -= 50;
    player.hp -= 3;
    $("#context").html("<p>Critical Hit! Your opponent has <span id='enemyhp'>" +enemy.hp+
      "</span> HP left. Opponent attacked, You have <span id='playerhp'>"
      +player.hp+ "</span> HP left. Keep Battling??</p>");
      if(enemy.hp <= 0) {
        $("#4").animate({ opacity: 1}, 200);
          $("#context").html("<p>Your opponent's Pokemon fainted! Battle Won!!!</p>");
          winMusic();
      }
  } if(player.types[0].name === "fire" && enemy.types[0].name === "water") {
    player.hp -= 50;
    enemy.hp -= 3;
    $("#context").html("<p>Critical Hit! Your opponent has <span id='enemyhp'>" +enemy.hp+
      "</span> HP left. Opponent attacked, You have <span id='playerhp'>"
      +player.hp+ "</span> HP left. Keep Battling??</p>");
  }

}

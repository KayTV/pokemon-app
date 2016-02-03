function battle1 () {
  $("#3").animate({ opacity: 1}, 200);
  if(player.types === "water" && (enemy.types === "fire" || enemy.types === "rock")) {
    enemy.hp -= 50;
    player.hp -= 3;
    $("#context").html("<p>Critical Hit! Your opponent has <span id='enemyhp'>" +enemy.hp+
      "</span> HP left. Opponent attacked, You have <span id='playerhp'>"
      +player.hp+ "</span> HP left. Keep Battling??</p>");
  } else {
    battle2();
  }
}

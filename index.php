<?php
	
	$url = strtolower("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");

	if (parse_url($url, PHP_URL_PATH) === "/diezombiedie/index.php/leaderboard"){

		$userName = $_GET['uname']; // the users name
		$score = intval($_GET['score']);

		$userScoreIsOnScoreboard = false; // A flag to tell if we actually add the users score to the leaders
		
		$leaderboardFile = fopen('leaderboard.txt', 'r') or die('failed to access leaderboard'); 	//a handle to the file that we will use to store the leaderboard
		$leadersOnBoard = 0;		// an integer to keep track of the number of scores we read from the leaderboard


		$responseText = ""; // the final leaderboard text that we will save and eventually send back to the client
		// Score Username\n
		// Score1 Username1\n

		// we will want to read in no more than 10 names 
		while(!feof($leaderboardFile) && $leadersOnBoard < 10) {
			$line = chop(fgets($leaderboardFile)); // the current line we are reading
			if(strlen($line) == 0) break;
			$currentLeaderScore = intval(substr($line, 0, 9)); // the scores are separated from the leader by a single space

			if($currentLeaderScore < $score && !$userScoreIsOnScoreboard) {
				// add the score to the leaderboard
				$addedLine = sprintf("%9d %s\n", $score, $userName); // generate a line that can be displayed
				$userScoreIsOnScoreboard = 1;
				$responseText .= $addedLine;
				$leadersOnBoard++;
			}
			if($leadersOnBoard < 10){
				// add the line 
				$responseText .= $line."\n";
				$leadersOnBoard++;
			}
		}

		if(!$userScoreIsOnScoreboard && $leadersOnBoard < 10) {
			$addedLine = sprintf("%9d %s\n", $score, $userName); // generate a line that can be displayed
			$userScoreIsOnScoreboard = 1;
			$responseText .= $addedLine;
			$leadersOnBoard++;
		}

		fclose($leaderboardFile); // close the reading fileHandle

		

		if($userScoreIsOnScoreboard){

			// The leaderboard system only needs to write the file back out if we changed something
			$leaderboardFile = fopen('leaderboard.txt', 'w');
			fwrite($leaderboardFile, chop($responseText));
			fclose($leaderboardFile);
		} 



		echo $responseText;

	} else {

		?>
		<html>
		<head>
			<title>DieZombieDie</title>

			<script type="text/javascript" src="js/phaser.js"></script>
		    <script type="text/javascript" src="js/boot.js"></script>
		    <script type="text/javascript" src="js/load.js"></script>
		    <script type="text/javascript" src="js/menu.js"></script>
		    <script type="text/javascript" src="js/play.js"></script>
		    <script type="text/javascript" src="js/game.js"></script>
			<link rel="stylesheet" type="text/css" href="style.css">

		</head>
		<body>
				
		</body>
		</html>
		<? 
	} 

?>
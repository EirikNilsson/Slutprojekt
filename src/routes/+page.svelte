<script>
	import { onMount } from "svelte";
	
	onMount(() => {
	  console.log("Sidan laddades!");
	});
  </script>
  
  <div class="container">
	<div class="title">Things to do when you are bored</div>
	<div class="activities">
	  <a href="/draw">
		<img src="/draw.png" class="activity" alt="draw">
	  </a>
	  <a href="/clicker">
		<img src="/clicker.png" class="activity" alt="clicker">
	  </a>
	  <a href="/blackjack">
		<img src="/blackjack.png" class="activity" alt="blackjack">
	  </a>
	</div>
  </div>
  
  <style>
	body {
	  text-align: center;
	  font-family: Arial, sans-serif;
	}
	.container {
	  margin-top: 50px;
	}
	.title {
	  background-color: white;
	  display: inline-block;
	  padding: 10px 20px;
	  border-radius: 5px;
	  font-size: 20px;
	  font-weight: bold;
	}
	.activities {
	  display: flex;
	  justify-content: center;
	  gap: 20px;
	  margin-top: 50px;
	}
	.activity {
	  width: 100px; 
	  height: 100px;
	  background-color: lightgray;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  border-radius: 10px;
	  font-size: 16px;
	  font-weight: bold;
	}
  </style>
  
const utils = new Utils();
const rules = document.querySelector(".rules");
const scoreSpan = document.querySelector(".score-card").querySelector("span");
let score = 0;
const modal = document.querySelector(".modal");
const exitModal = document.querySelector(".modal-close");

const showModal = () => {
	modal.classList.toggle("hidden");
	exitModal.addEventListener("click", closeModal);
};

const closeModal = () => {
	modal.classList.toggle("hidden");
};

rules.addEventListener("click", showModal);

function start() {
	scoreSpan.textContent = score;
	const [paper, scissors, rock] = document.querySelectorAll(".circle-container");

	const setUserInput = ({ target }) => {
		const name = target.classList[1];
		const userChoice = utils.mapInputToValue(name);
		utils.setUserChoice(userChoice);
		utils.setHouseChoice();
		endSelection();

		setTimeout(result, 300);
	};

	const endSelection = () => {
		[paper, scissors, rock].map(value => {
			value.removeEventListener("click", setUserInput);
		});
	};

	[paper, scissors, rock].map(value => {
		value.addEventListener("click", setUserInput);
	});
}

function result() {
	const container = document.querySelector(".container");
	container.remove();

	const createUserChoiceDiv = () => {
		const userChoice = utils.getUserChoice();
		const choiceName = utils.mapValueToName(userChoice);
		const html = `
				<div class="user-choice">
					<div class="circle-container ${choiceName}">
						<div class="circle-shadow inner-circle">
							<img src="./images/icon-${choiceName}.svg" alt="${choiceName}" />
						</div>
					</div>
					<p class="picked">YOU PICKED</p>
				</div>
		`;
		return html;
	};

	const createHouseChoiceShadow = () => {
		const html = `
				<div class="house-choice">
					<div class="circle-container">
						<div class="circle-shadow">
						</div>
					</div>
					<p class="picked">THE HOUSE PICKED</p>
				</div>`;
		return html;
	};

	const createImageDiv = choiceName => {
		const img = document.createElement("img");
		img.src = utils.getImageFileName(choiceName);
		return img;
	};

	const createResultsInfo = () => {
		const result = utils.getWinner();
		const isDraw = result === "draw";

		const res = isDraw ? "DRAW" : `YOU ${result.toUpperCase()}`;

		const html = `
			<h1 class="result">${res}</h1>
			<button class="play-again">PLAY AGAIN</button>
		`;
		return html;
	};

	const showHouseChoice = () => {
		const circleContainer = document
			.querySelector(".house-choice")
			.querySelector(".circle-container");
		const circleShadow = document
			.querySelector(".house-choice")
			.querySelector(".circle-shadow");

		const houseChoice = utils.getHouseChoice();
		const choiceName = utils.mapValueToName(houseChoice);

		circleContainer.classList.add(choiceName);
		circleShadow.classList.add("inner-circle");

		const img = createImageDiv(choiceName);
		circleShadow.appendChild(img);
	};

	const showOnlyUserSelection = () => {
		const results = document.createElement("div");
		const user = createUserChoiceDiv();
		const house = createHouseChoiceShadow();

		results.classList = "results-container";
		results.innerHTML = user;
		results.innerHTML += house;
		document.body.querySelector("main").insertBefore(results, rules);
	};

	const showResults = () => {
		const resultsInfo = document.createElement("div");
		const resultsContainer = document.querySelector(".results-container");

		resultsInfo.classList = "results-info";
		const results = createResultsInfo();
		resultsInfo.innerHTML = results;

		resultsContainer.classList.add("full");
		document.body
			.querySelector("main")
			.querySelector(".results-container")
			.insertBefore(resultsInfo, document.querySelector(".house-choice"));
		if (utils.getWinner() === "win") {
			score += 1;
			scoreSpan.textContent = score;
		}

		const playAgain = document.querySelector(".play-again");
		playAgain.addEventListener("click", end);
	};

	showOnlyUserSelection();
	setTimeout(showHouseChoice, 300);
	setTimeout(showResults, 500);
}

function end() {
	const resultsContainer = document.querySelector(".results-container");
	resultsContainer.remove();

	const newContainer = document.createElement("div");
	newContainer.classList = "container";

	const html = `
				<img src="./images/bg-triangle.svg" alt="triangle" />
				<div class="circle-container paper">
					<div class="circle-shadow inner-circle">
						<img src="./images/icon-paper.svg" alt="paper" />
					</div>
				</div>

				<div class="circle-container scissors">
					<div class="circle-shadow inner-circle">
						<img src="./images/icon-scissors.svg" alt="scissors" />
					</div>
				</div>

				<div class="circle-container rock">
					<div class="circle-shadow inner-circle">
						<img src="./images/icon-rock.svg" alt="rock" />
					</div>
				</div>
	`;

	newContainer.innerHTML = html;
	document.body.querySelector("main").insertBefore(newContainer, rules);
	start();
}

start();

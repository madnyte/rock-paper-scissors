class Utils {
	constructor() {
		this.userChoice;
		this.houseChoice;
	}
	//get a random number between 0 and 2
	getRandomChoice = () => {
		return Math.floor(Math.random() * 3);
	};

	mapInputToValue = value => {
		switch (value) {
			case "rock":
				return 0;
			case "paper":
				return 1;
			case "scissors":
				return 2;
			default:
				return "Invalid input";
		}
	};

	mapValueToName = value => {
		switch (value) {
			case 0:
				return "rock";
			case 1:
				return "paper";
			case 2:
				return "scissors";
			default:
				return "Invalid input";
		}
	};

	setUserChoice = value => {
		this.userChoice = value;
	};

	setHouseChoice = () => {
		this.houseChoice = this.getRandomChoice();
	};

	getUserChoice = () => {
		return this.userChoice;
	};

	getHouseChoice = () => {
		return this.houseChoice;
	};

	getChoices = () => {
		const houseChoice = this.getHouseChoice();
		const userChoice = this.getUserChoice();

		return [userChoice, houseChoice];
	};

	getWinner = () => {
		const [userChoice, houseChoice] = this.getChoices();

		return this.compareResults(userChoice, houseChoice);
	};

	compareResults = (userChoice, houseChoice) => {
		if (userChoice === houseChoice) return "draw";
		else {
			if (userChoice === 0) {
				switch (houseChoice) {
					case 1:
						return "lose";
					case 2:
						return "win";
				}
			} else if (userChoice === 1) {
				switch (houseChoice) {
					case 0:
						return "win";
					case 2:
						return "lose";
				}
			} else if (userChoice === 2) {
				switch (houseChoice) {
					case 0:
						return "lose";
					case 1:
						return "win";
				}
			}
		}
	};

	getImageFileName = choiceName => {
		return `./images/icon-${choiceName}.svg`;
	};
}

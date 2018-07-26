import React, {Component} from "react";
import Card from "./Card";

export default class CardDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 0,
			arrColor: []
		};
		this.handleCounter = this.handleCounter.bind(this);
	}

	handleCounter(num, color) {
        var colors = [...this.state.arrColor, color];
        console.log(colors)
		this.setState({counter: num, arrColors: colors}, function() {
			console.log(this.state.counter);
			if (this.state.counter > 2) {
				console.log(this.state.arrColor);
				var checkDupe = new Set(this.state.arrColor);
				if (checkDupe.size == 1) {
					console.log("IT MATCHES!");
				} else {
					console.log("it doesn't match");
				}
			}
		});
	}
	render() {
		var {cards} = this.props;
		var displayCards = cards.map((el, i) => {
			return <Card counter={this.state.counter} handleCounter={this.handleCounter} key={el.id} card={el} />;
		});
		return <div style={{display: "flex", flexWrap: "wrap", width: "100%", height: "100%"}}>{displayCards}</div>;
	}
}

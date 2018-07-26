import React, {Component} from "react";
import "./MemoryApp.css";
import Card from "./Card";

const CardState = {
	hiding: 0,
	showing: 1,
	matching: 2
};

class MemoryApp extends Component {
	constructor(props) {
		super(props);
		let cards = [
			{id: 0, cardState: CardState.hiding, backgroundColor: "red"},
			{id: 1, cardState: CardState.hiding, backgroundColor: "red"},
			{id: 2, cardState: CardState.hiding, backgroundColor: "blue"},
			{id: 3, cardState: CardState.hiding, backgroundColor: "blue"},
			{id: 4, cardState: CardState.hiding, backgroundColor: "green"},
			{id: 5, cardState: CardState.hiding, backgroundColor: "green"},
			{id: 6, cardState: CardState.hiding, backgroundColor: "purple"},
			{id: 7, cardState: CardState.hiding, backgroundColor: "purple"},
			{id: 8, cardState: CardState.hiding, backgroundColor: "pink"},
			{id: 9, cardState: CardState.hiding, backgroundColor: "pink"},
			{id: 10, cardState: CardState.hiding, backgroundColor: "black"},
			{id: 11, cardState: CardState.hiding, backgroundColor: "black"},
			{id: 12, cardState: CardState.hiding, backgroundColor: "navy"},
			{id: 13, cardState: CardState.hiding, backgroundColor: "navy"},
			{id: 14, cardState: CardState.hiding, backgroundColor: "lightblue"},
			{id: 15, cardState: CardState.hiding, backgroundColor: "lightblue"}
		];
		this.state = {cards: this.shuffle(cards), noClick: false};
		this.shuffle = this.shuffle.bind(this);
		this.handleShow = this.handleShow.bind(this);
	}

	shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	handleShow(id) {
		const mapCardState = (cards, idsToChange, newCardState) => {
			return cards.map(el => {
				if(idsToChange.includes(el.id)){
					return {
						...el,
						cardState: newCardState
					}
				}
				return el;
			})
		}

		const foundCard = this.state.cards.find(el => el.id === id);

		if(this.state.noClick || foundCard.cardState !== CardState.hiding){
			return;
		}
		let noClick = false;

		let cards = mapCardState(this.state.cards, [id], CardState.showing)

		const showingCards = cards.filter(el => el.cardState === CardState.showing)

		const ids = showingCards.map(el => el.id)

		if(showingCards.length === 2 && showingCards[0].backgroundColor === showingCards[1].backgroundColor){
			cards = mapCardState(cards, ids, CardState.matching);
		}
		else if(showingCards.length ===2){
			let hidingCards = mapCardState(cards, ids, CardState.hiding);
			noClick = true;
			this.setState({cards, noClick}, () => {
				setTimeout(() => {
					this.setState({cards: hidingCards, noClick: false})
				}, 1300)
			})
			return;
		}
		this.setState({cards, noClick});

	}
	render() {
		var displayCard = this.state.cards.map((el) => {
			return <Card 
			key={el.id} 
			card={el} 
			showing={el.cardState !== CardState.hiding} 
			onClick={() => this.handleShow(el.id)} />;
		});
		return <div style={{display: "flex", flexWrap: "wrap"}}>{displayCard}</div>;
	}
}

export default MemoryApp;

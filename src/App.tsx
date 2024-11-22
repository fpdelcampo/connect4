import { useEffect, useState } from 'react';
import Board from './Components/Board';
import { evaluation, findBestMove, heuristic } from './algorithms/minimax'

function App() {
  	// 0 = empty, 1 = player 1, -1 = player 2
  	const [values, setValues] = useState<number[]>(Array(42).fill(0));
	const [hovered, setHovered] = useState<number | null>(null)
	const [move, setMove] = useState<number>(0)
	const [state, setState] = useState<number | null>(null)
	const [toggle, setToggle] = useState('Yellow')

	function toggleButton() {
		setToggle((toggle) => toggle === 'Yellow' ? 'Red' : "Yellow")
		reset()
	}

	function handleMouseEnter(col: number) {
		if(toggle === "Yellow" && move % 2 !== 0) {
			return
		}
		if(toggle === 'Red' && move % 2 !== 1) {
			return
		}
		setHovered(col)
	}

	function handleMouseLeave() {
		setHovered(null)
	}

	function onDrop(col: number) {
		if(toggle === "Yellow" && move % 2 !== 0) {
			return
		}
		if(toggle === 'Red' && move % 2 !== 1) {
			return
		}
		if(state !== null) {
			return
		}
		for(let row = 0; row < 6; row++) {
			const index = row * 7 + col
			if(values[index] === 0) {
				const newValues = [...values]
				newValues[index] = (move % 2) ? -1 : 1
				setValues(newValues)
				setMove((move) => move + 1)
				return
			}
		}
	}

	function reset() {
		setValues(Array(42).fill(0))
		setState(null)
		setHovered(null)
		setMove(0)
	}

	function display() {
		if(state === 0) {
			return "It's a tie!"
		}
		if(state === 1) {
			return "Yellow wins!"
		}
		if(state === -1) {
			return "Red wins"
		}
	}

	useEffect(() => {
		const evaluate = evaluation(values, move)
		setState(evaluate)
		if(evaluate === null && move % 2 === (toggle === 'Yellow' ? 1 : 0)) {
			const bestMove = findBestMove(values, 4, (values) => heuristic(values, 1, 5, 20))
			const newValues = [...values]
			newValues[bestMove] = move % 2 ? -1 : 1
			setMove((move) => move + 1)
			setValues(newValues)	
		}
	}, [values, move, toggle])

	return (
		<div className="flex justify-center items-center h-screen bg-orange-200">
			<div className='flex flex-col items-center justify-center'>
				<Board
					values={values}
					onDrop={onDrop}
					hovered={hovered} // Pass the hovered column to the Board
					handleMouseEnter={handleMouseEnter} // Handle column hover
					handleMouseLeave={handleMouseLeave} // Handle column hover leave
				/>
				<p className='mt-20 font-bold text-xl'>Playing as {toggle}. {toggle} goes {toggle === "Yellow" ? "first" : "second"}!</p>
				<div
					onClick={toggleButton}
					className={`w-16 h-8 mt-10 flex items-center rounded-full p-1 cursor-pointer transition-all transition-colors duration-300 ${
						toggle === "Yellow" ? 'bg-green-500' : 'bg-gray-400'
					}`}>

					<div
						className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
						toggle === "Yellow"? 'translate-x-7' : 'translate-x-0' // Ball moves based on toggle state
					}`}></div>
				</div>
				{state !== null && 
					<div className=''>
						<div className='font-bold text-xl text-center py-10'>{display()}</div>
						<button className='bg-gray-100 h-10 w-40 border border-black rounded-lg' onClick={reset}>Play Again!</button>
					</div>
				}
			</div>
		</div>
 	 );
}

export default App;

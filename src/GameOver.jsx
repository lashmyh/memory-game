
export const GameOver = ({ onRestart }) => {
    return (
        <div className="game-over">
            <h2>Game Over!</h2>
            <button onClick={onRestart}>Restart Game</button>

        </div>

    )

}
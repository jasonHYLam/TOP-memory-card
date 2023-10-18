export function ScoreDisplay({score, highestScore}) {
    return (
        <>
            <p>highest:  {highestScore}</p>
            <p>current:  {score}</p>
        </>
    )
}
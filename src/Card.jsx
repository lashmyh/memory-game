

export const Card = ({ character, onClick }) => {
    return (
        <div className="card" onClick={onClick} >
              <h3>{character.name}</h3>
              <img src={character.sprite} alt={character.name} />
            </div>

    )
}
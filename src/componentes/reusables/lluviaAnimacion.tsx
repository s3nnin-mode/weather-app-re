export const LluviaAnimacion = () => {
    return (
        <div className='animacion-lluvia'>
        {
            Array.from({length: 10}, (_, i) => {
            return (
                <div 
                style={{left: `${Math.floor(Math.random() * 100)}%`, animationDuration: `${Math.random() * 2}s`}}
                className='gota' />
            )
            })
        }
        </div>
    )
}
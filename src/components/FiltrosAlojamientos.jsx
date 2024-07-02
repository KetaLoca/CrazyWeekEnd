import react from "@vitejs/plugin-react-swc";

export function FiltrosAlojamientos() {
    return (
        <header>
            <h1>Buscador de alojamientos</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputQuery} name='query' placeholder='Barra de búsqueda' />
                <input type='checkbox' onChange={handleSort} checked={sort} />
                <button className='boton' type='submit'>Buscar</button>
            </form>
            {error && <p style={{ color: 'red' }} className='error'>{error}</p>}
        </header>
    )
}
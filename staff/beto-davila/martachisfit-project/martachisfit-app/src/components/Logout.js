import salida from '../components/icons/salida.png'
import './styles/Logout.sass'

export default function Logout ({onRefresh, name}) {

    return (<>
    <section className="logout">
        <img className="logout__img" alt="salida" src={salida}></img>
        <h1>¡Esperamos volver a verte por aquí pronto, {name}!</h1>
        <a className="logout__signin" href='#' onClick={onRefresh}>Volver a iniciar</a>
    </section>
    </>)
}
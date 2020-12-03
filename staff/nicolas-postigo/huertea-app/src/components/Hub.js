import React from 'react'
import './Hub.sass'

//import { retrieveUser } from '../logic'
import ListOffers from './ListOffers'

function Hub({ fullname, onHub, onGoCreateoffer, offers }) {

    return <sections>
        <form className="search_form" onSubmit={function (event) {
            event.preventDefault()
            var product = event.target.query.value
            onHub(product)
        }}>
            <input className="searcher" type="text" name="query" placeholder="🔍 Busca en huertea" />
        </form>
        <h3>Hey {fullname}!</h3>
        <h3>¿Qué alimento quieres hoy? </h3>
{/*         <div>
        {offers}
        </div>
 */}        <div>
            <button onClick={onGoCreateoffer} className="offer">crea tu oferta &#127806;</button>
        </div>
        <ListOffers offers={offers} />

    </sections>

}

export default Hub

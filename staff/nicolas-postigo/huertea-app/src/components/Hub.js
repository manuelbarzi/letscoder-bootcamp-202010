import React from 'react'
import './Hub.sass'
import { useState } from 'react'
//import { retrieveUser } from '../logic'
import ListOffersRetrieve from './ListOffersRetrieve'
import SearchOffers from './SearchOffers'
import FindOffer from './FindOffer'
import Detail from './Detail'
import { retrieveOffer } from './../logic'
import Useroffers from './Useroffers'
import {Link} from 'react-router-dom'
import {deleteOffer} from './../logic'


function Hub({ fullname, onHub, onGoCreateoffer, onRetrieveUserOffers, offers, useroffers }) {
    const [results, setResults] = useState()
    const [view, setView] = useState('default')
    const [offer, setOffer] = useState([])


    const handleGoSearcher = (results) => {
        setResults(results)
        setView('offersfound')
    }

    const handleGoUserOffers = (results) => {
        setResults(results)
        setView('user-offers')
    }
    const handleGoDetail = (event, offer) => {
        event.preventDefault()
        try {
            setOffer(offer)
            setView("detail")


        } catch (error) {
            alert(error.message)
        }

    }

    

    const handleGoDelete = (id) => {
        const { token } = sessionStorage
        try {
debugger

            deleteOffer(token, id, (error, offerId) => {
            if (error) return alert (error.message)
            setView("user-offers")

            })
        } catch (error) {
            alert(error.message)
        }
    }
    

return <sections>
        <div>
        {/* <button onClick={(evento)=>onRetrieveUserOffers(evento)} className="retrieve-offer">mis ofertas &#127806;</button> */}
        <button onClick={()=>{onRetrieveUserOffers(); handleGoUserOffers()}} className="retrieve-offer">mis ofertas &#127806;</button>
    </div>
    <form className="search_form" onSubmit={function (event) {
        event.preventDefault()
        var product = event.target.query.value
        onHub(product)
    }}>
    </form>
    <h3>Bienvenid@ {fullname}!</h3>
    <h3>¿Qué alimento quieres hoy? </h3>

    <div>
        <button onClick={onGoCreateoffer} className="offer">crea tu oferta &#127806;</button>
    </div>
    <SearchOffers onGoSearcher={handleGoSearcher} />
    {/* <Link to ='/register'>tu</Link> */}
    {view === 'offersfound' && <FindOffer results={results} onGoDetail={handleGoDetail} />}

    {view === 'default' && <ListOffersRetrieve offers={offers} onGoDetail={handleGoDetail} />}
    {view === 'user-offers' && <Useroffers useroffers={useroffers} onGoDetail={handleGoDetail} onGoDelete={handleGoDelete}/>}
    {view === 'detail' && <Detail offer={offer} />}
</sections>

}

export default Hub

import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import logoimg from "../../assets/logo.svg"


export default function Incident() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory()


    const ongId = localStorage.getItem('ongId')

    async function handleNewincident(e) {

        e.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })
            history.push('/profile')
        } catch (err) {

            alert('Erro ao cadastrar o caso, tente novamente!')

        }
    }




    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoimg} alt="Be the Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar seu herói para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                        </Link>

                </section>
                <form onSubmit={handleNewincident}>

                    <input
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button type="submit" className="button">Cadastrar</button>

                </form>
            </div>
        </div>
    )
}
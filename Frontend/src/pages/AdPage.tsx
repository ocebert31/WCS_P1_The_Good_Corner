import { useEffect, useState } from "react";
import instance from "../lib/instance";
import { useParams } from 'react-router-dom';

export type Ad = {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    author: string;
    created_at: string;
}

function AdPage() {
    const [ad, setAd] = useState<Ad | null>(null);
    const { id } = useParams()

    const getAd = async () => {
        try {
            const { data } = await instance.get<Ad>(`/ads/find/${id}`);
            setAd(data)
        } catch(err: unknown) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAd()   
    }, [id])

    return(
        <div>
            {ad ? (
                <div>
                    <h1>{ad.title}</h1>
                    <p>Description : {ad.description}</p>
                    <p>Prix : {ad.price} €</p>
                    <p>Localisation : {ad.location}</p>
                    <p>Auteur : {ad.author}</p>
                    <p>Date de création : {new Date(ad.created_at).toLocaleDateString()}</p>
                </div>
            ) : (
                <div>Aucune annonce trouvée</div>
            )}
        </div>
    )
}

export default AdPage
import { useEffect, useState } from "react";
import instance from "../lib/instance";
import { useParams } from 'react-router-dom';
import { Ad } from "../components/Ads/ListAds";

function AdPage() {
    const [ad, setAd] = useState<Ad | null>(null);
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()

    const getAd = async () => {
        try {
            const { data } = await instance.get<Ad>(`/ads/find/${id}`);
            setAd(data)
            setIsLoading(false);
        } catch(err: unknown) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAd()   
    }, [id])

    if(isLoading) {
        return <div>Chargement en cours</div>
    }

    return(
        <div>
            {ad ? (
                <div>
                    <h1>{ad.title}</h1>
                    <p>Description : {ad.description}</p>
                    <p>Prix : {ad.price} €</p>
                    <p>Localisation : {ad.location}</p>
                    <p>Date de création : {new Date(ad.created_at).toLocaleDateString()}</p>
                </div>
            ) : (
                <div>Aucune annonce trouvée</div>
            )}
        </div>
    )
}

export default AdPage
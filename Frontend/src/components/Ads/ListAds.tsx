import CardAd from "./CardAd";
import instance from "../../lib/instance";
import { useEffect, useState } from "react";

export type Ad = {
    id: string;
    title: string;
    description: string;
    price: number;
    created_at: string;
}

function ListAds() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    const getAds = async () => {
        try {
            const { data } = await instance.get<Ad[]>("/ads/list");
            setAds(data)
            setIsLoading(false)
        } catch(err: unknown) {
            console.log(err)
        }
       
    }

    useEffect(() => {
        getAds()   
    }, [])

    if(isLoading) {
        return <div>Chargement en cours</div>
    }

    return (
        <div>
            {ads.length > 0 ? (
                ads.map((ad) => (
                <CardAd key={ad.id} ad={ad} />
            ))
            ) : (
            <div>Aucune annonce</div>
            )
        }
        </div>
    );
}

export default ListAds;

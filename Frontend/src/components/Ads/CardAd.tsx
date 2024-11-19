import {Ad} from "./ListAds";

function CardAd(props: {ad: Ad}) {
    return (
        <div>
            <h3>{props.ad.title}</h3>
            <p>{props.ad.description}</p>
            <p>Prix : {props.ad.price} €</p>
            <p>Créé le : {new Date(props.ad.created_at).toLocaleDateString()}</p>
        </div>
    );
}

export default CardAd;
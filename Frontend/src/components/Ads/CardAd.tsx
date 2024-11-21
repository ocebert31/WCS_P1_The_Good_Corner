import {Ad} from "./ListAds";
import { Link } from "react-router-dom";

function CardAd(props: {ad: Ad}) {
    return (
        <div>
            <h3>{props.ad.title}</h3>
            <p>{props.ad.description}</p>
            <p>Prix : {props.ad.price} €</p>
            <p>Créé le : {new Date(props.ad.created_at).toLocaleDateString()}</p>
            <Link to={`/ads/view/${props.ad.id}`}>Voir le produit</Link>
        </div>
    );
}

export default CardAd;
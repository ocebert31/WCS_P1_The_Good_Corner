import CardAd from "./CardAd";

export type Ad = {
    id: string;
    title: string;
    description: string;
    price: number;
    created_at: string;
}

function ListAds() {
    const ListAds: Ad[] = [
        {
            id: "0d20a325-1919-483d-ab90-c9249dbb4bd3",
            title: "Mon super titre 5",
            description: "Ma super description 5",
            price: 20,
            created_at: "2024-11-18T09:59:04.000Z",
        },
        {
            id: "54455d21-b334-4135-b63c-f85232cab446",
            title: "Mon super titre 5",
            description: "Ma super description 5",
            price: 20,
            created_at: "2024-11-18T10:08:55.000Z",
        },
    ];

    return (
        <div>
            {ListAds.map((ad) => (
                <CardAd key={ad.id} ad={ad} />
            ))}
        </div>
    );
}

export default ListAds;

import { useState } from "react";
import instance from "../lib/instance";
import CategorySelector from "../common/Ads/CategorySelector";
import formFields from "../utils/constants/formFields";
import { useNavigate } from 'react-router-dom';
import { AdCreateFormInfos, Ad } from "../types/ads";

function NewAdPage() {
    const [formData, setFormData] = useState<AdCreateFormInfos>({category: {id: ""}, title: '', description: '', price: 0, picture: '', location: ''});
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await instance.post<Ad>("ads/create", formData);
            navigate('/');
        } catch(err: unknown) {
            console.log(err)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement| HTMLSelectElement> ) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: name === "category" ? { id: value } : value,
        }));
    };

    return (
        <div>
            Création d'annonce
            <form onSubmit={handleSubmit}>
            <CategorySelector value={formData.category.id} handleChange={handleChange}/>
                {formFields.map((field) => (
                    <label key={field.name} style={{ display: "flex" }}>
                        {field.label} :
                        <input type={field.type} name={field.name} value={formData[field.name as keyof Omit<Ad, "created_at" | "updated_at" | "id">]} onChange={handleChange}/>
                    </label>
                ))}
            <button type="submit">Ajouter l'annonce</button>
            </form>
        </div>
    )
}

export default NewAdPage;
import { useState, useEffect } from 'react';
import instance from '../../lib/instance';

export type Category = {
    id: string;
    title: string;
}

export type CategoryForm = { 
    value: string; 
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void 
}

function CategorySelector({ value, handleChange }: CategoryForm) {
    const [categories, setCategories] = useState<Category[]>([]);
 
    const getCategories = async () => {
        try {
            const {data} = await instance.get<Category[]>("categories/list");
            setCategories(data)
        } catch(err: unknown) {
            console.log(err)
        }
    };

    useEffect(() => {
        getCategories()   
    }, [])

    return (
        <div className="mb-4">
            <label htmlFor="categoryId">Catégorie</label>
            <select id="categoryId" name="category" value={value} onChange={handleChange}>
                <option value="">Choisir une catégorie</option> 
                {categories.map((category) => (
                    <option key={category.id}>
                        {category.title}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CategorySelector;

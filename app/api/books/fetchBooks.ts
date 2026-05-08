"use client";
import { useEffect, useState } from "react";
import { createClient } from "contentful";
const client = createClient({
    space: "e9gkiwaib10m",
    environment: "master",
    accessToken: process.env.VITE_API_KEY || "bS6viLjKyqGxdlBf0ehcbxX7OflNFwZyLppUOXPy9kc",
});

interface Book {
    title: string;
    id: string;
    img?: string;
    description: string;
    availability: string;
    price: number;
}

export const useFetchProjects = () => {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await client.getEntries({content_type: "book"});

                const books = response.items.map(item => {
                    const { title, image, description, availability, price } = item.fields;
                    const id = item.sys.id;
                    
                    // Type guard: check if image is an object with fields property
                    const img = (image && typeof image === 'object' && 'fields' in image) 
                        ? ((image as { fields: { file: { url: string } } }).fields?.file?.url)
                        : undefined;

                    return { 
                        title: String(title || ''),
                        id, 
                        img, 
                        description: String(description || ''),
                        availability: String(availability || ''),
                        price: Number(price || 0)
                    };
                });

                setBooks(books);
                console.log(books);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    },[]);

    return { loading, books };
}
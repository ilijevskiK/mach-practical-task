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

    const getData = async () => {
        try {
            const response = await client.getEntries({content_type: "book"});

            const books = response.items.map(item => {
                const { title, image, description, availability, price } = item.fields;
                const id = item.sys.id;
                const img = image?.fields?.file?.url || null;

                return { title, id, img, description, availability, price };
            });

            setLoading(false);
            setBooks(books);
            console.log(books);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    return { loading, books };
}
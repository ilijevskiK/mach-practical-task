"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "contentful";

const client = createClient({
  space: "e9gkiwaib10m",
  environment: "master",
  accessToken: "bS6viLjKyqGxdlBf0ehcbxX7OflNFwZyLppUOXPy9kc",
});

interface Book {
  title: string;
  id: string;
  img?: string;
  description: string;
  availability: string;
  price: number;
}

export default function BookDetail() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await client.getEntries({
          content_type: "book",
        });

        const foundBook = response.items.find((item) => item.sys.id === params.id);

        if (foundBook) {
          const { title, image, description, availability, price } =
            foundBook.fields;
          const img =
            image && typeof image === "object" && "fields" in image
              ? ((image as {fields: {file: {url: string}}}).fields?.file?.url)
              : undefined;

          setBook({
            title: String(title || ""),
            id: foundBook.sys.id,
            img,
            description: String(description || ""),
            availability: String(availability || ""),
            price: Number(price || 0),
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;

  if (!book) return <p>Book not found</p>;

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      <button
        onClick={() => router.back()}
        className="cursor-pointer mb-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {book.img && (
          <div className="flex justify-center items-start">
            <img src={book.img} alt={book.title} width={300} height={450} />
          </div>
        )}

        <div>
          <h1 className="text-4xl font-bold mb-4">{book.title}</h1>

          <p className={`text-xl font-bold mb-4 ${
            book.availability === "in stock" ? "text-green-800" : "text-red-800"
          }`}>
            {book.availability === "in stock" ? "Available" : "Not Available"}
          </p>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {book.description}
          </p>

          <p className="text-3xl font-bold text-green-600 mb-6">
            ${book.price}
          </p>
        </div>
      </div>
    </div>
  );
}

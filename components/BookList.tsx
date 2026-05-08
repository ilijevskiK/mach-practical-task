"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFetchProjects } from "@/app/api/books/fetchBooks";

export default function BookList() {
      const router = useRouter();
      const { loading, books } = useFetchProjects();
      const [searchTerm, setSearchTerm] = useState("");

      const handleCardClick = (bookId: string) => {
            router.push(`/books/${bookId}`);
      };

      const filteredBooks = books.filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Search books by title or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredBooks.map((book) => (
                        <li key={book.id} onClick={() => handleCardClick(book.id)} className={`border p-4 rounded transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${book.availability === "in stock" ? '' : 'bg-gray-300 opacity-75'}`}>
                            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                            {book.img && (
                             <div className="flex justify-center mb-2">
                               <img src={book.img} alt={book.title} width={200} height={300} />
                             </div>
                            )}
                            <p className="line-clamp-4">{book.description}</p>
                            <p className={`mt-2 font-bold text-lg ${book.availability === "in stock" ? 'text-green-800' : 'text-red-800'}`}>
                                {book.availability === "in stock" ? "Available" : "Not Available"}
                            </p>
                            <p className="mt-1 text-green-600 font-bold">${book.price}</p>
                        </li>
                    ))}
                    </ul>
                    {filteredBooks.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">No books found. Try a different search.</p>
                    )}
                </>
            )}
        </div>
    );
}
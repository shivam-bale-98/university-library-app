import { cn } from '@/lib/utils';
import { Book } from '@/types';
import React from 'react';
import BookCard from './BookCard';

interface BookListProps {
    title: string;
    books: Book[];
    containerClassName: string;
}

const BookList = ({ title, books, containerClassName } : BookListProps) => {
  return (
    <section className={cn("", containerClassName)}>
        <h2 className='font-bebas-neue text-4xl text-light-100'>{title}</h2>

        <ul className='book-list'>
            {books?.map((book, index) => (
                <BookCard key={book?.title} {...book} />
            ))}
        </ul>
    </section>
  )
}

export default BookList
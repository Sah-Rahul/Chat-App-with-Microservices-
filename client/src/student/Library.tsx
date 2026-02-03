"use client";

import React from "react";
import StudentLayout from "./Layout";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  BookOpen,
  Library as LibraryIcon,
  Clock,
  CheckCircle,
} from "lucide-react";

const books = [
  {
    id: 1,
    title: "React Mastery",
    author: "Dan Abramov",
    status: "Available",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 2,
    title: "JavaScript Deep Dive",
    author: "Kyle Simpson",
    status: "Available",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    title: "System Design Basics",
    author: "Alex Xu",
    status: "Coming Soon",
    color: "from-orange-500 to-pink-500",
  },
  {
    id: 4,
    title: "Data Structures Handbook",
    author: "Robert Lafore",
    status: "Coming Soon",
    color: "from-yellow-500 to-orange-500",
  },
];

const Library = () => {
  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.status === "Available").length;
  const comingSoonBooks = books.filter(
    (b) => b.status === "Coming Soon",
  ).length;

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <LibraryIcon className="h-8 w-8 text-indigo-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Books</p>
                <h3 className="text-2xl font-bold">{totalBooks}</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Available Books</p>
                <h3 className="text-2xl font-bold">{availableBooks}</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 pt-6">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Coming Soon</p>
                <h3 className="text-2xl font-bold">{comingSoonBooks}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight">Library</h2>
          <p className="text-muted-foreground">
            Access your learning books and resources
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <Card
              key={book.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`h-40 bg-linear-to-r ${book.color} relative flex items-end`}
              >
                <Badge
                  className={`absolute top-3 right-3 ${
                    book.status === "Available"
                      ? "bg-white text-black"
                      : "bg-black/80 text-white"
                  }`}
                >
                  {book.status}
                </Badge>

                <div className="p-4 text-white font-semibold">{book.title}</div>
              </div>

              <CardContent className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  Author: {book.author}
                </p>

                <Button
                  className="w-full"
                  variant={
                    book.status === "Available" ? "default" : "secondary"
                  }
                  disabled={book.status !== "Available"}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  {book.status === "Available" ? "Read Book" : "Coming Soon"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {books.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground">
              No books available in the library.
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  );
};

export default Library;

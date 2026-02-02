"use client";

import React, { useState } from "react";
import AdminLayout from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  FileQuestion,
  Clock,
  CheckCircle2,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

const Quizzes = () => {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `q${Date.now()}`,
        text: "",
        options: [{ id: `o${Date.now()}`, text: "" }],
      },
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const addOption = (qid: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: [...q.options, { id: `o${Date.now()}`, text: "" }],
            }
          : q,
      ),
    );
  };

  const removeOption = (qid: string, oid: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === qid
          ? { ...q, options: q.options.filter((o) => o.id !== oid) }
          : q,
      ),
    );
  };

  const updateQuestionText = (qid: string, text: string) => {
    setQuestions(questions.map((q) => (q.id === qid ? { ...q, text } : q)));
  };

  const updateOptionText = (qid: string, oid: string, text: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === qid
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === oid ? { ...o, text } : o,
              ),
            }
          : q,
      ),
    );
  };

  const stats = [
    { title: "Total Quizzes", value: 42 },
    { title: "Active Quizzes", value: 28 },
    { title: "Draft Quizzes", value: 9 },
    { title: "Average Score", value: "76%" },
  ];

  const quizzes = [
    {
      id: "QZ001",
      title: "HTML Basics Quiz",
      category: "Web Development",
      questions: 15,
      duration: "20 min",
      level: "Easy",
      status: "Active",
    },
    {
      id: "QZ002",
      title: "CSS Flexbox Test",
      category: "UI/UX",
      questions: 10,
      duration: "15 min",
      level: "Medium",
      status: "Draft",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-primary">Quizzes</h2>
            <p className="text-muted-foreground">
              Manage and create quizzes for your LMS
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-white gap-2">
                <Plus className="w-4 h-4" />
                Create Quiz
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Quiz</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Quiz Title</Label>
                  <Input placeholder="Enter quiz title" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Development</SelectItem>
                        <SelectItem value="uiux">UI / UX</SelectItem>
                        <SelectItem value="ml">Machine Learning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Time (minutes)</Label>
                    <Input type="number" placeholder="e.g. 20" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Questions</h3>
                    <Button size="sm" onClick={addQuestion} className="gap-1">
                      <Plus className="w-4 h-4" /> Add Question
                    </Button>
                  </div>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {questions.map((q) => (
                      <Card key={q.id} className="bg-white border">
                        <CardContent className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Input
                              placeholder="Enter question text"
                              value={q.text}
                              onChange={(e) =>
                                updateQuestionText(q.id, e.target.value)
                              }
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeQuestion(q.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="space-y-2">
                            {q.options.map((opt) => (
                              <div
                                key={opt.id}
                                className="flex items-center gap-2"
                              >
                                <Input
                                  placeholder="Option text"
                                  value={opt.text}
                                  onChange={(e) =>
                                    updateOptionText(
                                      q.id,
                                      opt.id,
                                      e.target.value,
                                    )
                                  }
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeOption(q.id, opt.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}

                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-1 gap-1"
                              onClick={() => addOption(q.id)}
                            >
                              <Plus className="w-4 h-4" /> Add Option
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary text-white">Publish Quiz</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-white">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>All Quizzes</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quiz</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {quizzes.map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell className="flex items-center gap-2 font-medium">
                      <FileQuestion className="w-4 h-4 text-primary" />
                      {quiz.title}
                    </TableCell>

                    <TableCell>{quiz.category}</TableCell>
                    <TableCell>{quiz.questions}</TableCell>

                    <TableCell>
                      <Badge className="bg-primary/20 text-primary">
                        {quiz.level}
                      </Badge>
                    </TableCell>

                    <TableCell className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      {quiz.duration}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          quiz.status === "Active"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {quiz.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Quizzes;

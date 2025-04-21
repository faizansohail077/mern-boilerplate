import type React from "react";
import { useState } from "react";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Progress } from "./components/ui/progress";
import { cn } from "./lib/utils";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export default function TodoPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");

    // Calculate progress percentage
    const completedTodos = todos.filter((todo) => todo.completed).length;
    const progressPercentage = todos.length > 0 ? Math.round((completedTodos / todos.length) * 100) : 0;

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodo.trim() === "") return;

        const todo: Todo = {
            id: Date.now().toString(),
            text: newTodo,
            completed: false,
        };

        setTodos([...todos, todo]);
        setNewTodo("");
    };

    const toggleTodo = (id: string) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const startEditing = (todo: Todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };

    const saveEdit = () => {
        if (editText.trim() === "") return;

        setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editText } : todo)));
        setEditingId(null);
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Todo List</CardTitle>
                <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>
                            {completedTodos} of {todos.length} tasks completed
                        </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={addTodo} className="flex gap-2 mb-4">
                    <Input
                        type="text"
                        placeholder="Add a new task..."
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon">
                        <Plus className="h-4 w-4" />
                    </Button>
                </form>

                <div className="space-y-2">
                    {todos.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No tasks yet. Add one above!</p>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={cn(
                                    "flex items-center gap-2 p-2 rounded-md border",
                                    todo.completed && "bg-muted"
                                )}
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 rounded-full"
                                    onClick={() => toggleTodo(todo.id)}
                                >
                                    <div
                                        className={cn(
                                            "h-5 w-5 rounded-full border flex items-center justify-center",
                                            todo.completed && "bg-primary border-primary"
                                        )}
                                    >
                                        {todo.completed && <Check className="h-3 w-3 text-primary-foreground" />}
                                    </div>
                                </Button>

                                {editingId === todo.id ? (
                                    <div className="flex flex-1 gap-2">
                                        <Input
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="flex-1"
                                            autoFocus
                                            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                                        />
                                        <Button size="sm" onClick={saveEdit}>
                                            Save
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <span
                                            className={cn(
                                                "flex-1",
                                                todo.completed && "line-through text-muted-foreground"
                                            )}
                                        >
                                            {todo.text}
                                        </span>
                                        <Button variant="ghost" size="icon" onClick={() => startEditing(todo)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

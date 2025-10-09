'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRoleClassNames } from "@/lib/utils";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import type { User } from "@/lib/types";

export default function EmployeeDirectoryPage() {
    const firestore = useFirestore();
    const employeesQuery = useMemoFirebase(() => collection(firestore, 'employees'), [firestore]);
    const { data: users, isLoading } = useCollection<User>(employeesQuery);

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <CardTitle className="font-headline">Employee Directory</CardTitle>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search employees..." className="w-full md:w-[300px] pl-8" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">Email</TableHead>
                            <TableHead className="hidden lg:table-cell">Phone</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>}
                        {!isLoading && users && users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={`https://picsum.photos/seed/${user.id}/100/100`} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}{user.surname.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="font-medium">{user.name} {user.surname}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                                <TableCell className="hidden lg:table-cell">{user.phone}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn("border-2", getRoleClassNames(user.role))}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                         {!isLoading && !users?.length && <TableRow><TableCell colSpan={4} className="text-center">No employees found.</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

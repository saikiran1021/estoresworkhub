import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, School, Briefcase } from "lucide-react";

const stats = [
    { title: "Total Employees", value: "150", icon: <Users className="h-6 w-6 text-employee-highlight-foreground" />, color: "bg-employee-highlight" },
    { title: "Admin Users", value: "5", icon: <Briefcase className="h-6 w-6 text-admin-highlight-foreground" />, color: "bg-admin-highlight" },
    { title: "Colleges", value: "12", icon: <School className="h-6 w-6 text-college-highlight-foreground" />, color: "bg-college-highlight" },
    { title: "Industries", value: "28", icon: <Building className="h-6 w-6 text-industry-highlight-foreground" />, color: "bg-industry-highlight" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-headline">Welcome, Admin!</h1>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <div className={`rounded-full p-2 ${stat.color}`}>
                                {stat.icon}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">+2 from last month</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground">No recent activity to show.</p>
                    </CardContent>
                </Card>
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline">Announcements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 bg-secondary rounded-lg">
                            <h4 className="font-bold">Quarterly Meeting</h4>
                            <p className="text-sm text-secondary-foreground">The Q3 all-hands meeting is scheduled for next Friday. Please RSVP by Wednesday.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Logo from '@/components/Logo';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Role } from '@/lib/types';
import { useAuth, useUser, initiateEmailSignIn } from '@/firebase';

const roleColors: Record<Role, string> = {
  Admin: 'bg-admin-highlight text-admin-highlight-foreground',
  Employee: 'bg-employee-highlight text-employee-highlight-foreground',
  College: 'bg-college-highlight text-college-highlight-foreground',
  Industry: 'bg-industry-highlight text-industry-highlight-foreground',
};

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    initiateEmailSignIn(auth, email, password);
  };

  if (isUserLoading || (!isUserLoading && user)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md text-center">
          <Logo />
          <h1 className="mt-4 animate-pulse text-lg">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="items-center text-center">
            <Logo />
            <CardTitle className="font-headline text-3xl text-primary">eStores WorkHub</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select required defaultValue="Employee">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employee">Employee</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="College">College</SelectItem>
                    <SelectItem value="Industry">Industry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full font-bold">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col items-center justify-center space-y-4">
            <Link href="/signup" className="text-sm text-primary hover:underline">
              Don't have an account? Sign up here
            </Link>

            <Alert className="bg-secondary mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-bold">Demo Credentials</AlertTitle>
              <AlertDescription className="space-y-2 text-xs">
                <p>
                  <Badge className={cn('mr-2', roleColors.Employee)}>Employee</Badge>
                  employee@estores.com / password123
                </p>
                <p>
                  <Badge className={cn('mr-2', roleColors.Admin)}>Admin</Badge>
                  admin@estores.com / admin123
                </p>
                <p>
                  <Badge className={cn('mr-2', roleColors.College)}>College</Badge>
                  college@estores.com / college123
                </p>
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

import { AdminLogin } from "@/components/domains/Auth/components/AdminLogin";
import { LoginForm } from "@/components/domains/Auth/components/LoginForm";
import { SignUpForm } from "@/components/domains/Auth/components/SignUpForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Auth = () => {
	return (
		<div className="flex justify-center items-center h-screen w-full">
			<Tabs defaultValue="signin" className="max-w-6xl w-1/3 h-1/2 min-w-96">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="signin" className="font-bold">
						SIGN IN
					</TabsTrigger>
					<TabsTrigger value="signup" className="font-bold">
						SIGN UP
					</TabsTrigger>
					<TabsTrigger value="admin" className="font-bold">
						ORG LOGIN
					</TabsTrigger>
				</TabsList>
				<TabsContent value="signin">
					<LoginForm />
				</TabsContent>
				<TabsContent value="signup">
					<SignUpForm />
				</TabsContent>
				<TabsContent value="admin">
					<Card>
						<CardHeader>
							<CardTitle>ORG LOGIN</CardTitle>
						</CardHeader>
						<CardContent>
							<AdminLogin />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

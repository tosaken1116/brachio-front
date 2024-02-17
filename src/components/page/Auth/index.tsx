import { LoginForm } from "@/components/domains/Auth/components/LoginForm";
import { SignUpForm } from "@/components/domains/Auth/components/SignUpForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Auth = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<Tabs defaultValue="signin" className="max-w-5xl w-1/3 h-1/2 min-w-96">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="signin" className="font-bold">
						SIGN IN
					</TabsTrigger>
					<TabsTrigger value="signup" className="font-bold">
						SIGN UP
					</TabsTrigger>
				</TabsList>
				<TabsContent value="signin">
					<LoginForm />
				</TabsContent>
				<TabsContent value="signup">
					<SignUpForm />
				</TabsContent>
			</Tabs>
		</div>
	);
};

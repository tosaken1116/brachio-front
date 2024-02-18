import { GoogleIcon } from "@/components/icon/GoogleIcon";
import { Button } from "@/components/ui/button";
type Props = {
	login: () => void;
};
export const AdminLoginPresentation = ({ login }: Props) => (
	<Button onClick={login} className="gap-2 flex">
		<GoogleIcon />
		<span className="font-bold">Googleでログイン</span>
	</Button>
);

import { BedrockAgentRuntime } from "@aws-sdk/client-bedrock-agent-runtime";
import { ScrollPaper } from "../ui/ScrollPaper";
import { TextArea } from "../ui/TextArea";
export async function FAQ() {
	const client = new BedrockAgentRuntime({ region: "us-east-1" });
	const res = await client.invokeAgent({
		agentId: "",
		agentAliasId: "tosaken",
		inputText: "Hack'zについて教えてください",
		sessionId: "1",
		enableTrace: false,
	});
	const [text, setText] = useState("");
	const handleChange = (e: Event) => {
		setText((e.target as HTMLInputElement).value);
	};
	console.log(text);
	return (
		<div>
			<h1>FAQ</h1>
			<p>{res.completion}</p>
			<ScrollPaper>
				<TextArea onChange={handleChange} />
			</ScrollPaper>
		</div>
	);
}

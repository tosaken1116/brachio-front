import { createClient } from "honox/client";

createClient({
	island_root: "/src/client/components/islands/",
	ISLAND_FILES: import.meta.glob(
		"/src/client/components/islands/**/[a-zA-Z0-9[-]+.(tsx|ts)",
	),
});

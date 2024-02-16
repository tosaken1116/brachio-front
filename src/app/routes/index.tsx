import { css } from "hono/css";
import { createRoute } from "honox/factory";

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(<div>root page</div>);
});

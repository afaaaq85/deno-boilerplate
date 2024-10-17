import { Application, Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";

const router = new Router();

router
  .get("/", (context) => {
    context.response.body = "Welcome to the Oak-powered Deno Server!";
  })
  .get("/getdata", (context) => {
    const data = { message: "Here is your data", items: [1, 2, 3, 4, 5] };
    context.response.body = data;
  })
  .get("/about", (context) => {
    context.response.body = "This is the about page.";
  })
  .post("/postdata", (context) => {
    const body = context.request.body();
    if (!body || !body.value) {
      context.response.status = 400;
      context.response.body = { message: "Invalid data" };
    } else {
      context.response.body = body.value;
    }
  })

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 8000;

console.log(`Server is running on http://localhost:${PORT}`);
await app.listen({ port: PORT });

import { Elysia, t } from "elysia";
import { plugin } from "./plugin";


//APPLICATION
const app = new Elysia().get("/", () => "Hello Elysia")
.use(plugin)
.state({
  id: 1,
  email: 'thadeu@gmail.com'
})
.decorate('getDate', () => Date.now())
.get('/post/:id', ({params: {id}})=> {return {id: id, title: "Learn Bun"}})
.post('/post', ({body, set, store}) => { 
  console.log(store)
  set.status = 201
  return body
})
.get('/track/*', () => {return 'Track Route'}) 
.get('/tracks', ({store, getDate}) => {
  // return new Response(JSON.stringify({
  //   "tracks": [
  //     'Dancing Feat',
  //     'Sam I',
  //     'Animals'
  //   ]
  // }), {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  console.log(store)
  console.log(getDate())
  console.log(store['plugin-version'])
  return {
    "tracks": [
      'Dancing Feat',
      'Sam I',
      'Animals',
      'New song'
    ]
  }
});


app.group('/user', app => app
.post('/sign-in', ({body}) => body, {
  body: t.Object({
    username: t.String(),
    password: t.String()
  })
})
.post('/sign-up', () => "Signup Route")
.post('/profile', () => "Profile Route")
.get('/:id', () => "User by id Route"))


app.group('/v1', app => app
.get('/', () => "Version 1")
.group('/products', app => app
.post('/', () => "Create Product")
.get('/:id', () => "GET PRODUCT BY ID")
.put('/:id', () => "UPDATE PRODUCT BY ID")
.delete('/:id', () => "DELETE PRODUCT BY ID")))

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

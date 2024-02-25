import { t } from "elysia";

export const signInDto = t.Object({
  username: t.String(),
  password: t.String()
})
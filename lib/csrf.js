import { nextCsrf } from "next-csrf";

const { csrf, setup } = nextCsrf({
  // eslint-disable-next-line no-undef
  secret: process.env.SECRET,
});

export { csrf, setup };

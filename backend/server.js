import { app } from "./src/app.js";
import { PORT, IS_DEV } from "./src/config/config.js";
import job from "./src/lib/cron.js";

app.listen(PORT, () => {
  console.log(`Server is ready at PORT ${PORT}`);

  if (!IS_DEV) {
    job.start();
  }
});

import { httpServer } from "./src/lib/socket.js";
import { PORT, IS_DEV } from "./src/config/config.js";
import job from "./src/lib/cron.js";

httpServer.listen(PORT, () => {
  console.log(`Server is ready at PORT ${PORT}`);

  if (!IS_DEV) {
    job.start();
  }
});

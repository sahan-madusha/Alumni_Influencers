import cron from "node-cron";
import { bidService } from "../service/bid.service";
import { WINNER_SELECTION_SCHEDULE } from "../config";

export const initScheduler = () => {
  cron.schedule(WINNER_SELECTION_SCHEDULE, async () => {
    try {
      await bidService.processDailyWinner();
    } catch (error) {
      console.error("SCHEDULER_ERROR:", error);
    }
  });

  console.log(
    `Daily winner selection task scheduled : (${WINNER_SELECTION_SCHEDULE}).`,
  );
};

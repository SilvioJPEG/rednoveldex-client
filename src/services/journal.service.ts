import { $api } from "./auth.service";

export default class JournalService {
  static async updateJournal(novel_id: number) {
    const res = await $api.patch("/journal/update", { novel_id: novel_id });
    return res;
  }

  static async checkIfInJournal(novel_id: number) {
    const res = await $api.post("/journal/check", { novel_id: novel_id });
    if (res.status === 200) {
      return res.data.InJournal;
    }
    return false;
  }
}

import { $api } from "./auth.service";

export default class JournalService {
  static async updateJournal(novelId: number) {
    const res = await $api.patch("/journal/update", { novelId: novelId });
    return res;
  }

  static async checkIfInJournal(novelId: number) {
    const isInJournal = await $api.post("/journal/check", { novelId: novelId });
    return await isInJournal.data.InJournal;
  }
}

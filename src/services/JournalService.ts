import { $api } from "./AuthService";
export default class JournalService {
  static async updateJournal(novelId: number) {
    const res = await $api.patch("/journal/update", { 'novelId': novelId });
    if (res.status === 202) {
      return true;
    } else {
      return false;
    }
  }

  static async checkIfInJournal(novelId: number) {
    const isInJournal = await $api.post("/journal/check", novelId);
    return await isInJournal.data.InJournal;
  }
}

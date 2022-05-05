import { JournalEntry } from "../types/models";
import { $api } from "./auth.service";

export default class JournalService {
  static async updateJournal(novel_id: number) {
    const res = await $api.patch(`/journal/update/${novel_id}`);
    return res;
  }
  static async updateJournalEntity(
    novel_id: number,
    updatedData: any
  ): Promise<JournalEntry> {
    const res = await $api.patch<JournalEntry>(
      `/journal/update/novel/${novel_id}`,
      updatedData
    );
    return res.data;
  }
  static async checkIfInJournal(novel_id: number) {
    const res = await $api.post<{
      InJournal: boolean;
      novelEntry: JournalEntry;
    }>("/journal/check", { novel_id: novel_id });
    if (res.status === 200) {
      return res.data.InJournal;
    }
    return false;
  }
  static async getJournalEntities(username: string): Promise<JournalEntry[]> {
    const res = await $api.get<JournalEntry[]>(`/journal/${username}`);
    return res.data;
  }
  static async changeScore(novel_id: number, newScore: number) {}
}

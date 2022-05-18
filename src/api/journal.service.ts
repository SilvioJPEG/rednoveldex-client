import novelPageStore from "../store/novelPageStore";
import { JournalEntry } from "../typings/models";
import { $api } from "./auth.service";

export default class JournalService {
  static async addToJournal(novel_id: number) {
    const res = await $api.post<JournalEntry>(`journal/entity/${novel_id}`);
    novelPageStore.journaled(true, res.data);
  }

  static async deleteFromJournal(novel_id: number) {
    await $api.delete(`/entity/${novel_id}`);
  }

  static async updateJournalEntity(
    novel_id: number,
    updatedData: any
  ): Promise<JournalEntry> {
    const res = await $api.patch<JournalEntry>(
      `/journal/entity/${novel_id}`,
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
      novelPageStore.journaled(res.data.InJournal, res.data.novelEntry);
    }
  }

  static async getJournalEntities(username: string): Promise<JournalEntry[]> {
    const res = await $api.get<JournalEntry[]>(`/journal/${username}`);
    return res.data;
  }

  static async getJournalEntity(
    username: string,
    novel_id: number
  ): Promise<JournalEntry> {
    const res = await $api.get<JournalEntry>(
      `/journal/${username}/novel/${novel_id}`
    );
    return res.data;
  }
  static async changeScore(novel_id: number, newScore: number) {}
}

import { createListDto } from "../types/dto";
import { $api } from "./auth.service";

export default class ListsService {
  static async create(createListDto: createListDto) {
    const res = await $api.post("/lists", createListDto);
    return res.data;
  }

  static async update(createListDto: createListDto) {
    const res = await $api.patch("/lists", createListDto);
    return res.data;
  }

  static async delete(list_id: number) {
    const res = await $api.delete("/lists", { data: list_id });
    return res.data;
  }

  static async getByUsername(username: string) {
    const res = await $api.get(`/lists/${username}`);
    return res.data;
  }
}

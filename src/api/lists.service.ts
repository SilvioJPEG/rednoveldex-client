import ListsStore from "../store/ListsStore";
import { createListDto } from "../typings/dto";
import { List } from "../typings/models";
import { $api } from "./auth.service";

export default class ListsService {
  static async getByUsername(username: string) {
    const res = await $api.get<List[]>("/lists", { params: { username } });
    ListsStore.setLists(res.data);
  }
  
  static async create(createListDto: createListDto) {
    const res = await $api.post("/lists", createListDto);
    return res.data;
  }

  static async update(createListDto: createListDto) {
    const res = await $api.patch("/lists", createListDto);
    return res.data;
  }

  static async delete(id: number) {
    const res = await $api.delete(`/lists/${id}`);
    return res.data;
  }
}

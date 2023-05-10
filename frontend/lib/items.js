import { getAllArticles } from "../services/storeService";

export async function getPathsFromTitle() {
  const items = await getAllArticles();

  return items.map((item) => {
    return {
      params: {
        id: item['id'].toString(),
      },
    };
  });
}

export async function getItemData(id) {
  const items = await getAllArticles();
  const product = items.find((item) => item['id'].toString() === id);
  return {
    id,
    data: product,
  };
}

export function convertToPath(title) {
  return title.toLowerCase().replace(/\s/g, "-");
}

export default function addressesEqual(addr1, addr2) {
  if(!addr1 || !addr2) return false;
  return addr1.toUpperCase() === addr2.toUpperCase();
}
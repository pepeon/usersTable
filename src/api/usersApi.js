const BASE_URL = "https://dummyjson.com/users";

async function request(url, errorMessage) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `${errorMessage} (HTTP ${response.status}: ${response.statusText})`,
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Ошибка сети");
  }
}

export async function getUsers({ page, limit, sort, filters }) {
  const params = new URLSearchParams();
  const skip = (page - 1) * limit;

  params.append("limit", limit);
  params.append("skip", skip);

  if (sort.field) {
    params.append("sortBy", sort.field);
    params.append("order", sort.order);
  }

  if (filters.search) {
    const searchParams = new URLSearchParams({
      q: filters.search,
      limit,
      skip,
    });

    return request(
      `${BASE_URL}/search?${searchParams.toString()}`,
      "Ошибка поиска",
    );
  }

  return request(`${BASE_URL}?${params.toString()}`, "Ошибка загрузки");
}

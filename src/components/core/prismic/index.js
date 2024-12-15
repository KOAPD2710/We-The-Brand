import { createClient } from '@prismicio/client'

const repositoryName = 'wethebrand'
// const accessToken = 'MC5aY25QeVJBQUFDSUF2a3Ez.77-9OGBebe-_ve-_vVp277-9Ze-_ve-_vSfvv73vv711eEAB77-9eQpq77-977-9Vu-_vQDvv71s77-9'

const client = createClient(repositoryName)

export async function getPage(slug) {
  const data = await client.getSingle(slug);

  if (!data) return;
  return data;
}
export async function getByUID(customType, uid) {
  const data = await client.getByUID(customType, uid);

  if (!data) return;
  return data;
}
export async function getAllByType(customType) {
  const data = await client.getAllByType(customType);

  if (!data) return;
  return data;
}

export const htmlSerializer = {
  highlight: ({ children }) => `<span class="highlight">${children}</span>`
}
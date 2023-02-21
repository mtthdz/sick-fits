import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    /**
     * when apollo queries for all products:
     * 1. asks for the read function and
     *    a. either return items already in cache, or
     *    b. make new network request
     * 2. merges updated data
     */
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      const items = existing.slice(skip, skip + first).filter((x) => x);

      /**
       * if:
       * 1. items exist
       * 2. there aren't enough items to satisfy how many were requested
       * 3. we are on the last page
       */
      if (items.length && items.length !== first && page === pages) {
        return items;
      }

      // if no items, fetch from network
      if (items.length !== first) {
        return false;
      }

      if (items.length) {
        return items;
      }

      return false;
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}

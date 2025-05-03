import { TBuilderQuery } from '@/interface/TBuilderQuery';
import { buildQuery, toIsAsc, toJoin, toOrderBy, toPaging } from '@/utils/queryBuilder';

export const useBuilderQuery = (filter: TBuilderQuery): string => {
  let queryString: string = '';
  // Xử lý appendQuery
  // if (filter.appendQuery) {
  //   queryString = buildQuery(filter.appendQuery);
  // }
  if (filter.appendQuery || filter.prop) {
    queryString = buildQuery(filter.appendQuery || [], filter.prop);
  }

  // Xử lý orderBy
  if (filter.orderBy) {
    queryString = toOrderBy(filter.orderBy, queryString);
  }

  // Xử lý isAsc
  if (typeof filter.isAsc !== 'undefined') {
    queryString = toIsAsc(filter.isAsc.toString(), queryString);
  }

  // Xử lý joins
  if (filter.toJoin?.length) {
    filter.toJoin.forEach((join) => {
      queryString = toJoin(queryString, join);
    });
  }

  // Xử lý phân trang
  if (filter.toPaging) {
    queryString = toPaging(filter.toPaging.page, filter.toPaging.pageSize, queryString);
  }

  return queryString;
};

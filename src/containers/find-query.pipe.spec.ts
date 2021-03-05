import { FindQueryPipe } from '../shared/find-query.pipe';

describe('Find query transformation', () => {
  const findQuery = new FindQueryPipe();

  it('should return the same params', () => {
    const params = { _limit: 1, _sort: 'containerNo', _start: 1 };
    const value = findQuery.transform(params, null);

    expect(value).toEqual({ ...params, options: {} });
  });

  it('should filter =', () => {
    const params = { _start: 1, containerNo: 'Aaa' };
    const value = findQuery.transform(params, null);

    expect(value).toEqual({
      _start: 1,
      containerNo: 'Aaa',
      options: { containerNo: 'Aaa' },
    });
  });

  it('should filter _ne', () => {
    const params = { _limit: 1, containerNo_ne: 'Aaa' };
    const value = findQuery.transform(params, null);

    expect(value).toEqual({
      _limit: 1,
      containerNo_ne: 'Aaa',
      options: { containerNo: { $ne: 'Aaa' } },
    });
  });

  it('should filter in array', () => {
    const params = { _limit: 1, containerNo_in: ['Aaa', 'ddd'] };
    const value = findQuery.transform(params, null);

    expect(value).toEqual({
      _limit: 1,
      containerNo_in: ['Aaa', 'ddd'],
      options: { containerNo: { $in: ['Aaa', 'ddd'] } },
    });
  });

  it('should filter contains', () => {
    const params = { _limit: 1, containerNo_contains: 'ddd' };
    const value = findQuery.transform(params, null);

    expect(value).toEqual({
      _limit: 1,
      containerNo_contains: 'ddd',
      options: { containerNo: /ddd/i },
    });
  });

  it('should filter containss', () => {
    const params = { _limit: 1, containerNo_containss: 'ddd' };
    const value = findQuery.transform(params, null);

    expect(value).toEqual({
      _limit: 1,
      containerNo_containss: 'ddd',
      options: { containerNo: /ddd/ },
    });
  });
});

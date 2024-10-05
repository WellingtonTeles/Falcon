import { renderHook, act } from '@testing-library/react-hooks';
import useToken from './useToken';
import 'jest-localstorage-mock';

describe('useToken hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('setToken should update token, accountId, and userId states', () => {
    const { result } = renderHook(() => useToken());
    const userToken = 'sampleToken';
    const user = { account_id: 'sampleAccountId', id: 'sampleUserId' };
    act(() => {
      result.current.setToken(userToken, user);
    });
    expect(result.current.token).toEqual(userToken);
    expect(result.current.accountId).toEqual(user.account_id);
    expect(result.current.userId).toEqual(user.id);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, 'token', userToken);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(2, 'account_id', user.account_id);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(3, 'user_id', user.id);
  });

//   test('retrieving token from localStorage on mount', () => {
//     const userToken = 'sampleToken';
//     localStorage.setItem('token', userToken);
//     const { result } = renderHook(() => useToken());
//     expect(result.current.token).toEqual(userToken);
//   });

//   test('retrieving accountId from localStorage on mount', () => {
//     const accountId = 'sampleAccountId';
//     localStorage.setItem('account_id', accountId);
//     const { result } = renderHook(() => useToken());
//     expect(result.current.accountId).toEqual(accountId);
//   });

//   test('retrieving userId from localStorage on mount', () => {
//     const userId = 'sampleUserId';
//     localStorage.setItem('user_id', userId);
//     const { result } = renderHook(() => useToken());
//     expect(result.current.userId).toEqual(userId);
//   });
});
